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

  function initHeaderVar() {
    // Publish the sticky header's height so the menu jump-bar can tuck
    // directly beneath it (top: var(--hdr)).
    var header = document.querySelector(".site-header");
    if (!header) return;
    function set() {
      document.documentElement.style.setProperty("--hdr", header.offsetHeight + "px");
    }
    set();
    window.addEventListener("resize", set);
    if ("ResizeObserver" in window) new ResizeObserver(set).observe(header);
  }

  function initMenuSpy() {
    var bar = document.querySelector(".menu-nav");
    if (!bar) return;
    var links = Array.prototype.slice.call(bar.querySelectorAll(".menu-toc a"));
    var byId = {};
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = document.getElementById(id);
      if (sec) { byId[id] = a; sections.push(sec); }
    });
    if (!sections.length) return;

    var track = bar.querySelector(".menu-toc");
    var current = null;
    function setActive(a) {
      if (a === current) return;
      current = a;
      links.forEach(function (l) { l.classList.toggle("active", l === a); });
      // keep the active chip visible in the horizontal-scroll bar on mobile
      if (a && track.scrollWidth > bar.clientWidth) {
        a.scrollIntoView({ block: "nearest", inline: "center" });
      }
    }

    // Deterministic scrollspy: the active section is the last one whose top
    // has scrolled up past the sticky bar. Guarantees exactly one active chip.
    var ticking = false;
    function update() {
      ticking = false;
      var line = bar.getBoundingClientRect().bottom + 12;
      var active = sections[0];
      for (var j = 0; j < sections.length; j++) {
        if (sections[j].getBoundingClientRect().top <= line) active = sections[j];
        else break;
      }
      setActive(byId[active.id]);
    }
    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    links.forEach(function (a) {
      a.addEventListener("click", function () { setActive(a); });
    });
  }

  function boot() {
    updateOpenStatus();
    setInterval(updateOpenStatus, 60 * 1000);
    initNavToggle();
    initLogoScroll();
    initReveal();
    initYear();
    initHeaderVar();
    initMenuSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
