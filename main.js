// Typewriter Effect
const words = ["Web Developer", "Frontend Developer", "MERN Developer", "Full Stack Developer"];
let i = 0, j = 0, isDeleting = false;

function typeEffect() {
  const current = words[i];
  const typed = document.getElementById("typed");

  if (!isDeleting) {
    typed.textContent = current.slice(0, j++);
    if (j > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 800);
      return;
    }
  } else {
    typed.textContent = current.slice(0, j--);
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 120);
}

typeEffect();



// Smooth scroll + close offcanvas
document.querySelectorAll('.offcanvas-nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // only for internal links
    if (href.startsWith('#')) {
      e.preventDefault();

      // close offcanvas
      const offcanvasEl = document.getElementById('offcanvasMenu');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      offcanvas.hide();

      // smooth scroll
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});



// Offcanvas link click -> close + smooth scroll
document.querySelectorAll(".offcanvas-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = this.getAttribute("href");
    const el = document.querySelector(target);

    // smooth scroll
    el.scrollIntoView({ behavior: "smooth" });

    // close offcanvas
    const offcanvasEl = document.getElementById("offcanvasMenu");
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);

    // if not initialized, create instance
    if (!offcanvas) {
      new bootstrap.Offcanvas(offcanvasEl).hide();
    } else {
      offcanvas.hide();
    }
  });
});

