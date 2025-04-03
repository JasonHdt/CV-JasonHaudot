async function setLang(lang) {
    try {
      const res = await fetch(`./lang/${lang}.json`);
      const data = await res.json();
  
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) {
          // Si le contenu contient du HTML, on l'injecte comme tel
          el.innerHTML = data[key];
        }
      });
    } catch (err) {
      console.error("Erreur de chargement des traductions :", err);
    }
  }
  
  // Charger FR par défaut
  window.onload = () => setLang("fr");
  