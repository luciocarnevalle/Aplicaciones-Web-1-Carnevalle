

document.getElementById("loginForm").addEventListener("submit", function (e) {
e.preventDefault(); // evito que el form se envíe

const email = document.getElementById("txtEmail").value.trim();
const remember = document.getElementById("rememberCheck").checked; //declaro constantes

if (remember) { //si el checkbox está seleccionado
    localStorage.setItem("rememberedEmail", email);
  } 
  else {
    localStorage.removeItem("rememberedEmail");
  }

window.location.href = "/index.html"; //redirecciono a la página principal
});
