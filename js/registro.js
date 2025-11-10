document.addEventListener("DOMContentLoaded", () => {

  // Busca el formulario en registro.html
  const registroForm = document.querySelector("form");

  if (registroForm) {
    registroForm.addEventListener("submit", (e) => {
      e.preventDefault(); 

      //  futuro, lógica para guardar al usuario
      // ...

      
      alert("¡Te has registrado con éxito! Ahora, por favor, inicia sesión.");
      window.location.href = "/pages/login.html"; 
    });
  }
});