// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact forms are now handled by Formspree
// Forms will redirect to a thank you page after submission

// Navbar active link highlighting
function updateActiveLink() {
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-link');
    
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentLocation || 
            (currentLocation === '/' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and aide cards
document.querySelectorAll('.service-card, .aide-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu close on link click
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Add animation to stats on scroll
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const finalValue = entry.target.textContent;
                    const numericValue = parseInt(finalValue);
                    
                    if (!isNaN(numericValue)) {
                        let currentValue = 0;
                        const increment = numericValue / 50;
                        
                        const counter = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= numericValue) {
                                entry.target.textContent = finalValue;
                                clearInterval(counter);
                            } else {
                                entry.target.textContent = Math.floor(currentValue) + (finalValue.includes('%') ? '%' : finalValue.includes('€') ? '€' : finalValue.includes('+') ? '+' : '');
                            }
                        }, 30);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

document.addEventListener('DOMContentLoaded', animateStats);

// Tooltip initialization (Bootstrap)
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    }
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Form input focus effects
const formInputs = document.querySelectorAll('.form-control, .form-select');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

console.log('Rénov\'Conseil Plus - Site loaded successfully');

// Cookie Consent Banner
function showCookieBanner() {
    // Check if user has already accepted cookies
    if (localStorage.getItem('cookiesAccepted')) {
        return;
    }

    // Create cookie banner
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 20px;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 15px;
    `;

    banner.innerHTML = `
        <div style="flex: 1; min-width: 300px;">
            <p style="margin: 0; font-size: 14px;">
                <i class="bi bi-shield-check me-2"></i>
                <strong>Respect de votre vie privée</strong><br>
                Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                En continuant votre navigation, vous acceptez notre utilisation des cookies.
                <a href="politique-confidentialite.html" style="color: #3498db; text-decoration: underline;">En savoir plus</a>
            </p>
        </div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button id="acceptCookies" class="btn btn-success" style="white-space: nowrap;">
                <i class="bi bi-check-circle me-2"></i>Accepter
            </button>
            <button id="refuseCookies" class="btn btn-outline-light" style="white-space: nowrap;">
                Refuser
            </button>
        </div>
    `;

    document.body.appendChild(banner);

    // Accept cookies
    document.getElementById('acceptCookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.style.animation = 'slideDown 0.5s ease';
        setTimeout(() => banner.remove(), 500);
    });

    // Refuse cookies
    document.getElementById('refuseCookies').addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'false');
        banner.style.animation = 'slideDown 0.5s ease';
        setTimeout(() => banner.remove(), 500);
    });
}

// Add slide down animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Show cookie banner on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showCookieBanner, 1000);
});
