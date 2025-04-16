const pendingElements = [];
let hasScrolled = false;

window.addEventListener('scroll', () => {
  if (hasScrolled) return;
  hasScrolled = true;

  pendingElements.forEach(el => observer.observe(el));
  pendingElements.length = 0;
}, { once: true });

// === Gestion des langues ===
async function setLang(lang, btn = null) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        el.innerHTML = data[key]; // Injection du HTML traduit
      }
    });
    // Après avoir injecté le HTML
    if (window.innerWidth > 450) {
      document.querySelectorAll('[data-i18n="comp-content"] .comp-container').forEach((el) => {
        el.classList.add('content', 'hidden');
        observer.observe(el);
      });
    
      document.querySelectorAll('[data-i18n="atout-content"] .comp-container').forEach((el) => {
        el.classList.add('content', 'hidden');
        pendingElements.push(el);

      });
    }

    document.querySelectorAll(".flags-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    initPopups();       // Réactive les éventuels popups
    initAccordion();    // Réactive les clics de l'accordéon après injection

  } catch (err) {
    console.error("Erreur de chargement des traductions :", err);
  }
}

// === Langue par défaut au chargement de la page ===
window.onload = () => {
  const savedLang = localStorage.getItem("lang") || "fr";
  const activeBtn = document.querySelector(`.flags-btn[onclick*="${savedLang}"]`);
  setLang(savedLang, activeBtn);
  initAccordion(); // Au cas où le contenu est déjà là
};

// === Accordéon ===
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

// Afficher pendant un scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, {
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.querySelectorAll('[data-i18n="comp-content"] .comp-container, [data-i18n="atout-content"] .comp-container')
  .forEach(el => {
    el.classList.add('hidden', 'content');
  });
