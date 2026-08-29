(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  if (!toggle || !nav) return;

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
      toggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 900) {
      closeNav();
    }
  });
})();

(function () {
  var mapContent = document.getElementById("map-content");
  var mapSlot = document.querySelector(".map-slot");

  if (!mapContent || !mapSlot) return;

  var desktopHome = mapContent.parentElement;
  var mq = window.matchMedia("(max-width: 899px)");

  function applyLayout(event) {
    if (event.matches) {
      mapSlot.appendChild(mapContent);
    } else {
      desktopHome.appendChild(mapContent);
    }
  }

  mq.addEventListener("change", applyLayout);
  applyLayout(mq);
})();
