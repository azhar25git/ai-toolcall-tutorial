document.addEventListener('alpine:init', () => {
  Alpine.data('docState', () => ({
      mobileMenu: false,
      activeSection: '',

      toggleMenu() {
          this.mobileMenu = !this.mobileMenu;
          // Prevent body scroll when menu is open
          document.body.style.overflow = this.mobileMenu ? 'hidden' : '';
      },

      closeMenu() {
          this.mobileMenu = false;
          document.body.style.overflow = '';
      },

      init() {
          // ScrollSpy to highlight active link in the sidebar
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      // Update the state; Alpine handles the UI binding
                      this.activeSection = entry.target.id;
                  }
              });
          }, { 
              rootMargin: '-10% 0px -70% 0px', // Better precision for triggering the active link
              threshold: 0 
          });

          // Observe all main section headers
          document.querySelectorAll('h1[id], h2[id], h3[id]').forEach(heading => {
              observer.observe(heading);
          });
      }
  }));
});

// Simple logic to toggle sidebar on mobile
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

// Show button only on mobile
if (window.innerWidth <= 1024) {
    menuToggle.style.display = 'block';
}

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking a link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            menuToggle.classList.remove('is-active');
        }
    });
});

document.addEventListener('click', (e) => {
  const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        menuToggle.classList.remove('is-active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Get the height of your navbar
            const navHeight = document.querySelector('#header').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function adjustMobileNav() {
    const header = document.querySelector('#header');
    const sidebar = document.querySelector('.sidebar');
    const headerHeight = header.offsetHeight;

    sidebar.style.top = `${headerHeight}px`;
}
window.addEventListener('load', adjustMobileNav);
window.addEventListener('resize', adjustMobileNav);