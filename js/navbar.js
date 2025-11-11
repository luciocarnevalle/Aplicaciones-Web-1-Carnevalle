export const paginas = [
  { titulo: "Inicio", url: "/index.html" },
  { titulo: "Login", url: "../pages/login.html" },
  { titulo: "Registro", url: "../pages/registro.html" },
  { titulo: "Quiénes Somos", url: "../pages/quienesSomos.html" },
  { titulo: "Productos", url: "../pages/productos.html" },
  { titulo: "Contacto", url: "../pages/contacto.html" },
];

export const linksHTML = paginas
  .map(p => `<li><a href="${p.url}">${p.titulo}</a></li>`)
  .join("");

export const navbar = `
  <nav class="navbar-index">
    <div class="logo">
      <a href="/index.html">
        <img src="../images/Logo Smash Tenis.png" alt="Logo Smash Tenis">
      </a>
    </div>

    <ul class="nav-links">
      ${linksHTML}
    </ul>
  </nav>
`;

window.addEventListener("load", function () {
  const navContainer = document.querySelector("header");
  navContainer.innerHTML = navbar;
});