const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
if(menuBtn) menuBtn.addEventListener('click',()=>nav.classList.toggle('active'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('active')));

document.querySelectorAll('.faq-item button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.parentElement;
    document.querySelectorAll('.faq-item').forEach(x=>{if(x!==item)x.classList.remove('open')});
    item.classList.toggle('open');
  });
});

const form=document.getElementById('contactForm');
if(form) form.addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('formMsg').textContent='Thanks — your message has been received.';
  form.reset();
});

const reveal=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity=1;e.target.style.transform='translateY(0)';reveal.unobserve(e.target)}})
},{threshold:.08});
document.querySelectorAll('.card,.story,.concept').forEach(el=>{
  el.style.opacity=0;el.style.transform='translateY(15px)';el.style.transition='opacity .5s ease,transform .5s ease';reveal.observe(el);
});
