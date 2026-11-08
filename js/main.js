/* =========================================================
   PALETA DE COLORES
   Cambia esta línea para dejar fija otra paleta:
     "petroleo" -> A. Azul petróleo y gris
     "umb"      -> B. Colores UMB
   ========================================================= */
const PALETA_POR_DEFECTO = "umb";

(function () {
  var raiz = document.documentElement;
  raiz.classList.add("js");

  // 1) Paleta: ?paleta=umb en la URL > paleta elegida en esta sesión > por defecto
  var validas = ["petroleo", "umb"];
  var paleta = PALETA_POR_DEFECTO;
  try {
    var guardada = sessionStorage.getItem("paleta");
    if (validas.indexOf(guardada) !== -1) paleta = guardada;
  } catch (e) {}
  var deUrl = new URLSearchParams(window.location.search).get("paleta");
  if (validas.indexOf(deUrl) !== -1) {
    paleta = deUrl;
    try { sessionStorage.setItem("paleta", deUrl); } catch (e) {}
  }
  raiz.setAttribute("data-paleta", paleta);

  // 2) Menú en celular
  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.querySelector(".menu-boton");
    var nav = document.getElementById("menu-principal");
    if (!boton || !nav) return;
    boton.addEventListener("click", function () {
      var abierto = boton.getAttribute("aria-expanded") === "true";
      boton.setAttribute("aria-expanded", String(!abierto));
      nav.classList.toggle("abierta", !abierto);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
        boton.setAttribute("aria-expanded", "false");
        nav.classList.remove("abierta");
        boton.focus();
      }
    });
  });
})();
