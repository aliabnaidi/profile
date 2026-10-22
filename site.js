const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach((entry,i)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay=`${Math.min(i*40,220)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const modal=document.getElementById('certModal');
const title=document.getElementById('modalTitle');
document.querySelectorAll('[data-cert]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    title.textContent=btn.dataset.cert;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});
const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
document.querySelector('.modal-close')?.addEventListener('click',close);
modal?.addEventListener('click',e=>{if(e.target===modal)close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

const header=document.querySelector('.nav-wrap');
let last=0;
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  header.style.boxShadow=y>20?'0 8px 30px rgba(0,0,0,.18)':'none';
  last=y;
},{passive:true});
