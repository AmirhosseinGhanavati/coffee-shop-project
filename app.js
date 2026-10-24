const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

window.addEventListener("load", () => {
  setTimeout(() => $("#loader")?.classList.add("hidden"), 1200);
});

const dot = $("#cursorDot");
const ring = $("#cursorRing");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

window.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (dot) {
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  }
});

function animateRing() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  if (ring) {
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
  }
  requestAnimationFrame(animateRing);
}
animateRing();

$$("a, button, .menu-card, .gallery-item, .nav-link, .social-btn").forEach(
  (el) => {
    el.addEventListener("mouseenter", () => ring?.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring?.classList.remove("hover"));
  },
);

const particlesEl = $("particles");
if (particlesEl) {
  for (let i = 0; i < 24; i++) {
    const p = document.createElemenet("div");
    p.className = "particle";
    const size = Math.random() * 3 + 1;
    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = Math.random() * 12 + 8 + "s";
    p.style.animationDelay = Math.random() * 8 + "s";
    particlesEl.appendChild(p);
  }
}

const navbar = $("#navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 30) navbar?.classList.add("scrolled");
  else navbar?.classList.remove("scrooled");

  if (window.scrollY > 400) $("#backTop")?.classList.add("show");
  else $("#backTop")?.classList.remove("show");
});

$("#backTop")?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const menuToggle = $("#menuToggle");
const navLinks = $(".nav-links");
menuToggle?.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("open");
});
$$(".nav-link").forEach((l) =>
  l.addEventListener("click", () => {
    menuToggle?.classList.remove("active");
    navLinks?.classList.remove("open");
  }),
);

const counters = $$(".stat-num");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.dataset.target;
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(target * eased);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);
counters.forEach((c) => counterObserver.observe(c));

const menuItems = [
  {
    name: "Classic Espresso",
    cat: "espresso",
    icon: "☕",
    desc: "Bold, intense shot of pure coffee essence. A timeless classic.",
    price: "$3.50",
    tags: ["Hot", "Strong"],
  },
  {
    name: "Velvet Cappuccino",
    cat: "espresso",
    icon: "🍵",
    desc: "Silky steamed milk over a double shot, dusted with cocoa.",
    price: "$4.75",
    tags: ["Hot", "Creamy"],
  },
  {
    name: "Caramel Latte",
    cat: "espresso",
    icon: "🥛",
    desc: "Smooth espresso with steamed milk and house-made caramel.",
    price: "$5.25",
    tags: ["Hot", "Sweet"],
  },
  {
    name: "Mocha Dream",
    cat: "espresso",
    icon: "🍫",
    desc: "Where coffee meets chocolate — rich Belgian cocoa bliss.",
    price: "$5.50",
    tags: ["Hot", "Indulgent"],
  },

  {
    name: "Pour Over",
    cat: "brewed",
    icon: "🫖",
    desc: "Hand-poured single origin, highlighting delicate flavor notes.",
    price: "$4.50",
    tags: ["Hand Crafted", "Single Origin"],
  },
  {
    name: "French Press",
    cat: "brewed",
    icon: "☕",
    desc: "Full-bodied immersion brew, smooth and aromatic.",
    price: "$4.00",
    tags: ["Bold", "Rich"],
  },
  {
    name: "Chemex Classic",
    cat: "brewed",
    icon: "⚗️",
    desc: "Clean, bright, and tea-like — a ritual of patience.",
    price: "$5.00",
    tags: ["Clean", "Bright"],
  },
  {
    name: "AeroPress Flight",
    cat: "brewed",
    icon: "🧪",
    desc: "Quick, intense extraction with a velvety finish.",
    price: "$4.75",
    tags: ["Quick", "Smooth"],
  },

  {
    name: "Honey Oat Latte",
    cat: "special",
    icon: "🍯",
    desc: "Oat milk, espresso, and wildflower honey — naturally sweet.",
    price: "$5.75",
    tags: ["Vegan", "Sweet"],
  },
  {
    name: "Lavender Haze",
    cat: "special",
    icon: "💜",
    desc: "Espresso with lavender syrup and a touch of vanilla cream.",
    price: "$5.95",
    tags: ["Floral", "Aromatic"],
  },
  {
    name: "Maple Pecan",
    cat: "special",
    icon: "🍁",
    desc: "Toasted pecan milk, maple syrup, and a double shot.",
    price: "$6.25",
    tags: ["Nutty", "Seasonal"],
  },
  {
    name: "Golden Turmeric",
    cat: "special",
    icon: "✨",
    desc: "Anti-inflammatory latte with ginger, cinnamon, and honey.",
    price: "$5.50",
    tags: ["Healthy", "Warming"],
  },

  {
    name: "Cold Brew",
    cat: "cold",
    icon: "🧊",
    desc: "16-hour steep, smooth and naturally sweet with low acidity.",
    price: "$4.50",
    tags: ["Cold", "Smooth"],
  },
  {
    name: "Iced Caramel Macchiato",
    cat: "cold",
    icon: "🥤",
    desc: "Vanilla, milk, espresso, and caramel over ice.",
    price: "$5.50",
    tags: ["Iced", "Sweet"],
  },
  {
    name: "Affogato",
    cat: "cold",
    icon: "🍨",
    desc: "Hot espresso poured over creamy vanilla gelato.",
    price: "$6.00",
    tags: ["Dessert", "Bold"],
  },
  {
    name: "Nitro Cold Brew",
    cat: "cold",
    icon: "🫧",
    desc: "Nitrogen-infused for a creamy, cascading pour.",
    price: "$5.25",
    tags: ["Nitro", "Velvety"],
  },
];

const menuGrid = $("#menuGrid");

function renderMenu(filter = "all") {
  if (!menuGrid) return;
  const filtered =
    filter === "all" ? menuItems : menuItems.filter((i) => i.cat === filter);
  menuGrid.innerHTML = filtered
    .map(
      (item, i) => `
      <article class="menu-card" data-cat="${item.cat}" style="animation-delay:${i * 60}ms">
      <span class="menu-card-cat">${item.cat}</span>
      <div class="menu-card-visual">
        <div class="menu-card-icon">${item.icon}</div>
      </div>
      <h3>${item.name}</h3>
      <p class="menu-card-desc">${item.desc}</p>
      <div class="menu-card-foot">
        <span class="menu-price">${item.price}</span>
        <button class="menu-add" aria-label="Add ${item.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      <div class="menu-card-tags">
        ${item.tags.map((t) => `<span>${t}</span>`).join("")}
      </div>
    </article>
 `,
    )
    .join('');

    $$('.menu-card').forEach(el => revealObserver.observe(el));
  }
  renderMenu();

  $$('.menu-tab').forEach(tab => {
    tab.addEventListener('click' , ()=>{
      $$('.menu-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.dataset.tab);
    });
  });

