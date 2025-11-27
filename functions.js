// Toggle Menu para dispositivos móviles
const toggleMenu = document.getElementById("toggleMenu");
const navMenu = document.getElementById("navMenu");

toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  toggleMenu.innerHTML = navMenu.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    toggleMenu.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Carousel Hero
const carouselSlides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
let currentSlide = 0;

function showSlide(n) {
  carouselSlides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  currentSlide = (n + carouselSlides.length) % carouselSlides.length;

  carouselSlides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

// Configurar eventos para los indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
  });
});

// Cambiar slide automáticamente cada 5 segundos
let carouselInterval = setInterval(nextSlide, 5000);

// Pausar carousel al hacer hover
const heroSection = document.querySelector('.hero');
heroSection.addEventListener('mouseenter', () => {
  clearInterval(carouselInterval);
});

heroSection.addEventListener('mouseleave', () => {
  carouselInterval = setInterval(nextSlide, 5000);
});

// Animación de scroll
const fadeElements = document.querySelectorAll(".fade-in");

function checkScroll() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkScroll);
window.addEventListener("load", checkScroll);

// Efecto de cambio de header al hacer scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.padding = "0.5rem 0";
    header.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  } else {
    header.style.padding = "1rem 0";
    header.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  }
});

// Image Stack Carousel Logic - BIBLIOTECAS DIGITALES
document.addEventListener('DOMContentLoaded', function() {
    const stackItems = document.querySelectorAll('.stack-item');
    const stackIndicators = document.querySelectorAll('.stack-indicator');
    const stackPrevBtn = document.querySelector('.stack-prev');
    const stackNextBtn = document.querySelector('.stack-next');
    
    // Verificar que los elementos existen antes de continuar
    if (stackItems.length === 0) {
        console.log('No se encontraron elementos del stack carousel');
        return;
    }

    let currentIndex = 0;
    let autoPlayInterval;

    function updateStack() {
        stackItems.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            const diff = index - currentIndex;
            
            if (diff === 0) {
                item.classList.add('active');
            } else if (diff === -1 || (currentIndex === 0 && index === stackItems.length - 1)) {
                item.classList.add('prev');
            } else if (diff === 1 || (currentIndex === stackItems.length - 1 && index === 0)) {
                item.classList.add('next');
            } else if (diff === -2 || (currentIndex <= 1 && index === stackItems.length - 1)) {
                item.classList.add('far-prev');
            } else if (diff === 2 || (currentIndex >= stackItems.length - 2 && index === 0)) {
                item.classList.add('far-next');
            }
        });

        stackIndicators.forEach((indicator, index) => {
            if (indicator) {
                indicator.classList.toggle('active', index === currentIndex);
            }
        });
    }

    function nextStackSlide() {
        currentIndex = (currentIndex + 1) % stackItems.length;
        updateStack();
    }

    function prevStackSlide() {
        currentIndex = (currentIndex - 1 + stackItems.length) % stackItems.length;
        updateStack();
    }

    function goToStackSlide(index) {
        currentIndex = index;
        updateStack();
    }

    // Event Listeners solo si los elementos existen
    if (stackPrevBtn) {
        stackPrevBtn.addEventListener('click', prevStackSlide);
    }
    
    if (stackNextBtn) {
        stackNextBtn.addEventListener('click', nextStackSlide);
    }

    stackIndicators.forEach(indicator => {
        if (indicator) {
            indicator.addEventListener('click', function() {
                goToStackSlide(parseInt(this.dataset.index));
            });
        }
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextStackSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Pause auto-play on hover
    const stackContainer = document.querySelector('.image-stack-container');
    if (stackContainer) {
        stackContainer.addEventListener('mouseenter', stopAutoPlay);
        stackContainer.addEventListener('mouseleave', startAutoPlay);

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        stackContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        stackContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextStackSlide();
                } else {
                    prevStackSlide();
                }
            }
        }
    }

    // Initialize
    updateStack();
    startAutoPlay();
});