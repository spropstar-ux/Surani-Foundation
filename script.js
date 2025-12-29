/* ===================================
   SURRANI FOUNDATION - JAVASCRIPT
   Modern Professional Interactions
   =================================== */

// ===================================
// PAGE REFRESH ON LOAD
// ===================================
window.addEventListener('load', function () {
    // Ensure page loads at top
    window.scrollTo(0, 0);
});

// Prevent caching and ensure fresh load
window.addEventListener('beforeunload', function () {
    sessionStorage.clear();
});

// ===================================
// SCROLL TO HERO ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    // Scroll to hero section on page refresh
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuBtn.innerHTML = mobileMenu.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close menu when clicking on a link
    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                if (menuBtn) {
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const menuBtn = document.querySelector('.mobile-menu-toggle');
                if (menuBtn) {
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link tracking
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// COUNTER ANIMATION
// ===================================
const counters = document.querySelectorAll('.counter');
const animatedCounters = new Set();

function animateCounter(counter) {
    if (animatedCounters.has(counter)) return;
    animatedCounters.add(counter);

    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const start = Date.now();

    const updateCounter = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);

        let displayValue = current.toLocaleString();

        // Add '+' for display if target is large
        if (target > 1000 && progress < 1) {
            displayValue += '+';
        } else if (target > 1000 && progress === 1) {
            displayValue += '+';
        }

        counter.textContent = displayValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            let finalValue = target.toLocaleString();
            if (target > 1000) {
                finalValue += '+';
            }
            counter.textContent = finalValue;
        }
    };

    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('counter')) {
                animateCounter(entry.target);
            }

            // Add fade-in animation to elements
            if (entry.target.classList.contains('fade-in-up')) {
                entry.target.style.opacity = '1';
            }
        }
    });
}, observerOptions);

// Observe all counters and fade-in elements
document.querySelectorAll('.counter, .fade-in-up').forEach(el => {
    observer.observe(el);
});

// ===================================
// CONTACT FORM SUBMISSION
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.innerHTML;
            const originalBgColor = submitBtn.style.backgroundColor;

            // Show success feedback
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent Successfully!';
            submitBtn.style.backgroundColor = '#10b981';
            submitBtn.disabled = true;

            // Reset form
            this.reset();

            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = originalBgColor;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
});

// ===================================
// NEWSLETTER SUBSCRIPTION
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const newsletterBtn = document.querySelector('footer .newsletter-form button');
    const newsletterInput = document.querySelector('footer .newsletter-form input');

    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', () => {
            if (newsletterInput.value.trim()) {
                const originalText = newsletterBtn.textContent;
                const originalBgColor = newsletterBtn.style.backgroundColor;

                newsletterBtn.textContent = '✓ Subscribed!';
                newsletterBtn.style.backgroundColor = '#10b981';
                newsletterBtn.disabled = true;

                setTimeout(() => {
                    newsletterBtn.textContent = originalText;
                    newsletterBtn.style.backgroundColor = originalBgColor;
                    newsletterBtn.disabled = false;
                    newsletterInput.value = '';
                }, 2000);
            }
        });
    }
});

// ===================================
// LAZY LOADING FOR IMAGES
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// RIPPLE EFFECT ON BUTTONS
// ===================================
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// FORM VALIDATION
// ===================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0000';
        } else {
            input.style.borderColor = '';
        }

        if (input.type === 'email' && !validateEmail(input.value)) {
            isValid = false;
            input.style.borderColor = '#ff0000';
        }
    });

    return isValid;
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('Surrani Foundation Website Loaded');

    // Add any initialization code here
    // Example: Initialize tooltips, popovers, etc.
});

// ===================================
// PRINT FRIENDLY
// ===================================
function printPage() {
    window.print();
}

// Export functions for external use
window.SurraniFunctions = {
    validateEmail,
    validateForm,
    isElementInViewport,
    debounce,
    throttle,
    printPage
};


// form
document.getElementById("loanForm")?.addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = e.target;
  const fullNameEl = form.querySelector('#fullName') || document.getElementById('fullName');
  const emailEl = form.querySelector('#email') || document.getElementById('email');
  const phoneEl = form.querySelector('#phone') || document.getElementById('phone');

  const formData = {
    fullName: (fullNameEl && fullNameEl.value) ? fullNameEl.value.trim() : '',
    email: (emailEl && emailEl.value) ? emailEl.value.trim() : '',
    phone: (phoneEl && phoneEl.value) ? phoneEl.value.trim() : ''
  };

  if (!formData.fullName || !formData.email || !formData.phone) {
    Swal.fire({
      title: "Missing Fields",
      text: "Please fill all required fields before submitting.",
      icon: "warning",
      confirmButtonColor: "#b59b6e"
    });
    return;
  }

  const submitBtn = form.querySelector("button[type='submit']") || document.querySelector("button[type='submit']");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span class=\"spinner-border spinner-border-sm\"></span> Sending...";
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbygtkdYLr3pY2b4OskbCHa0H3Zzo5NHhS280irD-ZyVk32mrekQ6YT22l3iWcDBN1j3ag/exec", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.status === "success") {
      Swal.fire({
        html: `
          <div style="padding: 30px; text-align:center;">
            <h2 style="font-size: 1.6rem; font-weight:600; color:#000; margin-bottom:12px;">
              Thank you, ${formData.fullName}
            </h2>
            <p style="font-size: 1rem; color:#444; margin-bottom:0; line-height:1.6;">
              We’ve received your message.<br>
              Our team will connect with you shortly.
            </p>
            <p style="margin-top:18px; font-weight:bold; font-size:1.1rem; color:#000;">
              – Surrani Foundation Team
            </p>
          </div>
        `,
        background: "#ffffff",
        color: "#222",
        width: 500,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Close",
        confirmButtonColor: "#000000ff",
        customClass: {
          popup: "rounded-2xl shadow-2xl border-0",
          confirmButton: "px-5 py-2 rounded-md font-medium"
        }
      }).then(() => form.reset());
    } else {
      throw new Error(result.message || "Something went wrong, please try again.");
    }
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: error.message,
      icon: "error",
      confirmButtonColor: "#b59b6e"
    });
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Submit";
    }
  }
});




