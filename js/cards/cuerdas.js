import { botonVolver } from '../btn-volver.js';


function crearProductoCard(producto, index) {
  const cardClass = `card${index + 1}`; 

  return `
    <div class="${cardClass}">
        <h3>${producto.titulo}</h3>
        <img src="${producto.img}" alt="${producto.titulo}">
        <p>${producto.descripcion}</p>

        <div class="card-footer">
            <p class="precio">$${producto.precio}</p> 

            <div class="cantidad-selector" style="display: flex; align-items: center; margin-right: 5px;">
                <button class="cantidad-selector__btn" data-accion="restar" aria-label="Restar uno" style="padding: 5px 10px;">-</button>
                <input type="number" class="cantidad-selector__numero" value="1" min="1" aria-label="Cantidad" style="width: 30px; text-align: center;">
                <button class="cantidad-selector__btn" data-accion="sumar" aria-label="Sumar uno" style="padding: 5px 10px;">+</button>
            </div>
        </div>
        <a href="#" class="boton-card" data-id-producto="${producto.id}">Añadir al carrito</a>
    </div>
  `;
}

function renderizarProductos(productos, selectorContenedor) {
  const contenedor = document.querySelector(selectorContenedor);
  if (!contenedor) {
    console.error("No se encontró el contenedor:", selectorContenedor);
    return;
  }

  let html = "";
  productos.forEach((producto, index) => {
    html += crearProductoCard(producto, index);
  });
  
  contenedor.innerHTML = html;
}

let todosLosProductos = [];

document.addEventListener("DOMContentLoaded", () => {

  botonVolver();
  
   fetch('/data/productos.json')
      .then(response => response.json()) 
      .then(productos => { 

        todosLosProductos = productos;
         
          const todasLasZapatillas = productos.filter(p => p.categoria === 'cuerdas');

          const cuerdasKirschbaum = todasLasZapatillas.filter(p => p.marca === 'kirschbaum');
          const cuerdasLuxilon = todasLasZapatillas.filter(p => p.marca === 'luxilon');
          const cuerdasTecnifibre = todasLasZapatillas.filter(p => p.marca === 'tecnifibre');

          renderizarProductos(cuerdasKirschbaum, ".cardsKirschbaum");
          renderizarProductos(cuerdasLuxilon, ".cardsLuxilon");
          renderizarProductos(cuerdasTecnifibre, ".cardsTecnifibre");
      })
      .catch(error => console.error("Error al cargar los productos:", error));

  document.body.addEventListener("click", (e) => {
    
    const botonCantidad = e.target.closest(".cantidad-selector__btn");
    
    if (botonCantidad) {
      e.preventDefault(); 
      const accion = botonCantidad.dataset.accion;
      const input = botonCantidad.parentElement.querySelector(".cantidad-selector__numero");
      
      let valor = parseInt(input.value);

      if (accion === "sumar") {
        valor++;
      } else if (accion === "restar" && valor > 1) {
        valor--;
      }
      
      input.value = valor;
    }







    //LOGICA PARA AGREGAR AL CARRITO
    const botonCarrito = e.target.closest(".boton-card");
    if (botonCarrito) {
      e.preventDefault(); 

      //consigo datos del producto
      const card = botonCarrito.closest('div[class^="card"]'); //Sube al div padre (card1, card2, etc)
      const inputCantidad = card.querySelector('.cantidad-selector__numero');
      
      const idProducto = botonCarrito.dataset.idProducto;
      const cantidad = parseInt(inputCantidad.value);
      
      //Busco el objeto completo del producto en el array de todos los productos
      const productoParaAgregar = todosLosProductos.find(p => p.id === idProducto);

      if (!productoParaAgregar) {
        console.error("No se encontró el producto");
        return;
      }

      //Traigo el carrito de localStorage
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      // Pregunto si el producto ya está en el carrito
      const productoEnCarrito = carrito.find(p => p.id === idProducto);

      if (productoEnCarrito) {
        // Si ya está, solo sumo la cantidad
        productoEnCarrito.cantidad += cantidad;
      } else {
        // Si es nuevo, lo agrego al array con la propiedad 'cantidad'
        const productoConCantidad = {
          ...productoParaAgregar, //Copia todas las propiedades (id, titulo, precio...)
          cantidad: cantidad
        };
        carrito.push(productoConCantidad);
      }

      //Guardo cambios en localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));

      alert(`Agregaste ${cantidad} "${productoParaAgregar.titulo}" al carrito.`);
      
      //Reseteo cantidad a 1
      inputCantidad.value = 1;
      }
  });
});