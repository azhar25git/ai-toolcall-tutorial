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
          // ScrollSpy to highlight active link
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      this.activeSection = entry.target.id;
                  }
              });
          }, { threshold: 0.2 });

          document.querySelectorAll('h2[id]').forEach(h2 => observer.observe(h2));
      }
  }));
});