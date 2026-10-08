/* ======================================================
   PASS STEEL - CUSTOM SCRIPT
   Three small, simple features:
   1. Navbar gets a "scrolled" style once you scroll down.
   2. "Back to top" button appears after scrolling, and
      scrolls smoothly back to the top when clicked.
   3. 3D tilt effect on any element with class "tilt-card"
      (product photos + owner photo) - the card rotates
      slightly to follow the mouse, like it's a real object.
====================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Navbar scroll style ---------- */
  var navbar = document.getElementById("mainNav");
  var backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    var scrolled = window.scrollY > 40;

    // add/remove a class so CSS can shrink the navbar padding
    if (navbar) {
      navbar.classList.toggle("scrolled", scrolled);
    }

    // show the back-to-top button only after scrolling down
    if (backToTop) {
      backToTop.style.display = window.scrollY > 500 ? "flex" : "none";
    }
  });

  /* ---------- 2. Back to top button click ---------- */
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 3. 3D tilt hover effect ---------- */
  // Grab every element that should have the tilt effect
  // (product cards + owner photo currently use class "tilt-card")
  var canTilt = window.matchMedia("(hover: hover)").matches &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tiltCards = canTilt ? document.querySelectorAll(".tilt-card") : [];

  tiltCards.forEach(function (card) {
    // how strong the tilt is - bigger number = stronger tilt
    var maxTilt = 8; // degrees

    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();

      // mouse position inside the card, from 0 to 1
      var x = (e.clientX - rect.left) / rect.width;
      var y = (e.clientY - rect.top) / rect.height;

      // convert to a tilt angle: center of card = no tilt,
      // edges of card = maximum tilt
      var rotateY = (x - 0.5) * (maxTilt * 2); // left/right tilt
      var rotateX = (0.5 - y) * (maxTilt * 2); // up/down tilt

      card.style.transform =
        "perspective(800px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-6px)";
    });

    // reset back to flat when the mouse leaves the card
    card.addEventListener("mouseleave", function () {
      card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });

  /* ---------- Smooth scroll for in-page nav links ---------- */
  // Makes clicking "Products", "About" etc. in the navbar
  // scroll smoothly instead of jumping instantly.
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });

        // close the mobile menu after clicking a link, if open
        var menu = document.getElementById("navMenu");
        if (menu && menu.classList.contains("show")) {
          var bsCollapse = bootstrap.Collapse.getInstance(menu);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  /* ---------- Contact form: open Gmail compose on "Send Message" ---------- */
  // EDIT: apna Gmail address yahan likhein
  var OWNER_EMAIL = "YOUR_EMAIL@gmail.com";

  var form = document.getElementById("contactForm");
  var statusEl = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"].value;
      var email = form.elements["email"].value;
      var subject = form.elements["subject"].value || "Website Message";
      var message = form.elements["message"].value;

      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
      var url = "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(OWNER_EMAIL) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.open(url, "_blank");
      if (statusEl) statusEl.textContent = "Gmail khul gaya hai - wahan Send dabayein.";
    });
  }

  /* ---------- Highlight the menu link of the section being viewed ---------- */
  var navLinks = document.querySelectorAll("#navMenu .nav-link[href^='#']");
  var sections = Array.prototype.map.call(navLinks, function (l) {
    return document.querySelector(l.getAttribute("href"));
  });
  function markActive() {
    var y = window.scrollY + 120;
    navLinks.forEach(function (l, i) {
      var sec = sections[i];
      var on = sec && sec.offsetTop <= y && sec.offsetTop + sec.offsetHeight > y;
      l.classList.toggle("active", !!on);
    });
  }
  window.addEventListener("scroll", markActive);
  markActive();

  /* ---------- Scroll reveal animation ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el, i) {
      // small delay between neighbouring cards so they appear one by one
      el.style.transitionDelay = ((i % 4) * 90) + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

});
