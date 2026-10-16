import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(process.env.PLAYWRIGHT_MODULE).href:'playwright');
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge',headless:true});
try {
  const context=await browser.newContext();
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await page.route('**/script.js',async route=>{await new Promise(resolve=>setTimeout(resolve,700));await route.continue();});
  const base=process.env.SITE_URL||'http://127.0.0.1:8781/YUzhenghao-s-web/';
  await page.goto(base,{waitUntil:'networkidle'});
  await page.getByRole('link',{name:'Explore research and figures',exact:true}).click();
  await page.waitForURL('**/projects/reliable-robotic-manipulation/');
  await page.waitForLoadState('networkidle');
  await page.goBack();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(350);
  assert.deepEqual(errors,[],'Slow enhancement scripts must not leave rejected document transitions');
  console.log('Transition regression passed: delayed script, document navigation and history return, no console errors.');
} finally { await browser.close(); }
