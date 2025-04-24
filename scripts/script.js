// === VARIABLES ET OBSERVATEUR ===
const pendingElements = [];
let hasScrolled = false;

// Observer pour l'animation lors de l'apparition dans le viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

// Gestion du scroll pour activer l'observation des éléments différés
window.addEventListener('scroll', () => {
  if (hasScrolled) return;
  hasScrolled = true;

  pendingElements.forEach(el => observer.observe(el));
  pendingElements.length = 0;
}, { once: true });

// === FONCTION DE CHANGEMENT DE LANGUE ===
async function setLang(lang, btn = null) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    const data = await res.json();

    // Injection des traductions dans les éléments HTML
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        el.innerHTML = data[key];
      }
    });

    // Ajout des classes et observation des blocs après injection
    document.querySelectorAll('[data-i18n="comp-content"] .comp-container').forEach((el) => {
      el.classList.add('content', 'hidden');
      observer.observe(el);
    });

    document.querySelectorAll('[data-i18n="atout-content"] .comp-container').forEach((el) => {
      el.classList.add('content', 'hidden');
      if (hasScrolled) {
        observer.observe(el);
      } else {
        pendingElements.push(el);
      }
    });

    // Mise à jour de l'état actif du bouton de langue
    document.querySelectorAll(".flags-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    initPopups();     // Réinitialisation des popups
    initAccordion();  // Réinitialisation de l'accordéon

  } catch (err) {
    console.error("Erreur de chargement des traductions :", err);
  }
}

// === INITIALISATION AU CHARGEMENT ===
window.onload = () => {
  const savedLang = localStorage.getItem("lang") || "fr";
  const activeBtn = document.querySelector(`.flags-btn[onclick*="${savedLang}"]`);
  setLang(savedLang, activeBtn);
  initAccordion();
};

// === ACCORDÉON ===
function initAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(section => {
    const header = section.querySelector(".subh2");
    if (header) {
      header.addEventListener("click", () => {
        section.classList.toggle("open");
      });
    }
  });
}

// === INITIALISATION DES BLOCS CACHÉS ===
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.querySelectorAll('[data-i18n="comp-content"] .comp-container, [data-i18n="atout-content"] .comp-container')
  .forEach(el => {
    el.classList.add('hidden', 'content');
  });

