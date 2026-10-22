const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const isMobileNav=window.matchMedia('(max-width: 760px)').matches;
const observer=!isMobileNav && 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
  entries.forEach((entry,i)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay=`${Math.min(i*40,220)}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12}) : null;
document.querySelectorAll('.reveal').forEach(el=>{ if(observer) observer.observe(el); else el.classList.add('visible'); });

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
if(header && !isMobileNav){
  let pending=false;
  window.addEventListener('scroll',()=>{
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{header.classList.toggle('is-scrolled',window.scrollY>20);pending=false;});
  },{passive:true});
}
// Avoid expensive animated scrolling across long sections on mobile.
if(isMobileNav){
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
    const hash=link.getAttribute('href');
    if(!hash || hash==='#')return;
    const target=document.getElementById(hash.slice(1));
    if(!target)return;
    event.preventDefault();
    navLinks?.classList.remove('open');
    const top=target.getBoundingClientRect().top+window.scrollY-(header?.offsetHeight||0)-10;
    window.scrollTo({top:Math.max(0,top),behavior:'instant'});
    history.replaceState(null,'',hash);
  }));
}
