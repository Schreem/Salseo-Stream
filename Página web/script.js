// Cargar salseos dinámicos
fetch("salseos.json")
  .then(res => res.json())
  .then(salseos => {
    const container = document.getElementById("salseos-container");
    salseos.forEach(s => {
      const card = document.createElement("div");
      card.className = "salseo";
      card.innerHTML = `<h3>${s.titulo}</h3><p>${s.descripcion}</p>`;
      container.appendChild(card);
    });
  });

// Carrusel manual con flechas
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let currentSlide = 0;

function updateSlide(position) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * position}px)`;
}

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

document.addEventListener("DOMContentLoaded", () => {
  // Modal imagen ampliada
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll(".carousel-slide img").forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.classList.add("active");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

function scrollToTarget(target, duration = 1200) {
  const start = window.pageYOffset;
  const end = document.querySelector(target).offsetTop;
  const distance = end - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    window.scrollTo(0, start + distance * progress);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTarget(this.getAttribute('href'), 500); 
  });
});
