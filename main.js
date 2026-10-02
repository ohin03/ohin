// main.js

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     TYPEWRITER
  ========================================= */

  const words = [
    "Web Developer",
    "Frontend Developer",
    "MERN Developer",
    "Full-Stack Developer",
    "React & Next.js Developer",
    "Business Web App Developer"
  ];

  const typed1 = document.getElementById("typed1");

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect() {

    if (!typed1) return;

    const currentWord = words[wordIndex];

    if (!deleting) {

      typed1.textContent =
        currentWord.slice(0, charIndex);

      charIndex++;

      if (charIndex > currentWord.length) {

        deleting = true;

        setTimeout(typeEffect, 1300);

        return;
      }

    } else {

      typed1.textContent =
        currentWord.slice(0, charIndex);

      charIndex--;

      if (charIndex < 0) {

        charIndex = 0;
        deleting = false;

        wordIndex =
          (wordIndex + 1) % words.length;
      }
    }

    setTimeout(
      typeEffect,
      deleting ? 45 : 80
    );
  }

  typeEffect();


  /* =========================================
     NAVBAR SCROLL
  ========================================= */

  const navbar =
    document.querySelector(".navbar");

  function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 40) {

      navbar.style.background =
        "rgba(3,5,7,.92)";

      navbar.style.boxShadow =
        "0 10px 40px rgba(0,0,0,.25)";

    } else {

      navbar.style.background =
        "rgba(3,5,7,.72)";

      navbar.style.boxShadow = "none";
    }
  }

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );

  updateNavbar();


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) return;

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =========================================
     MOBILE OFFCANVAS
  ========================================= */

  const mobileLinks =
    document.querySelectorAll(
      ".offcanvas-link"
    );

  mobileLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        const offcanvasElement =
          document.getElementById(
            "offcanvasMenu"
          );

        if (
          typeof bootstrap === "undefined" ||
          !offcanvasElement
        ) return;

        const instance =
          bootstrap.Offcanvas.getInstance(
            offcanvasElement
          );

        if (instance) {
          instance.hide();
        }

      }
    );

  });


  /* =========================================
     ACTIVE NAV LINK
  ========================================= */

  const sections =
    document.querySelectorAll(
      "header[id], section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".nav-link"
    );

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          const id =
            entry.target.id;

          navLinks.forEach(link => {

            link.classList.remove(
              "active"
            );

            if (
              link.getAttribute("href") ===
              `#${id}`
            ) {

              link.classList.add(
                "active"
              );
            }

          });

        });

      },
      {
        rootMargin:
          "-30% 0px -60% 0px"
      }
    );

  sections.forEach(section => {
    observer.observe(section);
  });


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(
      ".iconic-card, .pro-card, .skill-card, .what-card, .hire-card, .contact-card"
    );

  const revealObserver =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            !entry.isIntersecting
          ) return;

          entry.target.classList.add(
            "reveal-visible"
          );

          revealObserver.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach(
    (element, index) => {

      element.classList.add(
        "reveal-item"
      );

      element.style.transitionDelay =
        `${Math.min(index * 40, 250)}ms`;

      revealObserver.observe(element);
    }
  );


  /* =========================================
     PROJECT CARD TILT
  ========================================= */

  const projectCards =
    document.querySelectorAll(
      ".iconic-card, .pro-card"
    );

  projectCards.forEach(card => {

    card.addEventListener(
      "mousemove",
      event => {

        if (
          window.innerWidth < 992
        ) return;

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        const rotateX =
          ((y / rect.height) - .5) * -2;

        const rotateY =
          ((x / rect.width) - .5) * 2;

        card.style.transform =
          `
          translateY(-8px)
          perspective(900px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          `;

      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* =========================================
     IMAGE FALLBACK
  ========================================= */

  const profileImages =
    document.querySelectorAll(
      'img[src="OHINFV.jpg"]'
    );

  profileImages.forEach(image => {

    image.addEventListener(
      "error",
      () => {

        image.style.display = "none";

      }
    );

  });


  /* =========================================
     ESC KEY — CLOSE MOBILE MENU
  ========================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") return;

      const offcanvasElement =
        document.getElementById(
          "offcanvasMenu"
        );

      if (
        typeof bootstrap === "undefined" ||
        !offcanvasElement
      ) return;

      const instance =
        bootstrap.Offcanvas.getInstance(
          offcanvasElement
        );

      if (instance) {
        instance.hide();
      }

    }
  );

});