import { botonVolver } from '../btn-volver.js';




function crearProductoCard(producto, index) {
  // El 'index' va a ser 0, 1, 2...
  // Lo uso para generar dinámicamente las clases "card1", "card2", "card3"
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
  // Busco el contenedor por su clase (ej: ".cardsAsics")
  const contenedor = document.querySelector(selectorContenedor);
  if (!contenedor) {
    console.error("No se encontró el contenedor:", selectorContenedor);
    return;
  }

  let html = "";
  // Uso forEach para poder pasar el 'index' (0, 1, 2) a la función
  productos.forEach((producto, index) => {
    html += crearProductoCard(producto, index);
  });
  
  contenedor.innerHTML = html;
}

let todosLosProductos = [];

//Espero a que la página cargue completamente
document.addEventListener("DOMContentLoaded", () => {

  botonVolver();
  
  fetch('/data/productos.json')
      .then(response => response.json()) 
      .then(productos => { 

          todosLosProductos = productos;
          
          const todasLasZapatillas = productos.filter(p => p.categoria === 'zapatillas');

          const zapatillasAsics = todasLasZapatillas.filter(p => p.marca === 'asics');
          const zapatillasNike = todasLasZapatillas.filter(p => p.marca === 'nike');
          const zapatillasAdidas = todasLasZapatillas.filter(p => p.marca === 'adidas');

          renderizarProductos(zapatillasAsics, ".cardsAsics");
          renderizarProductos(zapatillasNike, ".cardsNike");
          renderizarProductos(zapatillasAdidas, ".cardsAdidas");
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

     
      const card = botonCarrito.closest('div[class^="card"]'); 
      const inputCantidad = card.querySelector('.cantidad-selector__numero');
      
      const idProducto = botonCarrito.dataset.idProducto;
      const cantidad = parseInt(inputCantidad.value);
      
     
      const productoParaAgregar = todosLosProductos.find(p => p.id === idProducto);

      if (!productoParaAgregar) {
        console.error("No se encontró el producto");
        return;
      }

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

     
      const productoEnCarrito = carrito.find(p => p.id === idProducto);

      if (productoEnCarrito) {
        
        productoEnCarrito.cantidad += cantidad;
      } else {
       
        const productoConCantidad = {
          ...productoParaAgregar, 
          cantidad: cantidad
        };
        carrito.push(productoConCantidad);
      }
      localStorage.setItem('carrito', JSON.stringify(carrito));

      alert(`Agregaste ${cantidad} "${productoParaAgregar.titulo}" al carrito.`);
      
      inputCantidad.value = 1;
      }
  });
});