import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const modulePath=process.env.PLAYWRIGHT_MODULE;
const {chromium}=await import(modulePath?pathToFileURL(modulePath).href:'playwright');
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge',headless:true});
const base=process.env.SITE_URL||'http://127.0.0.1:8781/YUzhenghao-s-web/';
const output=resolve('output/playwright');
await mkdir(output,{recursive:true});
await mkdir('.impeccable/review',{recursive:true});
const errors=[], results=[];
const context=await browser.newContext();
const page=await context.newPage();
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('response',r=>{if(r.status()>=400 && r.url().startsWith(base)) errors.push(`${r.status()} ${r.url()}`);});

for(const route of ['', 'projects/reliable-robotic-manipulation/']){
  for(const [width,height] of [[320,740],[390,844],[768,1024],[1024,680],[1440,1000],[1440,620]]){
    await page.setViewportSize({width,height});
    await page.goto(base+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(1050);
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
    assert.equal(overflow,false,`Overflow ${route} ${width}x${height}`);
    if(!route && width===390){
      await page.getByRole('button',{name:'Menu',exact:false}).click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('menu-toggle')),true);
      await page.getByRole('button',{name:'Menu',exact:false}).click();
      await page.getByRole('link',{name:'Publications',exact:true}).click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      await page.goto(base,{waitUntil:'networkidle'});
    }
    if(!route && width===1440 && height===1000){
      await page.getByRole('tab',{name:'Time-step sensitivity'}).click();
      assert.equal(await page.locator('#timesteps').isVisible(),true);
      assert.equal(await page.locator('#tracking').isVisible(),false);
      await page.getByRole('tab',{name:'Time-step sensitivity'}).focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.getByRole('tab',{name:'Arrival & effort'}).getAttribute('aria-selected'),'true');
      await page.getByRole('tab',{name:'Tracking',exact:true}).click();
      await page.getByRole('tab',{name:'Tracking',exact:true}).focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(240);
      await page.locator('.evidence-browser').screenshot({path:resolve(output,'evidence-keyboard-focus.png')});
      await page.getByRole('tab',{name:'Tracking',exact:true}).click();
      const disclosure=page.locator('.research-feature details');
      await disclosure.locator('summary').click();assert.equal(await disclosure.getAttribute('open'),'');
      await disclosure.locator('summary').click();
      const video=page.locator('.research-feature video');
      await video.evaluate(async el=>{await el.play();});
      await page.waitForTimeout(300);
      assert.equal(await video.evaluate(el=>el.currentTime>0),true);
      await video.evaluate(el=>{el.pause();});
      // Scroll all content into view once so lazy evidence and paper figures are fetched.
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=800){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,65));}scrollTo({top:0,behavior:'instant'});});
      await page.waitForTimeout(500);
      const missing=await page.locator('img:visible').evaluateAll(images=>images.filter(img=>!img.complete||!img.naturalWidth).map(img=>img.src));
      assert.deepEqual(missing,[]);
      results.push({test:'evidence tabs, keyboard, disclosure, video playback, lazy images',passed:true});
    }
    if((width===1440 && height===1000)||width===390){
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=900){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,65));}scrollTo({top:0,behavior:'instant'});});
      await page.waitForTimeout(800);
      const label=route?'research':'home';
      await page.screenshot({path:resolve(output,`${label}-${width}.png`),fullPage:true});
      await page.screenshot({path:resolve(output,`${label}-${width}-viewport.png`)});
      if(!route)await page.screenshot({path:resolve(`.impeccable/review/${width===390?'mobile':'desktop'}.png`),fullPage:true});
    }
    results.push({route:route||'home',width,height,overflow:false});
  }
}
const plain=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
const plainPage=await plain.newPage();await plainPage.goto(base);
assert.equal(await plainPage.locator('#arrival').isVisible(),true);
assert.equal(await plainPage.locator('#timesteps').isVisible(),true);
assert.equal(await plainPage.locator('#tracking').isVisible(),true);
assert.equal(await plainPage.locator('#contact').isVisible(),true);
assert.equal(await plainPage.locator('.site-rail').evaluate(el=>getComputedStyle(el).position),'relative');
results.push({test:'no-JavaScript content and all evidence visible',passed:true});
const calm=await browser.newContext({reducedMotion:'reduce'});
const calmPage=await calm.newPage();await calmPage.goto(base);
assert.equal(await calmPage.evaluate(()=>document.getAnimations().length),0);
results.push({test:'reduced-motion, no entrance animations',passed:true});
assert.deepEqual(errors,[],'Console/network errors');
await writeFile(resolve(output,'results.json'),JSON.stringify({base,results,errors},null,2));
await browser.close();console.log(`Playwright passed: ${results.length} checks, no console/network errors. Screenshots in output/playwright.`);
