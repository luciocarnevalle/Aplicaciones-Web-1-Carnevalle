import { navbar } from "./navbar.js";

document.getElementById("btnCerrar").addEventListener("click", function (e) {
  e.preventDefault(); // evito que recargue o siga un link

  //Muestro el cartel de confirmación
  const estaSeguro = window.confirm("¿Estás seguro que quieres cerrar sesión?");

  //Si el usuario hizo clic en "Aceptar" (estaSeguro es true)
  if (estaSeguro) {
    localStorage.removeItem("rememberedEmail"); //borro los datos de sesion
    window.location.href = "./pages/login.html"; //lo mando a login
  }
  // Si hace clic en "Cancelar", no se hace nada.
});