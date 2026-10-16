import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
const root=resolve(import.meta.dirname,'..');
const pages=['index.html','projects/reliable-robotic-manipulation/index.html'];
let checked=0;
for(const name of pages){
  const file=resolve(root,name), html=await readFile(file,'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${name}: duplicate ids`);
  for(const [,attr,value] of html.matchAll(/\b(src|href|poster)="([^"]+)"/g)){
    if(/^(https?:|mailto:|data:)/.test(value))continue;
    const [local,hash]=value.split('#');
    const target=local?resolve(dirname(file),local.split('?')[0]):file;
    await access(target);
    if(hash && attr==='href' && target.endsWith('.html')){
      const targetHtml=target===file?html:await readFile(target,'utf8');
      assert.ok(targetHtml.includes(`id="${hash}"`),`${name}: missing anchor ${value}`);
    }
    checked++;
  }
  assert.equal([...html.matchAll(/<h1\b/g)].length,1,`${name}: one h1`);
  for(const [,image] of html.matchAll(/(<img\b[^>]*>)/g)){
    assert.match(image,/alt="[^"]*"/);assert.match(image,/width="\d+"/);assert.match(image,/height="\d+"/);
  }
  for(const [,video] of html.matchAll(/(<video\b[^>]*>)/g)){assert.match(video,/controls/);assert.match(video,/preload="none"/);assert.doesNotMatch(video,/autoplay/);}
}
const home=await readFile(resolve(root,'index.html'),'utf8');
for(const id of ['home','projects','publications','about','research','news','experience','cv','skills','contact'])assert.ok(home.includes(`id="${id}"`),id);
for(const fact of ['17.9% (20/112)','50.9% (57/112)','90.7%','6/20','2,016','10.198 GiB','97.88%','94.83%','10.62517/jike.202604230','Chaoyi Chen, Nuo Lei, Bingbing Li, Boli Chen, and Hao Zhang','SevnceRobotics','Ragtime Lab','Naira Hovakimyan','Peking University'])assert.ok(home.includes(fact),`Missing content: ${fact}`);
for(const name of ['assets/Zhenghao_Yu_Resume.pdf','assets/Zhenghao_Yu_CV.pdf','papers/game-diff-marl-cav-ramp-merging.pdf','papers/wheel-leg-drug-delivery-robot.pdf','papers/tri-modal-contactless-hmi.pdf'])assert.equal((await readFile(resolve(root,name))).subarray(0,4).toString(),'%PDF');
console.log(`Static checks passed: ${pages.length} pages, ${checked} local references, preserved anchors, source facts, media and 5 stable PDFs.`);
