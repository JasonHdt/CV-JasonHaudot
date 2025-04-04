async function setLang(lang, btn = null) {  try {
    const res = await fetch(`./lang/${lang}.json`);
    const data = await res.json();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        // Si le contenu contient du HTML, on l'injecte comme tel
        el.innerHTML = data[key];
      }
    });
    document.querySelectorAll(".flags-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    // On active les popups après injection HTML
    initPopups(); 
    
    } catch (err) {
      console.error("Erreur de chargement des traductions :", err);
    }
}

// Connect pop up
function initPopups() {
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');
  const popupClose = document.getElementById('popup-close');

  const popupContents = {
    DWWM: "Le titre de Développeur Web et Web Mobile (DWWM) est une formation qui forme aux compétences de création de sites web et d'applications responsives.",
    charte: "La charte graphique est un document qui rassemble l’ensemble des règles fondamentales d’utilisation des signes graphiques d’une entreprise.",
    veille: "La veille professionnelle consiste à s'informer en continu sur les nouvelles technologies, tendances et bonnes pratiques du métier.",
    tools: "J'utilise des outils comme VS Code, Figma, Git, Trello, etc. pour organiser et réaliser mes projets.",
    autodidact: "J’ai appris de nombreuses compétences en me formant seul, en ligne, grâce à des tutoriels et de la documentation.",
    autonome: "L’autonomie me permet de prendre des initiatives et d’organiser mon travail efficacement, même sans supervision constante.",
    loisir: "Mes projets personnels autour de mes loisirs (jeux, musique, etc.) m’ont permis de progresser techniquement.",
    experiencepro: "Mon expérience pro est encore jeune, mais je suis motivé et prêt à m’investir à 100% dans le domaine."
  };

  Object.keys(popupContents).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.cursor = "pointer";
      element.addEventListener('click', () => {
        popupText.textContent = popupContents[id];
        popup.style.display = "flex";
      });
    }
  });

  popupClose.addEventListener('click', () => {
    popup.style.display = "none";
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
}
// Langue par défaut en load
window.onload = () => {
    const savedLang = localStorage.getItem("lang") || "fr";
    const activeBtn = document.querySelector(`.flags-btn[onclick*="${savedLang}"]`);
    setLang(savedLang, activeBtn);
  };

document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');
  const popupClose = document.getElementById('popup-close');

  // Texte pour chaque span cliquable
  const popupContents = {
    DWWM: "Le titre de Développeur Web et Web Mobile (DWWM) est une formation qui forme aux compétences de création de sites web et d'applications responsives.",
    charte: "La charte graphique est un document qui rassemble l’ensemble des règles fondamentales d’utilisation des signes graphiques d’une entreprise.",
    veille: "La veille professionnelle consiste à s'informer en continu sur les nouvelles technologies, tendances et bonnes pratiques du métier.",
    tools: "J'utilise des outils comme VS Code, Figma, Git, Trello, etc. pour organiser et réaliser mes projets.",
    autodidact: "J’ai appris de nombreuses compétences en me formant seul, en ligne, grâce à des tutoriels et de la documentation.",
    autonome: "L’autonomie me permet de prendre des initiatives et d’organiser mon travail efficacement, même sans supervision constante.",
    loisir: "Mes projets personnels autour de mes loisirs (jeux, musique, etc.) m’ont permis de progresser techniquement.",
    experiencepro: "Mon expérience pro est encore jeune, mais je suis motivé et prêt à m’investir à 100% dans le domaine."
  };

  // Attache un listener à chaque span ID présent dans le contenu
  Object.keys(popupContents).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.cursor = "pointer";
      element.addEventListener('click', () => {
        popupText.textContent = popupContents[id];
        popup.style.display = "flex";
      });
    }
  });

  popupClose.addEventListener('click', () => {
    popup.style.display = "none";
  });

  // Fermer si clic en dehors
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});

// POP UP SCRIPTS
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const popupText = document.getElementById('popup-text');
  const popupClose = document.getElementById('popup-close');

  // Texte pour chaque span cliquable
  const popupContents = {
    DWWM: "Le titre de Développeur Web et Web Mobile (DWWM) est une formation qui forme aux compétences de création de sites web et d'applications responsives.",
    charte: "La charte graphique est un document qui rassemble l’ensemble des règles fondamentales d’utilisation des signes graphiques d’une entreprise.",
    veille: "La veille professionnelle consiste à s'informer en continu sur les nouvelles technologies, tendances et bonnes pratiques du métier.",
    tools: "J'utilise des outils comme VS Code, Figma, Git, Trello, etc. pour organiser et réaliser mes projets.",
    autodidact: "J’ai appris de nombreuses compétences en me formant seul, en ligne, grâce à des tutoriels et de la documentation.",
    autonome: "L’autonomie me permet de prendre des initiatives et d’organiser mon travail efficacement, même sans supervision constante.",
    loisir: "Mes projets personnels autour de mes loisirs (jeux, musique, etc.) m’ont permis de progresser techniquement.",
    experiencepro: "Mon expérience pro est encore jeune, mais je suis motivé et prêt à m’investir à 100% dans le domaine."
  };

  // Attache un listener à chaque span ID présent dans le contenu
  Object.keys(popupContents).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.cursor = "pointer";
      element.addEventListener('click', () => {
        popupText.textContent = popupContents[id];
        popup.style.display = "flex";
      });
    }
  });

  popupClose.addEventListener('click', () => {
    popup.style.display = "none";
  });

  // Fermer si clic en dehors
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});