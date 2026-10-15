(function () {
  var cfg = window.SITE_CONFIG || {};

  function each(selector, fn) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), fn);
  }

  // ---- Join buttons -> application form (falls back to #contact until a link is set)
  // data-join="one-on-one" uses the 1 on 1 form.
  var forms = { "one-on-one": cfg.oneOnOneFormUrl };
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
    // A button can set its own pre-filled message with data-whatsapp-message.
    var text = el.getAttribute("data-whatsapp-message") || cfg.whatsappMessage;
    var msg = text ? "?text=" + encodeURIComponent(text) : "";
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

  // ---- Program cards: soft light follows the cursor
  each("[data-spotlight]", function (card) {
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - r.left) + "px");
      card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });

  // ---- Certifications: "View certificate" opens the certificate in a pop-up
  var certDialog = document.getElementById("certDialog");
  if (certDialog && typeof certDialog.showModal === "function") {
    var certImg = certDialog.querySelector(".cert-dialog-img");
    var certLink = certDialog.querySelector(".cert-dialog-link");
    var certTitle = certDialog.querySelector(".cert-dialog-title");
    each(".cert-view", function (btn) {
      btn.addEventListener("click", function () {
        certImg.src = btn.getAttribute("data-cert-src");
        certImg.alt = btn.getAttribute("data-cert-alt");
        certLink.href = btn.getAttribute("data-cert-src");
        certTitle.textContent = btn.getAttribute("data-cert-title");
        certDialog.setAttribute("aria-label", btn.getAttribute("data-cert-title") + " certificate");
        certDialog.showModal();
      });
    });
    certDialog.querySelector(".cert-dialog-close").addEventListener("click", function () {
      certDialog.close();
    });
    // a click on the dimmed area outside the pop-up closes it
    certDialog.addEventListener("click", function (e) {
      var r = certDialog.getBoundingClientRect();
      var outside = e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) certDialog.close();
    });
  } else {
    // very old browsers: just open the certificate image
    each(".cert-view", function (btn) {
      btn.addEventListener("click", function () {
        window.open(btn.getAttribute("data-cert-src"), "_blank", "noopener");
      });
    });
  }

  // ---- FAQ: keep one open at a time
  each(".faq", function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      each(".faq", function (other) { if (other !== item) other.open = false; });
    });
  });
})();
