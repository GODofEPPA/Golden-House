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
  var homeMapEl = document.getElementById("map-home");

  if (!homeMapEl || typeof L === "undefined") return;

  var GOLDEN_HOUSE = { lat: 58.8466295, lng: 5.7152809 };
  var POPUP_HTML = "<strong>Golden House</strong><br>Foren 2, 4318 Sandnes";

  // Default marker icons assume co-located image files; point them at the CDN instead.
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
  });

  var map = L.map(homeMapEl, { scrollWheelZoom: false }).setView([GOLDEN_HOUSE.lat, GOLDEN_HOUSE.lng], 16);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bidragsytere',
    maxZoom: 19
  }).addTo(map);
  L.marker([GOLDEN_HOUSE.lat, GOLDEN_HOUSE.lng]).addTo(map).bindPopup(POPUP_HTML);
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
