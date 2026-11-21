// Thème chargé avant l'affichage pour éviter un flash de couleurs.
(() => {
  let t = null;
  try { t = localStorage.getItem("theme"); } catch (e) { /* stockage indisponible */ }
  if (!t) t = "dark"; // le mode nuit reste l'identité du site ; le mode jour est un choix explicite
  document.documentElement.dataset.theme = t;
})();
