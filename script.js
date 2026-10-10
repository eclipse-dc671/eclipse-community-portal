
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Subtle mouse/touch-friendly card glow
  document.querySelectorAll(".glass-card, .game-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      card.style.background =
        `radial-gradient(circle at ${x}px ${y}px, ` +
        `rgba(168, 85, 247, 0.15), rgba(20, 10, 38, 0.92) 75%)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.background = "";
    });
  });

  // Reveal sections as they enter the screen
  const sections = document.querySelectorAll(
    ".section, .join-section"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach((section) => {
      section.classList.add("reveal");
      observer.observe(section);
    });
  }

  // Highlight the navigation link for the current section
  const navLinks = document.querySelectorAll('.navbar nav a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              const active =
                link.getAttribute("href") === `#${entry.target.id}`;

              link.classList.toggle("active", active);
            });
          }
        });
      },
      { rootMargin: "-25% 0px -60% 0px" }
    );

    document.querySelectorAll("main section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // Update the footer year automatically
  const copyright = document.querySelector(".footer small");

  if (copyright) {
    copyright.textContent =
      `© ${new Date().getFullYear()} Eclipse Community. All rights reserved.`;
  }

  console.log("Eclipse Community website initialized.");
});
