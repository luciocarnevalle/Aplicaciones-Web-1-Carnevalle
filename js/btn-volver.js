export function botonVolver() {
  const backButton = document.querySelector('.btn-volver');

  if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = './pages/productos.html';
    });
  }
}
