// ============================================
//   PRODIGY_WD_01 — Responsive Landing Page
//   script.js
// ============================================

// ── GENERATE STAR PARTICLES IN HERO ──
(function () {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left:    ${Math.random() * 100}%;
      top:     ${Math.random() * 100}%;
      --d:     ${2 + Math.random() * 4}s;
      --delay: ${Math.random() * 5}s;
      --op:    ${0.3 + Math.random() * 0.7};
    `;
    container.appendChild(star);
  }
})();


// ── NAVBAR: SCROLL EFFECT + ACTIVE LINK ──
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {

  // Toggle frosted-glass style when user scrolls down
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Highlight the nav link matching the current section
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });

});


// ── SERVICE CARDS: MOUSE-TRACKING GLOW ──
document.querySelectorAll('.svc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width  * 100) + '%';
    const yPct = ((e.clientY - rect.top)  / rect.height * 100) + '%';
    card.style.setProperty('--mx', xPct);
    card.style.setProperty('--my', yPct);
  });
});


// ── MOBILE DRAWER MENU ──
let drawerOpen = false;

function toggleDrawer() {
  drawerOpen = !drawerOpen;
  document.getElementById('hamburger').classList.toggle('open', drawerOpen);
  document.getElementById('navDrawer').classList.toggle('open', drawerOpen);
}

function closeDrawer() {
  drawerOpen = false;
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navDrawer').classList.remove('open');
}


// ── TASK BADGE TOGGLE ──
let badgeOpen = true;

function toggleBadge() {
  badgeOpen = !badgeOpen;
  document.getElementById('taskBadge').classList.toggle('collapsed', !badgeOpen);
  document.getElementById('taskToggle').textContent = badgeOpen ? '−' : '+';
}


// ── SCROLL REVEAL (IntersectionObserver) ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── CONTACT FORM SUBMIT ──
function submitForm(e) {
  e.preventDefault();

  const btn = document.getElementById('submitBtn');
  btn.style.opacity = '0.7';
  btn.style.pointerEvents = 'none';
  btn.innerHTML = '<span>Sending...</span>';

  // Simulate network request
  setTimeout(() => {
    btn.style.opacity = '';
    btn.style.pointerEvents = '';
    btn.innerHTML = '<span>Send Message</span><span>→</span>';
    e.target.reset();

    // Show success toast
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }, 1800);
}