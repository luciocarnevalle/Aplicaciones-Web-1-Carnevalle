import { navbar } from "./navbar.js";

document.getElementById("btnCerrar").addEventListener("click", function (e) {
  e.preventDefault(); // evito que recargue o siga un link

  // 1. Muestra el cartel de confirmación
  const estaSeguro = window.confirm("¿Estás seguro que quieres cerrar sesión?");

  // 2. Si el usuario hizo clic en "Aceptar" (estaSeguro es true)...
  if (estaSeguro) {
    localStorage.removeItem("rememberedEmail"); //borro los datos de sesion
    window.location.href = "/pages/login.html"; //...lo redirigimos
  }
  // Si hace clic en "Cancelar", no se hace nada.
});