/* ==========================================================
   LINK DO WHATSAPP: todos os botões com [data-wa] usam este link
   (EDITE aqui se o link mudar)
   ========================================================== */
const WHATSAPP_URL = "https://api.whatsapp.com/message/CGRJBXUV7TVMA1?autoload=1&app_absent=0";
document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = WHATSAPP_URL; el.target = "_blank"; el.rel = "noopener";
});
document.getElementById("year").textContent = new Date().getFullYear();

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Título do hero: palavra por palavra
document.querySelectorAll("[data-split]").forEach(h => {
  h.innerHTML = h.textContent.trim().split(/\s+/)
    .map((w, i) => `<span class="w"><i style="--i:${i}">${w}</i></span>`).join(" ");
});

// Menu mobile
const burger = document.getElementById("burger"), nav = document.getElementById("nav");
const toggleMenu = open => { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
burger.addEventListener("click", () => toggleMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

// Revelar ao rolar, com escalonamento dentro de grids
document.querySelectorAll("[data-stagger]").forEach(g =>
  [...g.children].forEach((c, i) => c.style.setProperty("--d", (i % 3) * 120 + "ms")));
const io = new IntersectionObserver((es, o) => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); }
}), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll("[data-anim]").forEach(el => io.observe(el));

// Rolagem: progresso, header que esconde e parallax suave (rAF + interpolação)
const header = document.getElementById("header"), bar = document.getElementById("progress");
const par = [...document.querySelectorAll("[data-speed]")].map(el => ({ el, s: +el.dataset.speed, y: 0 }));
let lastY = scrollY, ticking = false;
function frame() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  header.classList.toggle("hide", y > lastY && y > 200 && !nav.classList.contains("open"));
  lastY = y;
  if (!reduce) par.forEach(p => {
    const r = p.el.parentElement.getBoundingClientRect();
    if (r.bottom < -200 || r.top > innerHeight + 200) return;
    p.y += (y * p.s - p.y) * 0.12;                 // suaviza o movimento
    p.el.style.transform = `translate3d(0,${p.y.toFixed(1)}px,0)`;
  });
  ticking = Math.abs(par[0] ? par[0].y - scrollY * par[0].s : 0) > 0.3;
  if (ticking) requestAnimationFrame(frame);
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
frame();

// Inclinação 3D suave nos cards (só em dispositivos com mouse)
if (!reduce && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  document.querySelectorAll(".tilt").forEach(c => {
    c.addEventListener("pointermove", e => {
      const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
    });
    c.addEventListener("pointerleave", () => { c.style.transform = ""; });
  });
}

// FAQ accordion (um item aberto por vez)
document.querySelectorAll(".faq__q").forEach(btn => btn.addEventListener("click", () => {
  const open = btn.getAttribute("aria-expanded") === "true";
  document.querySelectorAll(".faq__q").forEach(b => { b.setAttribute("aria-expanded", "false"); b.nextElementSibling.style.maxHeight = null; });
  if (!open) { btn.setAttribute("aria-expanded", "true"); btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + "px"; }
}));
