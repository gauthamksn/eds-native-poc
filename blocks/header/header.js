import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// Media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Toggles the mobile menu
 * @param {Element} nav The nav element
 * @param {Element} navSections The nav sections element
 */
function toggleMenu(nav, navSections) {
  const expanded = nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  
  // Toggle body scroll behavior
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  
  // Toggle navigation expanded state
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  
  // Update button label
  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
}

/**
 * Loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  if (!fragment) {
    return;
  }

  // Clear block content
  block.textContent = '';
  
  // Create nav element
  const nav = document.createElement('nav');
  nav.id = 'nav';
  
  // Append fragment content to nav
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Add classes to nav sections
  const classes = ['brand', 'sections'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Style the brand section
  const navBrand = nav.querySelector('.nav-brand');

  // Add hamburger menu for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
    <span class="nav-hamburger-icon"></span>
  </button>`;
  
  // Add click event to hamburger
  const navSections = nav.querySelector('.nav-sections');
  hamburger.addEventListener('click', () => toggleMenu(nav, navSections));
  
  // Add hamburger to nav
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  
  // Handle resize events
  isDesktop.addEventListener('change', () => {
    if (isDesktop.matches) {
      nav.setAttribute('aria-expanded', 'false');
    }
  });

  // Create wrapper and append nav
  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
