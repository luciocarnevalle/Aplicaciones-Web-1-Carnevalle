import { botonVolver } from '../btn-volver.js';

const cuerdasKirschbaum = [
  {
    id: "kirs-01",
    titulo: "Kirschbaum Pro Line II",
    img: "../images/KirschbaumProLineII.jpg",
    descripcion: "Una cuerda fabricada de  copoliéster que ofrece control, efecto y una sensación cómoda. Perfecta para quienes buscan potencia equilibrada y durabilidad.",
    precio: "80.000"
  },
  {
    id: "kirs-02",
    titulo: "Kirschbaum Max Power",
    img: "../images/KirschbaumMaxPower.jpg",
    descripcion: "Una cuerda de poliéster diseñada para ofrecer control y durabilidad, ideal para jugadores agresivos y potentes que buscan precisión en sus golpes.",
    precio: "90.000"
  },
  {
    id: "kirs-03",
    titulo: "Kirschbaum Soft Ace",
    img: "../images/KirschbaumEvolution.jpg",
    descripcion: "Una cuerda híbrida que combina la suavidad de un multifilamento con la durabilidad de un poliéster, ofreciendo un excelente confort y rendimiento.",
    precio: "75.000"
  }
];

const cuerdasLuxilon = [
  {
    id: "lux-01",
    titulo: "Luxilon ALU Power",
    img: "../images/LuxilonAluPower.webp",
    descripcion: "Esta cuerda ofrece una potencia y control increible, utilizada y recomendada por muchos jugadores profesionales en todo el mundo.",
    precio: "120.000"
  },
  {
    id: "lux-02",
    titulo: "Luxilon Big Banger Original",
    img: "../images/LuxilonBigBangerOriginal.jpg",
    descripcion: "Una cuerda que proporciona un excelente control, durabilidad y mucha sensibilidad, ideal para jugadores que buscan precisión en sus golpes.",
    precio: "110.000"
  },
  {
    id: "lux-03",
    titulo: "Luxilon 4G",
    img: "../images/Luxilon4G.webp",
    descripcion: "Esta cuerda garantiza una sensación más suave y mayor potencia, ideal para jugadores que buscan un equilibrio entre confort y rendimiento.",
    precio: "115.000"
  }
];

const cuerdasTecnifibre = [
  {
    id: "tec-01",
    titulo: "Tecnifibre X-One Biphase",
    img: "../images/TecnifibreXOneBiphase.jpg",
    descripcion: "Una cuerda multifilamento que ofrece una excelente combinación de potencia y confort, ideal para jugadores que buscan un rendimiento equilibrado.",
    precio: "85.000"
  },
  {
    id: "tec-02",
    titulo: "Tecnifibre Black Code",
    img: "../images/TecnifibreBlackCode.jpg",
    descripcion: "Una cuerda de poliéster diseñada exclusivamente para ofrecer control y durabilidad, ideal para jugadores agresivos que buscan precisión en sus golpes.",
    precio: "95.000"
  },
  {
    id: "tec-03",
    titulo: "Tecnifibre NRG2",
    img: "../images/TecnifibreNRG2.jpg",
    descripcion: "Una cuerda híbrida que combina la suavidad de un multifilamento con la durabilidad de un poliéster, ofreciendo un excelente confort y rendimiento.",
    precio: "80.000"
  }
];

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

document.addEventListener("DOMContentLoaded", () => {

  botonVolver();
  
  renderizarProductos(cuerdasKirschbaum, ".cardsKirschbaum");
  renderizarProductos(cuerdasLuxilon, ".cardsLuxilon");
  renderizarProductos(cuerdasTecnifibre, ".cardsTecnifibre");

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
  });
});