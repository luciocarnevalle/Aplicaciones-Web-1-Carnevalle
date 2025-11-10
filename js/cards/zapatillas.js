import { botonVolver } from '../btn-volver.js';


const zapatillasAsics = [
  {
    id: "asics-01",
    titulo: "Asics Gel Resolution 8",
    img: "./images/AsicsGelResolution9.jpg",
    descripcion: "La Asics Gel Resolution 8 ofrece una combinación excepcional de estabilidad y durabilidad, ideal para un rendimiento óptimo en la cancha.",
    precio: "150.000"
  },
  {
    id: "asics-02",
    titulo: "Asics Court FF 2",
    img: "./images/AsicsCourtFF2.webp",
    descripcion: "La Asics Court FF 2 es una zapatilla ligera y cómoda, diseñada para ofrecer un excelente soporte lateral y una respuesta rápida en la cancha.",
    precio: "130.000"
  },
  {
    id: "asics-03",
    titulo: "Asics Gel Dedicate 7",
    img: "./images/AsicsGelDedicate7.webp",
    descripcion: "La Asics Gel Dedicate 7 es una zapatilla confiable, perfecta para jugadores recreativos que buscan comodidad y buen rendimiento en la cancha.",
    precio: "110.000"
  }
];

const zapatillasNike = [
  {
    id: "nike-01",
    titulo: "Nike Air Zoom Vapor X",
    img: "./images/NikeAirZoomVaporX.webp",
    descripcion: "La Nike Air Zoom Vapor X es una zapatilla ligera y rápida, ofrece una excelente tracción y soporte durante movimientos rápidos en la cancha.",
    precio: "160.000"
  },
  {
    id: "nike-02",
    titulo: "Nike Air Zoom Cage 4",
    img: "./images/NikeAirZoomCage4.webp",
    descripcion: "La Nike Air Zoom Cage 4 es una zapatilla duradera y estable, ideal para jugadores que buscan soporte adicional y resistencia en la cancha.",
    precio: "170.000"
  },
  {
    id: "nike-03",
    titulo: "Nike Court Lite 2",
    img: "./images/NikeCourtLite2.jpg",
    descripcion: "La Nike Court Lite 2 es una zapatilla asequible, perfecta para jugadores principiantes que buscan buen rendimiento y estilo en la cancha.",
    precio: "140.000"
  }
];

const zapatillasAdidas = [
  {
    id: "adidas-01",
    titulo: "Adidas Adizero Ubersonic 4",
    img: "./images/AdidasAdizeroUbersonic4.jpg",
    descripcion: "La Adidas Adizero Ubersonic 4 es una zapatilla ultraligera que ofrece una gran velocidad y agilidad en la cancha...",
    precio: "155.000"
  },
  {
    id: "adidas-02",
    titulo: "Adidas Barricade Boost",
    img: "./images/AdidasBarricadeBoost.jpg",
    descripcion: "La Adidas Barricade Boost es una zapatilla robusta y estable, diseñada para ofrecer un excelente soporte, amortiguacion y durabilidad...",
    precio: "165.000"
  },
  {
    id: "adidas-03",
    titulo: "Adidas GameCourt",
    img: "./images/AdidasGameCourt.webp",
    descripcion: "La Adidas GameCourt es una zapatilla versátil y cómoda, perfecta para jugadores recreativos que buscan buen rendimiento y estilo...",
    precio: "125.000"
  }
];


function crearProductoCard(producto, index) {
  // El 'index' será 0, 1, 2...
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
  // Buscamos el contenedor por su clase (ej: ".cardsAsics")
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



//Espero a que la página cargue completamente
document.addEventListener("DOMContentLoaded", () => {

  botonVolver();
  
  // Pinto las tres secciones de productos
  renderizarProductos(zapatillasAsics, ".cardsAsics");
  renderizarProductos(zapatillasNike, ".cardsNike");
  renderizarProductos(zapatillasAdidas, ".cardsAdidas");

  //Añado la lógica para los botones de cantidad (+ / -)
  document.body.addEventListener("click", (e) => {
    
    // Verificamos si el clic fue en un botón de cantidad
    const botonCantidad = e.target.closest(".cantidad-selector__btn");
    
    if (botonCantidad) {
      e.preventDefault(); // Previene cualquier acción por defecto
      const accion = botonCantidad.dataset.accion; // "sumar" o "restar"
      const input = botonCantidad.parentElement.querySelector(".cantidad-selector__numero");
      
      let valor = parseInt(input.value);

      if (accion === "sumar") {
        valor++;
      } else if (accion === "restar" && valor > 1) { // No permite bajar de 1
        valor--;
      }
      
      input.value = valor;
    }
    

    //Logica para añadir al carrito
    // const botonCarrito = e.target.closest(".boton-card");
    // if (botonCarrito) { ... }
  });
});