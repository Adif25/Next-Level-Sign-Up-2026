/* NEXT LEVEL — shared interactions */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
      });
    });
  }

  /* ---- Sticky nav shadow ---- */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Animate hero XP bars when visible ---- */
  const bars = document.querySelectorAll(".xp-bar i");
  if (bars.length) {
    setTimeout(function () {
      bars.forEach(function (b) {
        b.style.width = (b.dataset.fill || "70") + "%";
      });
    }, 350);
  }

  /* ---- Countdown to conference ---- */
  const cd = document.getElementById("countdown");
  if (cd) {
    const target = new Date(cd.dataset.date).getTime();
    const tick = function () {
      const now = Date.now();
      let diff = Math.max(0, target - now);
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      const set = function (id, v) {
        const el = document.getElementById(id);
        if (el) el.textContent = String(v).padStart(2, "0");
      };
      set("cd-days", d); set("cd-hrs", h); set("cd-min", m); set("cd-sec", s);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---- Footer year ---- */
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
