// Función interna para aplicar el modo (oscuro o claro)
function aplicarModo(modo) {
    if (modo === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

//Función que importo en navbar.js para inicializar el modo oscuro
export function inicializarModoOscuro() {
    
    const btnModoOscuro = document.getElementById('btn-modo-oscuro');

    // Aplico el modo por defecto, que va a ser claro (light) 
    const porDefecto = localStorage.getItem('modo-visual') || 'light';
    aplicarModo(porDefecto);

    // Si el botón existe en esta página
    if (btnModoOscuro) {
        
        // Actualizo el texto del botón al cargar la página
        btnModoOscuro.textContent = (porDefecto === 'dark') ? 'Modo Claro' : 'Modo Oscuro';

        //Asigno el evento de clic
        btnModoOscuro.addEventListener('click', () => {
            // Revisa si el body YA tiene la clase
            const esModoOscuro = document.body.classList.contains('dark-mode');

            if (esModoOscuro) {
                // Si la tiene, pasa a modo claro
                aplicarModo('light');
                localStorage.setItem('modo-visual', 'light');
                btnModoOscuro.textContent = 'Modo Oscuro';
            } else {
                // Si no la tiene, pasa a modo oscuro
                aplicarModo('dark');
                localStorage.setItem('modo-visual', 'dark');
                btnModoOscuro.textContent = 'Modo Claro';
            }
        });
    }
}