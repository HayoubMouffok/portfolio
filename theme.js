// Thème chargé avant l'affichage pour éviter un flash de couleurs.
(() => {
  let t = null;
  try { t = localStorage.getItem("theme"); } catch (e) { /* stockage indisponible */ }
  if (!t) t = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  document.documentElement.dataset.theme = t;
})();
