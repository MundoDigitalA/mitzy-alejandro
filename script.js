/* ==========================================================================
   Maddie & Noah — interactions
   Vanilla JS, no dependencies. Works from file:// or any static server.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ----------------------------- Reveal on scroll ----------------------------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* -------------------------------- Canción al pulsar play ------------------------------- */
  var playButton = document.querySelector(".play-button");
  if (!playButton) return;

  var song = new Audio("assets/media/song.mp3");
  song.loop = true;

  playButton.addEventListener("click", function () {
    if (song.paused) {
      song.play().catch(function () {
        /* El navegador puede bloquear autoplay hasta que el usuario interactúe */
      });
    } else {
      song.pause();
    }
  });

  /* ---------------------------- Secuencia escalonada ---------------------------- */
  document.querySelectorAll(".section").forEach(function (section) {
    var reveals = Array.prototype.slice.call(section.querySelectorAll(".reveal"));
    reveals.forEach(function (el, index) {
      el.style.transitionDelay = index * 120 + "ms";
    });
  });

    /* ----------------------------- Cuenta regresiva ----------------------------- */
    (function () {
      var targetDate = new Date("January 30, 2027 14:00:00").getTime();

      function updateCountdown() {
        var now = new Date().getTime();
        var distance = targetDate - now;

        if (distance < 0) {
          document.getElementById("countdown-days").textContent = "00";
          document.getElementById("countdown-hours").textContent = "00";
          document.getElementById("countdown-minutes").textContent = "00";
          document.getElementById("countdown-seconds").textContent = "00";
          return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("countdown-days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("countdown-hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("countdown-minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    })();
  })();
