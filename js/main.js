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

(function () {
  var statusEl = document.getElementById("hero-open-status");
  var detailEl = document.getElementById("hero-open-detail");

  if (!statusEl || !detailEl) return;

  // Golden House opening hours, minutes after midnight. 0 = Sunday ... 6 = Saturday.
  var HOURS = {
    0: [13 * 60 + 30, 21 * 60 + 30],
    1: null,
    2: [15 * 60, 22 * 60],
    3: [15 * 60, 22 * 60],
    4: [15 * 60, 22 * 60],
    5: [15 * 60, 22 * 60],
    6: [15 * 60, 22 * 60]
  };

  function formatTime(minutes) {
    var h = Math.floor(minutes / 60);
    var m = minutes % 60;
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  }

  function updateStatus() {
    var now = new Date();
    var today = HOURS[now.getDay()];
    var minutesNow = now.getHours() * 60 + now.getMinutes();

    if (today && minutesNow >= today[0] && minutesNow < today[1]) {
      statusEl.textContent = "Åpent nå";
      detailEl.textContent = "Åpent til " + formatTime(today[1]);
    } else if (today && minutesNow < today[0]) {
      statusEl.textContent = "Stengt nå";
      detailEl.textContent = "Åpner kl. " + formatTime(today[0]);
    } else {
      statusEl.textContent = "Stengt nå";
      detailEl.textContent = "Stengt i dag";
    }
  }

  updateStatus();
  setInterval(updateStatus, 60 * 1000);
})();
