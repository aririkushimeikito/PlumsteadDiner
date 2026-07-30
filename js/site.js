/* Plumstead Diner — shared site behavior */
(function () {
  "use strict";

  var OPEN_HOUR = 7;    // 7:00 AM
  var CLOSE_HOUR = 15;  // 3:00 PM
  // Open Monday through Sunday, same hours every day.

  function nowInEastern() {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    );
  }

  function updateOpenStatus() {
    var now = nowInEastern();
    var hour = now.getHours() + now.getMinutes() / 60;
    var isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;

    document.querySelectorAll(".js-status").forEach(function (chip) {
      chip.classList.toggle("is-open", isOpen);
      chip.classList.toggle("is-closed", !isOpen);
      var label = chip.querySelector(".js-status-text");
      if (label) {
        label.textContent = isOpen
          ? "Open Now · until 3:00 PM"
          : "Closed · opens at 7:00 AM";
      }
    });

    // Highlight today's row in any hours table
    var dayIndex = now.getDay(); // 0 = Sunday
    document.querySelectorAll("[data-day]").forEach(function (row) {
      row.classList.toggle("today", parseInt(row.getAttribute("data-day"), 10) === dayIndex);
    });
  }

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initLogoScroll() {
    // Clicking the logo while already on the home page should snap straight
    // to the top — instantly, not a slow crawl.
    document.querySelectorAll(".logo-link").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var path = window.location.pathname;
        var onHome = /(^|\/)(index\.html)?$/.test(path);
        if (onHome) {
          event.preventDefault();
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
    });
  }

  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach(function (el) { observer.observe(el); });
  }

  function initYear() {
    document.querySelectorAll(".js-year").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    updateOpenStatus();
    setInterval(updateOpenStatus, 60 * 1000);
    initNavToggle();
    initLogoScroll();
    initReveal();
    initYear();
  });
})();
