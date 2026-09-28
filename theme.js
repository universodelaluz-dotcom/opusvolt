/* Tema claro/oscuro. Se carga en <head> para aplicar el tema antes de pintar
   (sin parpadeo). Claro por defecto; la elección se guarda en el navegador. */
(function () {
  var KEY = "opusvolt_theme";
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0b1628" : "#ffffff");
  }

  apply(saved());

  document.addEventListener("DOMContentLoaded", function () {
    apply(saved());
    var nav = document.querySelector(".nav-links");
    var host = nav || document.querySelector("[data-theme-host]");
    if (!host) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.setAttribute("aria-label", "Cambiar entre tema claro y oscuro");
    btn.title = "Tema claro / oscuro";
    btn.innerHTML =
      '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
    if (nav) nav.insertBefore(btn, nav.firstChild);
    else host.appendChild(btn);
  });
})();
