(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  const setMenu = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNav.hidden = !open;
  };
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });
  const desktop = window.matchMedia('(min-width: 601px)');
  desktop.addEventListener('change', (event) => { if (event.matches) setMenu(false); });
  document.querySelector('#year').textContent = new Date().getFullYear();

  // A twisted mathematical surface. Both curve families follow the same
  // parameterization, forming a precise, continuous woven grid.
  const surface = document.querySelector('#surface-lines');
  const ns = 'http://www.w3.org/2000/svg';
  const project = (u, v) => {
    const x = u * 142;
    const y = v * 125;
    const z = 62 * Math.sin(u * 1.7) * Math.cos(v * 1.25) + 48 * u * v;
    return [250 + x * 0.89 + y * 0.65, 238 + x * 0.30 - y * 0.42 - z * 1.12];
  };
  const fragment = document.createDocumentFragment();
  for (let family = 0; family < 2; family++) {
    for (let line = 0; line <= 26; line++) {
      const fixed = -1 + 2 * line / 26;
      let d = '';
      for (let point = 0; point <= 90; point++) {
        const moving = -1 + 2 * point / 90;
        const [x, y] = family === 0 ? project(fixed, moving) : project(moving, fixed);
        d += `${point === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)} `;
      }
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', family === 0 ? '#174bea' : '#416be9');
      path.setAttribute('stroke-width', line === 0 || line === 26 ? '1.55' : '0.85');
      path.setAttribute('opacity', family === 0 ? '0.9' : '0.67');
      fragment.appendChild(path);
    }
  }
  surface.appendChild(fragment);
})();
