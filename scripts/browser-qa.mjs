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
    if(!route){
      const geometry=await page.evaluate(()=>{
        const line=document.querySelector('.name-line:last-child > span');
        const range=document.createRange();range.selectNodeContents(line);
        const text=range.getBoundingClientRect();
        const image=document.querySelector('.hero-image-frame').getBoundingClientRect();
        return {overlap:text.left<image.right&&text.right>image.left&&text.top<image.bottom&&text.bottom>image.top,
          firstLine:document.querySelector('.name-line').textContent.trim(),
          tracking:parseFloat(getComputedStyle(document.querySelector('.hero h1')).letterSpacing),
          fontSize:parseFloat(getComputedStyle(document.querySelector('.hero h1')).fontSize)};
      });
      assert.equal(geometry.overlap,false,`Name/image collision ${width}`);
      assert.equal(geometry.firstLine,'Zhenghao YU');
      assert.ok(geometry.tracking>=-.013*geometry.fontSize,'Relaxed hero tracking');
      const chapterGrounds=await page.locator('main > .section').evaluateAll(sections=>sections.map(section=>getComputedStyle(section).backgroundColor));
      for(let i=1;i<chapterGrounds.length;i++)assert.notEqual(chapterGrounds[i],chapterGrounds[i-1],`Adjacent chapters need distinguishable fields: ${width}`);
    }
    if(!route && width===1440 && height===620) await page.screenshot({path:resolve(output,'home-short-desktop.png')});
    if(!route && width===390){
      const originalTop=await page.locator('main').evaluate(el=>el.getBoundingClientRect().top);

      await page.getByRole('button',{name:'Menu',exact:false}).click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
      await page.waitForTimeout(250);
      assert.equal(await page.locator('main').evaluate(el=>el.getBoundingClientRect().top),originalTop,'Menu must not shift content');
      await page.screenshot({path:resolve(output,'mobile-menu-open.png')});
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('menu-toggle')),true);
      await page.locator('.menu-toggle').evaluate(el=>{for(let i=0;i<5;i++)el.dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));});
      await page.waitForTimeout(280);
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true','Rapid toggles settle at last request');
      await page.getByRole('link',{name:'Publications',exact:true}).click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
      await page.waitForFunction(()=>document.querySelector('.primary-navigation a[href="#publications"]').getAttribute('aria-current')==='location');
      await page.goto(base,{waitUntil:'networkidle'});
    }
    if(!route && width===1440 && height===1000){
      const contrast=await page.evaluate(()=>{
        const luminance=color=>{
          const channels=color.match(/[\d.]+/g).slice(0,3).map(Number).map(value=>{const c=value/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4;});
          return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
        };
        const ratio=(a,b)=>{const l=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (l[0]+.05)/(l[1]+.05);};
        const rail=getComputedStyle(document.querySelector('.site-rail')).backgroundColor;
        return [...document.querySelectorAll('.primary-navigation a,.rail-footer p,.site-rail .cv-link')].map(el=>{
          const style=getComputedStyle(el);
          const ground=style.backgroundColor==='rgba(0, 0, 0, 0)'?rail:style.backgroundColor;
          return {text:el.textContent.trim(),ratio:ratio(style.color,ground)};
        });
      });
      assert.ok(contrast.every(item=>item.ratio>=4.5),JSON.stringify(contrast));
      const hoverTarget=page.getByRole('link',{name:'Publications',exact:true});
      await hoverTarget.hover();await page.waitForTimeout(220);
      assert.notEqual(await hoverTarget.evaluate(el=>getComputedStyle(el).color),await hoverTarget.evaluate(el=>getComputedStyle(el).backgroundColor));
      results.push({test:'navigation contrast and distinct chapter fields',passed:true,minimumTextContrast:Math.min(...contrast.map(item=>item.ratio))});
      await page.getByRole('tab',{name:'Time-step sensitivity'}).click();
      await page.locator('#timesteps').waitFor({state:'visible'});
      assert.equal(await page.locator('#tracking').isVisible(),false);
      await page.getByRole('tab',{name:'Time-step sensitivity'}).focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.getByRole('tab',{name:'Arrival & effort'}).getAttribute('aria-selected'),'true');
      await page.getByRole('tab',{name:'Tracking',exact:true}).click();
      await page.getByRole('tab',{name:'Tracking',exact:true}).focus();
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(240);
      await page.locator('.evidence-browser').screenshot({path:resolve(output,'evidence-keyboard-focus.png')});
      await page.locator('.evidence-controls').evaluate(el=>{
        const tabs=el.querySelectorAll('button');
        for(const i of [0,2,1,2,0])tabs[i].dispatchEvent(new MouseEvent('click',{bubbles:true,detail:1}));
      });
      await page.locator('#tracking').waitFor({state:'visible'});
      await page.waitForTimeout(300);
      assert.equal(await page.getByRole('tab',{name:'Tracking',exact:true}).getAttribute('aria-selected'),'true');
      assert.equal(await page.locator('.evidence-panel:visible').count(),1);
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
      if(!route){
        await page.locator('#publications').evaluate(el=>scrollTo({top:el.offsetTop-(innerWidth<600?140:220),behavior:'instant'}));
        await page.waitForTimeout(250);
        await page.screenshot({path:resolve(output,`section-boundary-${width}.png`)});
        await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
      }
    }
    results.push({route:route||'home',width,height,overflow:false});
  }
}
// Native View Transitions are optional. Verify the immediate + WAAPI fallback.
await page.goto(base,{waitUntil:'networkidle'});
await page.evaluate(()=>{document.startViewTransition=undefined;});
await page.getByRole('tab',{name:'Arrival & effort'}).click();
await page.locator('#arrival').waitFor({state:'visible'});
await page.getByRole('tab',{name:'Arrival & effort'}).focus();
await page.keyboard.press('Home');
assert.equal(await page.locator('#tracking').isVisible(),true);
assert.equal(await page.locator('#tracking').evaluate(el=>el.getAnimations().length),0,'Keyboard changes are immediate');
results.push({test:'rapid state changes, text/image separation, overlay stability and transition fallback',passed:true});
// Use actual same-origin document navigation and history restoration.
await page.getByRole('link',{name:'Explore research and figures',exact:true}).click();
await page.waitForURL('**/projects/reliable-robotic-manipulation/');
assert.equal(await page.locator('.research-title').isVisible(),true);
await page.goBack();
await page.waitForURL(base);
results.push({test:'cross-document navigation and browser back',passed:true});
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
