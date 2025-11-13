import { navbar } from "./navbar.js";


//Necesito esto para renderizar los productos destacados
function crearProductoCard(producto, index) {
  const cardClass = `card${index + 1}`; 

  return `
    <div class="${cardClass}">
        <h3>${producto.titulo}</h3>
        <img src="${producto.img}" alt="${producto.titulo}">
        <p>${producto.descripcion}</p>
        <div class="card-footer">
            <p class="precio">$${producto.precio}</p> 
            <a href="#" class="boton-card" data-id-producto="${producto.id}">Ver más</a>
        </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const justLoggedIn = localStorage.getItem("justLoggedIn");
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const seccionProductos = document.getElementById("productos-destacados");
  const contenedorProductos = document.getElementById("productos-destacados-container");

  //Muestro el mensaje si acaba de iniciar sesión
  if (justLoggedIn === "true") {
    if (currentUserEmail) {
      alert(`¡Bienvenido, ${currentUserEmail}!`);
    }
    localStorage.removeItem("justLoggedIn");
  }

  
  // Si el usuario está logueado...
  if (currentUserEmail && seccionProductos && contenedorProductos) {
    
    //Muestro sección de productos
    seccionProductos.style.display = 'block';

    //Traigo los productos destacados
    fetch('/data/productos.json')
      .then(res => res.json())
      .then(productos => {
        
        //uno por categoria
        const raquetas = productos.filter(p => p.categoria === 'raquetas').slice(0, 1);
        const zapatillas = productos.filter(p => p.categoria === 'zapatillas').slice(0, 1);
        const cuerdas = productos.filter(p => p.categoria === 'cuerdas').slice(0, 1);
        
        //Los junto en un solo array
        const productosDestacados = [...raquetas, ...zapatillas, ...cuerdas];

        //muestro los productos destacados
        let html = "";
        productosDestacados.forEach((producto, index) => {
          html += crearProductoCard(producto, index);
        });
        contenedorProductos.innerHTML = html;
      })
      .catch(error => console.error("Error al cargar productos destacados:", error));
  }

  // Lógica para el botón de cerrar sesión
  const btnCerrar = document.getElementById("btnCerrar");
  if(btnCerrar){
    btnCerrar.addEventListener("click", function (e) {
      e.preventDefault(); 
      
      const estaSeguro = window.confirm("¿Estás seguro que quieres cerrar sesión?");
      
      if (estaSeguro) {
        localStorage.removeItem("currentUserEmail"); 
        localStorage.removeItem("justLoggedIn"); 
        window.location.href = "/pages/login.html"; 
      }
    });
  }
});


