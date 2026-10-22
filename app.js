const $ = (s,p=document) => p.querySelector(s);
const $$ = (s,p=document) => [...p.querySelectorAll(s)];

window.addEventListener('load',()=>{
    setTimeout(() => $('#loader')?.classList.add('hidden'), 1200);
});

const dot = $('#cursorDot');
const ring = $('#cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (dot) {
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  }
});

function animateRing() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

$$('a, button, .menu-card, .gallery-item, .nav-link, .social-btn').forEach(el => {
  el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
});

const particlesEl = $('particles');
if (particlesEl) {
    for (let i = 0; i < 24; i++) {
        const p =document.createElemenet('div');
        p.className = 'particle';
        const size = Math.random() * 3+1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left  = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        particlesEl.appendChild(p);
    }
}

const navbar = $('#navbar');
window.addEventListener('scroll',()=>{
  if(window.scrollY > 30) navbar?.classList.add('scrolled');
  else navbar?.classList.remove('scrooled');

if(window.scrollY > 400) $('#backTop')?.classList.add('show');
else $('#backTop')?.classList.remove('show');
});

$('#backTop')?.addEventListener('click',()=>{
    window.scrollTo({
        top: 0, behavior: 'smooth'
    });
});