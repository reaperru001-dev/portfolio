const loader = document.getElementById("loader");
const navbar = document.getElementById("navbar");
const cursorGlow = document.getElementById("cursorGlow");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

const setTheme = theme => {
  document.documentElement.dataset.theme = theme;
  const nextTheme = theme === "dark" ? "light" : "dark";
  const icon = themeToggle?.querySelector("span");
  if (icon) icon.textContent = nextTheme === "dark" ? "☾" : "☼";
  themeToggle?.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  themeToggle?.setAttribute("title", `Switch to ${nextTheme} mode`);
};

let savedTheme = "light";
try {
  savedTheme = localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
} catch {}
setTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {}
});

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hide"), 650);
});

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

document.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.animate(
    { left: `${e.clientX}px`, top: `${e.clientY}px` },
    { duration: 450, fill: "forwards", easing: "ease-out" }
  );
});

menuToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Subtle magnetic button interaction
document.querySelectorAll(".magnetic").forEach(button => {
  button.addEventListener("mousemove", e => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

// Project media parallax
document.querySelectorAll(".project-media").forEach(media => {
  media.addEventListener("mousemove", e => {
    const rect = media.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;

    media.querySelectorAll(".tube, .creative-ui, .package-stack, .terminal").forEach(el => {
      el.style.transform += ` translate(${x * 8}px, ${y * 8}px)`;
    });
  });
});

// Active navigation based on section
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll("#navLinks a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.style.color = item.getAttribute("href") === `#${entry.target.id}`
          ? "var(--accent)"
          : "";
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(section => sectionObserver.observe(section));
