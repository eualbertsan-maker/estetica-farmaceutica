/* ==========================================================
   LINK DO WHATSAPP: todos os botões com [data-wa] usam este link
   (EDITE aqui se o link mudar)
   ========================================================== */
const WHATSAPP_URL = "https://api.whatsapp.com/message/CGRJBXUV7TVMA1?autoload=1&app_absent=0";

document.querySelectorAll("[data-wa]").forEach(el => {
  el.href = WHATSAPP_URL;
  el.target = "_blank";
  el.rel = "noopener";
});

// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const toggleMenu = open => {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
};
burger.addEventListener("click", () => toggleMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => toggleMenu(false)));

// Animações de entrada ao rolar (fade-in / slide-up)
const io = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// FAQ accordion (um item aberto por vez)
document.querySelectorAll(".faq__q").forEach(btn => {
  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq__q").forEach(b => {
      b.setAttribute("aria-expanded", "false");
      b.nextElementSibling.style.maxHeight = null;
    });
    if (!isOpen) {
      btn.setAttribute("aria-expanded", "true");
      btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + "px";
    }
  });
});
