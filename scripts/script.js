// === 1. Variables & Observer Setup ===
// Liste des éléments en attente d'observation (avant le premier scroll)
const pendingElements = [];
let hasScrolled = false;

// Création de l'IntersectionObserver pour gérer l'ajout/retrait de la classe 'show'
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

// === 2. Gestion du Scroll ===
// Au premier scroll, démarrer l'observation des éléments en attente
window.addEventListener('scroll', () => {
  if (hasScrolled) return;
  hasScrolled = true;
  pendingElements.forEach(el => observer.observe(el));
  pendingElements.length = 0;
}, { once: true });

// === 3. Fonction de Changement de Langue ===
async function setLang(lang, btn = null) {
  try {
    const res = await fetch(`./lang/${lang}.json`);
    const data = await res.json();

    // Injection des traductions dans les éléments HTML
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) el.innerHTML = data[key];
    });

    // Contenu de type 'comp-content'
    document.querySelectorAll('[data-i18n="comp-content"] .comp-container').forEach((el) => {
      el.classList.add('content', 'hidden');
      observer.observe(el);
    });

    // Contenu de type 'atout-content'
    document.querySelectorAll('[data-i18n="atout-content"] .comp-container').forEach((el) => {
      el.classList.add('content', 'hidden');
      if (hasScrolled) observer.observe(el);
      else pendingElements.push(el);
    });
    document
    .querySelectorAll('[data-i18n="exp-content"] .comp-container')
    .forEach(el => {
      el.classList.add('content','hidden');
      if (hasScrolled) observer.observe(el);
      else pendingElements.push(el);
    });
    document
    .querySelectorAll('.toolsimg')
    .forEach(el => {
      el.classList.add('content', 'hidden');
      if (hasScrolled) 
        observer.observe(el);
      else 
        pendingElements.push(el);
    });
    // Mise à jour du bouton actif
    document.querySelectorAll('.flags-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

  } catch (err) {
    console.error('Erreur de chargement des traductions :', err);
  }
}

// === 4. Initialisation au Chargement de la Page ===
window.onload = () => {
  const savedLang = localStorage.getItem('lang') || 'fr';
  const activeBtn = document.querySelector(`.flags-btn[onclick*="${savedLang}"]`);
  setLang(savedLang, activeBtn);
  initAccordion();
};

// === 5. Accordéon ===
function initAccordion() {
  document.querySelectorAll('.accordion').forEach(section => {
    const header = section.querySelector('.subh2');
    if (header) header.addEventListener('click', () => section.classList.toggle('open'));
  });
}

// === 6. Initialisation des Éléments Cachés ===
// Observer directement tout élément portant la classe 'hidden'
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// Préparer les blocs de contenu et d'atouts
const compAndAtout = document.querySelectorAll(
  '[data-i18n="comp-content"] .comp-container, ' +
  '[data-i18n="atout-content"] .comp-container'
);
compAndAtout.forEach(el => el.classList.add('hidden', 'content'));

// Préparer les blocs d'expériences
document.querySelectorAll('[data-i18n="exp-content"] .comp-container').forEach(el => {
  el.classList.add('content', 'hidden');
  if (hasScrolled) observer.observe(el);
  else pendingElements.push(el);
});