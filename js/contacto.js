document.addEventListener('DOMContentLoaded', (event) => {
    // Seleccionar el formulario por su ID
    const formulario = document.getElementById('formulario-contacto');

    //si el formulario existe
    if (formulario) {
        // Agregar un "event listener" para escuchar el evento 'submit' (envío)
        formulario.addEventListener('submit', function(event) {
            // Detengo el envío normal del formulario 
            event.preventDefault();

            // Muestro mensaje de confirmación
            alert("Mensaje enviado. Nos contactaremos con usted a la brevedad.");
            
            event.target.reset(); //limipia los campos del formulario
        });
    }
});