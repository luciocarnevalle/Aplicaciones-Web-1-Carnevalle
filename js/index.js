import { navbar } from "./navbar.js";

document.getElementById("btnCerrar").addEventListener("click", function (e) {
e.preventDefault(); // evito que recargue o siga un link

localStorage.removeItem("rememberedEmail"); //borro los datos de sesion

window.location.href = "./pages/login.html";
});