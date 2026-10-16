import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true });
const base = process.env.SITE_URL || 'http://127.0.0.1:8781/YUzhenghao-s-web/';
const output = resolve('output/playwright');
await mkdir(output, { recursive: true });
const errors = [], results = [];
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await page.locator('.photo-gallery .photo-slide').count(), 3, 'Three real photographs must be available');
  const front = () => page.locator('.photo-slide[data-position="0"] img');
  const initial = await front().getAttribute('src');
  await page.getByRole('button', { name: 'Next photograph', exact: true }).click();
  assert.notEqual(await front().getAttribute('src'), initial);
  assert.match(await page.locator('.gallery-status').textContent(), /Photo 2 of 3/);
  await page.waitForTimeout(350);
  await page.locator('.photo-gallery').screenshot({path:resolve(output,'gallery-second-photo.png')});
  await page.getByRole('button', { name: 'Previous photograph', exact: true }).click();
  assert.equal(await front().getAttribute('src'), initial);
  await page.getByRole('button', { name: 'Previous photograph', exact: true }).click();
  assert.match(await page.locator('.gallery-status').textContent(), /Photo 3 of 3/);
  await page.getByRole('button', { name: 'Next photograph', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await front().getAttribute('src'), initial);
  assert.equal(await page.locator('.photo-slide').evaluateAll(slides => slides.flatMap(slide => slide.getAnimations()).length), 0, 'Keyboard changes bypass motion');
  const shortcutCaptured = await page.getByRole('button', {name:'Next photograph',exact:true}).evaluate(button => {
    const event = new KeyboardEvent('keydown', {key:'ArrowLeft',altKey:true,bubbles:true,cancelable:true});
    button.dispatchEvent(event); return event.defaultPrevented;
  });
  assert.equal(shortcutCaptured,false,'Gallery must preserve browser history shortcuts');
  assert.equal(await front().getAttribute('src'),initial);
  await page.locator('.photo-controls button[data-step="1"]').evaluate(button => {
    for (let i = 0; i < 8; i++) button.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 1 }));
  });
  assert.match(await page.locator('.gallery-status').textContent(), /Photo 3 of 3/);
  await page.waitForTimeout(350);
  assert.equal(await page.locator('.photo-slide').evaluateAll(slides => slides.filter(slide => !slide.inert).length), 1);
  await page.locator('.photo-gallery').screenshot({path:resolve(output,'gallery-third-photo.png')});
  await page.locator('.photo-slide[data-position="0"] a').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.evaluate(() => document.activeElement.closest('.photo-slide')?.dataset.position), '0', 'Focus follows the active photo');
  await page.keyboard.press('ArrowLeft');
  const activePhoto = await front().getAttribute('src');
  await page.waitForTimeout(900);
  assert.equal(await front().getAttribute('src'), activePhoto, 'No automatic rotation');
  results.push('Previous/next, wraparound, rapid clicks, keyboard focus, live status and no autoplay');

  for (const [width, height] of [[320,740],[390,844],[768,1024],[1024,680],[1440,1000],[1440,620]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(850);
    const portrait = await page.locator('.site-rail .identity img').boundingBox();
    assert.ok(portrait.width >= (width > 850 ? 72 : 44), 'Larger rail portrait');
    const photo = await page.locator('.photo-slide[data-position="0"]').boundingBox();
    assert.ok(photo.width <= 400 && photo.height <= 320, `Compact photo at ${width}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, `No overflow at ${width}`);
    assert.equal(await page.locator('.photo-slide').evaluateAll(slides => slides.every(slide => {
      const box = slide.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth + 1;
    })), true, 'All stacked edges stay inside viewport');
    if (width === 390 || (width === 1440 && height === 1000)) await page.screenshot({ path: resolve(output, `gallery-${width}.png`) });
    results.push(`Compact stack and enlarged portrait at ${width}x${height}`);
  }
  // A touch swipe changes the image; vertical page gestures do not.
  await page.setViewportSize({ width:390, height:844 });
  await page.goto(base, { waitUntil:'networkidle' });
  const swipe = (x, y) => page.locator('.photo-deck').evaluate((deck, delta) => {
    deck.dispatchEvent(new PointerEvent('pointerdown', { bubbles:true, pointerId:11, pointerType:'touch', clientX:220, clientY:620 }));
    deck.dispatchEvent(new PointerEvent('pointerup', { bubbles:true, pointerId:11, pointerType:'touch', clientX:220+delta.x, clientY:620+delta.y }));
  }, {x,y});
  await swipe(-100, 4);
  assert.match(await page.locator('.gallery-status').textContent(), /Photo 2 of 3/);
  await swipe(4, -100);
  assert.match(await page.locator('.gallery-status').textContent(), /Photo 2 of 3/);
  results.push('Horizontal touch gesture and vertical-scroll separation');

  const touchContext = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const touchPage = await touchContext.newPage(); await touchPage.goto(base);
  await touchPage.waitForTimeout(850);
  const touchDeck = await touchPage.locator('.photo-deck').boundingBox();
  const client = await touchContext.newCDPSession(touchPage);
  const x=touchDeck.x+touchDeck.width*.75, y=touchDeck.y+touchDeck.height*.5;
  await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  await touchPage.waitForTimeout(40);
  await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-110,y:y+4}]});
  await touchPage.waitForTimeout(40);
  await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  assert.match(await touchPage.locator('.gallery-status').textContent(),/Photo 2 of 3/);
  assert.equal(touchContext.pages().length,1,'Swiping must not open a photo tab');
  results.push('Browser touchscreen swipe without unintended link navigation');

  const calm = await browser.newContext({ reducedMotion:'reduce' });
  const calmPage = await calm.newPage(); await calmPage.goto(base);
  await calmPage.getByRole('button', { name:'Next photograph', exact:true }).click();
  assert.equal(await calmPage.locator('.photo-slide').evaluateAll(slides => slides.flatMap(slide => slide.getAnimations()).length), 0);
  results.push('Reduced-motion switching');
  const plain = await browser.newContext({ javaScriptEnabled:false, viewport:{width:390,height:844} });
  const plainPage = await plain.newPage(); await plainPage.goto(base);
  assert.equal(await plainPage.locator('.photo-slide').evaluateAll(slides => slides.every(slide => getComputedStyle(slide).position !== 'absolute' && !slide.inert)), true);
  assert.equal(await plainPage.locator('.photo-controls').isVisible(), false);
  const laterPhoto = plainPage.locator('.photo-slide').last();
  await laterPhoto.scrollIntoViewIfNeeded();
  assert.ok((await laterPhoto.boundingBox()).x >= 0, 'No-JS photo strip remains natively scrollable');
  assert.ok((await laterPhoto.boundingBox()).width<=390,'Fallback photographs fit the phone reading width');
  results.push('Native no-JavaScript photo strip');
  assert.deepEqual(errors, []);
  await writeFile(resolve(output, 'gallery-results.json'), JSON.stringify({base,results,errors}, null, 2));
  console.log(`Gallery Playwright passed: ${results.length} checks, no console errors.`);
} finally { await browser.close(); }
