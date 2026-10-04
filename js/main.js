(function () {
  var cfg = window.SITE_CONFIG || {};

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  // ---- Join buttons -> application form (falls back to #contact until a link is set)
  // data-join="group" uses the Group Coaching form, data-join="one-on-one" the 1 on 1 form.
  var forms = { "group": cfg.groupFormUrl, "one-on-one": cfg.oneOnOneFormUrl };
  each("[data-join]", function (el) {
    var url = forms[el.getAttribute("data-join")];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    } else if (el.hasAttribute("data-join-only")) {
      el.hidden = true;
    }
  });

  // ---- WhatsApp
  each("[data-whatsapp]", function (el) {
    if (!cfg.whatsapp) { el.hidden = true; return; }
    var msg = cfg.whatsappMessage ? "?text=" + encodeURIComponent(cfg.whatsappMessage) : "";
    el.href = "https://wa.me/" + cfg.whatsapp + msg;
  });

  // ---- Phone
  each("[data-phone]", function (el) {
    if (!cfg.phoneLink) { el.hidden = true; return; }
    el.href = "tel:" + cfg.phoneLink;
  });
  each("[data-phone-text]", function (el) {
    if (cfg.phoneDisplay) el.textContent = cfg.phoneDisplay;
  });

  // ---- Email (hidden until set)
  each("[data-email]", function (el) {
    if (!cfg.email) return;
    el.href = "mailto:" + cfg.email;
    el.hidden = false;
  });
  each("[data-email-text]", function (el) { el.textContent = cfg.email || ""; });

  // ---- Instagram (hidden until set)
  var ig = (cfg.instagram || "").replace(/^@/, "");
  each("[data-instagram]", function (el) {
    if (!ig) return;
    el.href = "https://www.instagram.com/" + ig + "/";
    el.hidden = false;
  });
  each("[data-instagram-text]", function (el) { el.textContent = ig ? "@" + ig : ""; });

  // ---- Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---- Mobile menu
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("siteNav");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // ---- Header shadow on scroll
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Scroll reveal
  var items = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    each(".reveal", function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  // ---- FAQ: keep one open at a time
  each(".faq", function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      each(".faq", function (other) { if (other !== item) other.open = false; });
    });
  });
})();
