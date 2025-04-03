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

  } catch (err) {
    console.error("Erreur de chargement des traductions :", err);
  }
  localStorage.setItem("lang", lang);
}

window.onload = () => {
    const savedLang = localStorage.getItem("lang") || "fr";
    const activeBtn = document.querySelector(`.flags-btn[onclick*="${savedLang}"]`);
    setLang(savedLang, activeBtn);
  };
  