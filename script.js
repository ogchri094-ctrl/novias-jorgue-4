document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carrusel-container');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const btnNext = document.querySelector('.next');
  const btnPrev = document.querySelector('.prev');
  const dotsWrapper = document.querySelector('.dots');

  if (!container || slides.length === 0) return;

  let index = 0;
  let autoplayTimer = null;
  const autoplayDelay = 4500; // ms (cambiar o poner 0 para desactivar)

  // Crear dots dinámicamente según cantidad de slides
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Ir a la diapositiva ' + (i + 1));
    dot.addEventListener('click', () => showSlide(i));
    dotsWrapper.appendChild(dot);
  });

  const dots = Array.from(dotsWrapper.children);

  function update() {
    // Multiplicamos por 100% porque cada slide tiene min-width:100%
    container.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function showSlide(i) {
    index = (i + slides.length) % slides.length;
    update();
    resetAutoplay();
  }

  btnNext.addEventListener('click', () => showSlide(index + 1));
  btnPrev.addEventListener('click', () => showSlide(index - 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showSlide(index + 1);
    if (e.key === 'ArrowLeft') showSlide(index - 1);
  });

  // Autoplay
  function startAutoplay() {
    if (autoplayDelay > 0) {
      autoplayTimer = setInterval(() => showSlide(index + 1), autoplayDelay);
    }
  }
  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pausar autoplay al pasar el cursor
  const carouselEl = document.querySelector('.carrusel');
  carouselEl.addEventListener('mouseenter', stopAutoplay);
  carouselEl.addEventListener('mouseleave', startAutoplay);

  // Inicializar
  update();
  startAutoplay();

  // Opcional: redimensionar para corregir transform si cambias el tamaño (por seguridad)
  window.addEventListener('resize', update);
});