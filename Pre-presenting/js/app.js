const $=id=>document.getElementById(id),body=document.body;
const theme=document.querySelector('meta[name=theme-color]');
let timer=null;
function show(s){body.dataset.screen=s;theme.content=(s==='start'||s==='preend'||s==='ending')?'#EAFDFF':'#E5F8FA'}
function setDigit(n){
  document.querySelectorAll('.digit').forEach(d=>d.classList.toggle('on',+d.dataset.n===n));
  $('live').textContent=n;
}
function startCountdown(){
  clearInterval(timer);clearTimeout(bt);clearInterval(dt);stopMove();show('count');
  let n=3;setDigit(n);
  timer=setInterval(()=>{
    if(n>1){setDigit(--n)}
    else{clearInterval(timer);document.dispatchEvent(new CustomEvent('mooca:countdown-done'))}
  },1000);
}
function back(){clearInterval(timer);clearTimeout(bt);clearInterval(dt);stopMove();show('start')}
const press=(el,fn)=>{el.addEventListener('click',fn);
  el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})};
press($('start'),startCountdown);
document.querySelectorAll('.back').forEach(b=>press(b,back));

const D={in:4000,hold:2000,out:6000},BIG=410/310,CYC=3,PH={in:'หายใจเข้า',hold:'ค้างไว้',out:'หายใจออก'};
let bt=null,dt=null;const N={in:4,hold:2,out:6};
function setPhase(p,c){
  const z=$('b-zoom');
  z.style.willChange=p==='hold'?'auto':'transform';
  z.style.transition=p==='hold'?'none':`transform ${D[p]}ms cubic-bezier(.45,0,.55,1)`;
  z.style.transform=`scale(${p==='out'?1/BIG:1})`;
  document.querySelectorAll('.ph').forEach(e=>e.classList.toggle('on',e.dataset.p===p));
  $('b-zoom').classList.toggle('o',p==='out');
  setDots(p);
  $('round').textContent=`รอบที่ ${c}/${CYC}`;
  $('b-live').textContent=PH[p];
}
function setDots(p){
  clearInterval(dt);const n=N[p],g=[...document.querySelectorAll('.dp')];
  const lit=k=>g.forEach((e,i)=>e.lastChild.classList.toggle('on',i<k));
  g.forEach((e,i)=>{e.style.display=i<n?'':'none';[...e.children].forEach(c=>c.setAttribute('cx',201+(i-(n-1)/2)*28))});
  let k=1;lit(k);
  dt=setInterval(()=>{if(++k>n){clearInterval(dt);return}lit(k)},1000);
}
function cycle(c){
  if(c>CYC){clearInterval(dt);$('b-zoom').style.willChange='auto';document.dispatchEvent(new CustomEvent('mooca:breathing-done'));return}
  setPhase('in',c);
  bt=setTimeout(()=>{setPhase('hold',c);
    bt=setTimeout(()=>{setPhase('out',c);
      bt=setTimeout(()=>cycle(c+1),D.out)},D.hold)},D.in);
}
function startBreathing(){
  clearTimeout(bt);clearInterval(dt);show('breathe');
  const z=$('b-zoom');z.style.willChange='auto';z.style.transition='none';z.style.transform=`scale(${1/BIG})`;z.getBoundingClientRect();
  cycle(1);
}
document.addEventListener('mooca:countdown-done',startBreathing);

const MD={
 su:{n:4,dur:4000,t:'translateY(-26px)',tr:'4000ms cubic-bezier(.25,.6,.35,1)',msg:'สูดหายใจเข้าลึก ๆ ยกไหล่ขึ้นช้า ๆ'},
 sd:{n:0,dur:2200,t:'translateY(0)',tr:'450ms cubic-bezier(.55,0,.85,.45)',msg:'ทิ้งไหล่ลง หายใจออกยาว ๆ เหมือนถอนหายใจ'},
 hc:{n:4,dur:4000,t:'scale(.8)',tr:'2000ms cubic-bezier(.4,0,.2,1)',msg:'กำมือ ค้างไว้ พร้อมกับหายใจเข้า'},
 hr:{n:4,dur:4000,t:'scale(1.12)',tr:'1200ms cubic-bezier(.2,.7,.3,1)',msg:'คลายมือออก พร้อมหายใจออก'},
 sk:{n:8,dur:8000,t:'none',tr:'400ms ease-out',msg:'สะบัด ๆ มือ สบัดให้ตัวโยกไปเลย'}};
const MSTEPS=[];
for(let c=1;c<=3;c++)MSTEPS.push({p:'su',c},{p:'sd',c});
for(let c=1;c<=3;c++)MSTEPS.push({p:'hc',c},{p:'hr',c});
MSTEPS.push({p:'sk',c:0});
let mt=null,mt2=null,mdt=null,shk=null;
function stopMove(){clearTimeout(mt);clearTimeout(mt2);clearInterval(mdt);if(shk){shk.cancel();shk=null}}
function mDots(n){
  clearInterval(mdt);const g=[...document.querySelectorAll('.mp')];
  const lit=k=>g.forEach((e,i)=>e.lastChild.classList.toggle('on',i<k));
  g.forEach((e,i)=>{e.style.display=i<n?'':'none';[...e.children].forEach(c=>c.setAttribute('cx',201+(i-(n-1)/2)*28))});
  if(!n)return;let k=1;lit(k);
  mdt=setInterval(()=>{if(++k>n){clearInterval(mdt);return}lit(k)},1000);
}
function shake(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const f=[],N=64;
  for(let i=0;i<=N;i++){const t=i/N,e=Math.min(1,t*8)*Math.min(1,(1-t)*5),s=i%2?1:-1;
    f.push({transform:`translateX(${s*7*e}px) rotate(${-s*2.2*e}deg)`,offset:t})}
  shk=$('mslot').animate(f,{duration:7600,easing:'linear'});
}
function mStep(k){
  const d=MD[k.p],s=$('mslot');
  clearTimeout(mt2);if(shk){shk.cancel();shk=null}
  document.querySelectorAll('.mph').forEach(e=>e.classList.toggle('on',e.dataset.p===k.p));
  const r=$('mround');r.style.opacity=k.c?1:0;if(k.c)r.textContent=`รอบที่ ${k.c}/3`;
  $('m-live').textContent=d.msg;
  mDots(d.n);
  s.style.transition=`transform ${d.tr}`;s.style.transform=d.t;
  if(k.p==='sk')mt2=setTimeout(shake,400);
}
function mRun(i){
  if(i>=MSTEPS.length){document.dispatchEvent(new CustomEvent('mooca:move-done'));return}
  mStep(MSTEPS[i]);mt=setTimeout(()=>mRun(i+1),MD[MSTEPS[i].p].dur);
}
function startMove(){
  if(body.dataset.screen!=='breathe')return;
  stopMove();show('move');
  const s=$('mslot');s.style.transition='none';s.style.transform='none';s.getBoundingClientRect();
  mRun(0);
}
document.addEventListener('mooca:breathing-done',()=>setTimeout(startMove,400));

function startFocus(){stopMove();show('focus')}
document.addEventListener('mooca:move-done',()=>setTimeout(startFocus,400));
press($('focus-cta'),()=>show('preend'));
press($('preend-cta'),()=>show('ending'));
press($('preend-secondary'),startCountdown);
press($('ending-cta'),back);
