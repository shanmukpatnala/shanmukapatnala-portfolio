/* Typing animation */
const typedEl = document.getElementById('typed');
const texts = ['Full Stack Developer','Java Developer','Problem Solver','AI Enthusiast'];
let ti=0, chi=0, forward=true;
function tick(){
  const cur=texts[ti];
  if(forward){
    chi++;
    if(chi>cur.length){forward=false;setTimeout(tick,800);return}
  } else {
    chi--;
    if(chi<0){forward=true;ti=(ti+1)%texts.length}
  }
  typedEl.textContent=cur.slice(0,chi);
  setTimeout(tick, forward?80:40);
}
tick();

/* Smooth navigation, toggle */
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const href=a.getAttribute('href');
  if(href.length>1){
    e.preventDefault();document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
  }
}));
const navToggle=document.querySelector('.nav-toggle'), navLinks=document.querySelector('.nav-links');
navToggle?.addEventListener('click',()=>navLinks.classList.toggle('open'));

/* Active link on scroll */
const sections=document.querySelectorAll('main section[id]');
const navA=document.querySelectorAll('.nav-links a');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    const id=e.target.id; const link=document.querySelector('.nav-links a[href="#'+id+'"]');
    if(e.isIntersecting){navA.forEach(x=>x.classList.remove('active')); link?.classList.add('active')}
  })
},{threshold:0.5});
sections.forEach(s=>obs.observe(s));

/* Fade-up reveal */
const fades=document.querySelectorAll('.fade-up');
const fadeObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view')}})},{threshold:0.12});
fades.forEach(f=>fadeObs.observe(f));

/* Skill progress on view */
const progressEls=document.querySelectorAll('.progress span');
const progObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const s=e.target; s.style.width=s.style.getPropertyValue('--w');}})},{threshold:0.3});
progressEls.forEach(p=>progObs.observe(p));

/* Simple particle background for hero */
const canvas=document.getElementById('hero-canvas');
if(canvas){
  const ctx=canvas.getContext('2d'); let W, H, particles=[];
  function resize(){W=canvas.width=canvas.clientWidth; H=canvas.height=canvas.clientHeight}
  window.addEventListener('resize',resize); resize();
  function rand(min,max){return Math.random()*(max-min)+min}
  for(let i=0;i<80;i++){particles.push({x:rand(0,W),y:rand(0,H),r:rand(0.4,2.4),vx:rand(-0.3,0.3),vy:rand(-0.2,0.2)})}
  function draw(){ctx.clearRect(0,0,W,H);
    for(const p of particles){p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath(); ctx.fillStyle='rgba(91,212,255,0.12)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* Project card tilt effect */
document.querySelectorAll('.project-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect=card.getBoundingClientRect(); const x=e.clientX-rect.left; const y=e.clientY-rect.top; const cx=rect.width/2, cy=rect.height/2;
    const rx=(y-cy)/cy*6; const ry=(x-cx)/cx*-6; card.querySelector('.project-inner').style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave',()=>{card.querySelector('.project-inner').style.transform='none'})
});

/* Contact form (non-functional) */
document.getElementById('contact-form')?.addEventListener('submit',e=>{e.preventDefault();alert('Thanks — message sent (placeholder).')});
