

document.getElementById("loginForm").addEventListener("submit", function (e) {
e.preventDefault(); 

// Obtengo los valores del formulario
const email = document.getElementById("txtEmail").value.trim();
const remember = document.getElementById("rememberCheck").checked; 

if (remember) { //si el checkbox está seleccionado
    localStorage.setItem("rememberedEmail", email);
  } 
  else {
    localStorage.removeItem("rememberedEmail");
  }

  //Guardo el email del usuario 
  localStorage.setItem("currentUserEmail", email);
  //Creo la "bandera" para el mensaje de bienvenida
  localStorage.setItem("justLoggedIn", "true");

window.location.href = "/index.html"; //redirecciono a la página principal


//falta cartelito de "inicio de sesión exitoso" o bienvenido + nombre de usuario
});
