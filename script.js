(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  if (menuButton && mobileNav) {
    const setMenu = (open) => {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
      mobileNav.hidden = !open;
    };

    // Keep the links visible on mobile until the menu can be enhanced.
    setMenu(false);
    menuButton.hidden = false;
    menuButton.addEventListener("click", () => {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        menuButton.getAttribute("aria-expanded") === "true"
      ) {
        setMenu(false);
        menuButton.focus();
      }
    });
    const desktop = window.matchMedia("(min-width: 901px)");
    desktop.addEventListener("change", (event) => {
      if (event.matches) {
        const focusWasInMenu =
          mobileNav.contains(document.activeElement) ||
          document.activeElement === menuButton;
        setMenu(false);
        if (focusWasInMenu) document.querySelector(".wordmark")?.focus();
      }
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
