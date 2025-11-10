import { botonVolver } from '../btn-volver.js';

const raquetasBabolat = [
  {
    id: "babo-01",
    titulo: "Babolat Pure Aero",
    img: "/images/PureAero.jpg",
    descripcion: "La raqueta preferida por Rafael Nadal, diseñada para maximizar el efecto y la potencia en cada golpe. Jugadores de todo tipo de niveles",
    precio: "220.000"
  },
  {
    id: "babo-02",
    titulo: "Babolat Pure Drive",
    img: "/images/PureDrive.jpg",
    descripcion: "Una raqueta versátil que ofrece un equilibrio perfecto entre mucha potencia y control, ideal para jugadores de todos los niveles.",
    precio: "180.000"
  },
  {
    id: "babo-03",
    titulo: "Babolat Pure Strike",
    img: "/images/PureStrike.webp",
    descripcion: "Diseñada para jugadores agresivos que buscan precisión y control en sus golpes, con una sensación sólida en cada impacto.",
    precio: "200.000"
  }
];

const raquetasWilson = [
  {
    id: "wils-01",
    titulo: "Wilson Pro Staff",
    img: "/images/ProStaff.webp",
    descripcion: "La elección de Roger Federer, esta raqueta ofrece un control excepcional y una sensación clásica para jugadores que valoran la precisión.",
    precio: "250.000"
  },
  {
    id: "wils-02",
    titulo: "Wilson Blade",
    img: "/images/WilsonBlade.jpg",
    descripcion: "Diseñada para jugadores agresivos, la Wilson Blade ofrece un equilibrio perfecto entre potencia y control, ideal para golpes rápidos y precisos.",
    precio: "230.000"
  },
  {
    id: "wils-03",
    titulo: "Wilson Clash",
    img: "/images/WilsonClash.jpg",
    descripcion: "La Wilson Clash proporciona flexibiliad, una sensación cómoda y un gran control, perfecta para jugadores que buscan versatilidad en su juego.",
    precio: "190.000"
  }
];

const raquetasHead = [
  {
    id: "head-01",
    titulo: "Head Radical",
    img: "/images/HeadRadical.webp",
    descripcion: "Esta raqueta combina potencia y estabilidad, ideal para jugadores que buscan un rendimiento equilibrado en la cancha.",
    precio: "210.000"
  },
  {
    id: "head-02",
    titulo: "Head Speed",
    img: "/images/HeadSpeed.webp",
    descripcion: "La raqueta preferida por Novak Djokovic, diseñada para ofrecer velocidad y precisión en cada golpe, perfecta para jugadores agresivos.",
    precio: "240.000"
  },
  {
    id: "head-03",
    titulo: "Head Prestige",
    img: "/images/HeadPrestige.jpg",
    descripcion: "Ofrece un control excepcional y una sensación sólida en el impacto, ideal para jugadores que valoran la precisión y el toque en su juego.",
    precio: "260.000"
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
  
  renderizarProductos(raquetasBabolat, ".cardsBabolat");
  renderizarProductos(raquetasWilson, ".cardsWilson");
  renderizarProductos(raquetasHead, ".cardsHead");

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