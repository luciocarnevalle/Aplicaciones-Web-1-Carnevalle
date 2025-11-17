// Espero a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Selección de elementos del DOM
    const contenedor = document.getElementById('carrito-productos-container');
    const Vacio = document.getElementById('carrito-vacio');
    const footerCarrito = document.getElementById('carrito-footer');
    const totalMonto = document.getElementById('carrito-total-monto');
    const btnVaciar = document.getElementById('btn-vaciar-carrito');

    //Cargo el carrito desde localStorage ---
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    //Función para renderizar el carrito ---
    function renderizarCarrito() {
        
        //Limpio el contenedor 
        contenedor.innerHTML = '';

        if (carrito.length === 0) {
            // Si el carrito está vacío, muestro el mensaje y no muestro lo otro
            Vacio.style.display = 'block';
            footerCarrito.style.display = 'none';
            contenedor.style.display = 'none';
        } else {
            // Si hay productos, muestro el contenido
            Vacio.style.display = 'none';
            footerCarrito.style.display = 'block';
            contenedor.style.display = 'block';

            let totalAcumulado = 0;

            // Recorro cada producto del carrito
            carrito.forEach(producto => {
                // Saco el punto para calcular el subtotal
                const precioNumerico = parseFloat(producto.precio.replace('.', ''));
                const subtotal = precioNumerico * producto.cantidad;
                
                // Sumo al total
                totalAcumulado += subtotal;

                // Creo el HTML para el producto
                const divProducto = document.createElement('div');
                divProducto.classList.add('carrito-producto-item'); //Clase para CSS
                divProducto.innerHTML = `
                    <img src="${producto.img}" alt="${producto.titulo}">
                    <div class="producto-info">
                        <h4>${producto.titulo}</h4>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Precio unitario: $${producto.precio}</p>
                    </div>
                    <div class="producto-subtotal">
                        <p>Subtotal: $${subtotal.toLocaleString('es-ES')}</p>
                        <button class="btn-eliminar-item" data-id="${producto.id}">
                            Eliminar
                        </button>
                    </div>
                `;
                contenedor.appendChild(divProducto);
            });

            // Actualizo el monto total
            totalMonto.textContent = `$${totalAcumulado.toLocaleString('es-ES')}`;  // .toLocaleString('es-ES') formatea el número (ej: 300000 -> 300.000)
        }
    }

    //Botones 

    // Botón Vaciar Carrito
    btnVaciar.addEventListener('click', () => {
        if (confirm('¿Estás seguro que quieres vaciar el carrito?')) {
            // Borro todo el carrito
            carrito = [];
            localStorage.removeItem('carrito');
            
            // Vuelvo a renderizar ( muestr ael carrito vacio)
            renderizarCarrito();
        }
    });

    // Boton Eliminar de cada producto
    contenedor.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar-item')) {
            const idProducto = e.target.dataset.id;
            
            // Saco el producto con ese ID
            carrito = carrito.filter(producto => producto.id !== idProducto);

            // Guardo el nuevo carrito (sin el producto) en localStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Vuelvo a renderizar el carrito
            renderizarCarrito();
        }
    });

    // Llamo a la función por primera vez pa que haga el carrito
    renderizarCarrito();
});