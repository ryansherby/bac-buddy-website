(function () {
  const config = window.BAC_BUDDY_CONFIG || {};
  const appStoreId = String(config.appStoreId || "").trim();
  const supportEmail = String(config.supportEmail || "").trim();
  const appStoreUrl = appStoreId
    ? "https://apps.apple.com/app/id" + encodeURIComponent(appStoreId)
    : "https://apps.apple.com/us/search?term=" +
      encodeURIComponent("BAC Buddy Drink Responsibly");
  const mailtoUrl = supportEmail ? "mailto:" + supportEmail : "";

  document.querySelectorAll("[data-app-store-link]").forEach(function (el) {
    el.setAttribute("href", appStoreUrl);
  });

  document.querySelectorAll("[data-support-email]").forEach(function (el) {
    if (!supportEmail) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    if (el.tagName === "A") {
      el.setAttribute("href", mailtoUrl);
      if (!el.textContent.trim()) {
        el.textContent = supportEmail;
      }
      return;
    }
    el.querySelectorAll("a").forEach(function (link) {
      link.setAttribute("href", mailtoUrl);
      if (!link.textContent.trim()) {
        link.textContent = supportEmail;
      }
    });
  });

  document.querySelectorAll("[data-support-email-fallback]").forEach(function (el) {
    el.hidden = Boolean(supportEmail);
  });

  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
