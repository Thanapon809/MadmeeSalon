// Visitor Counter System
class VisitorCounter {
    constructor() {
        this.counterElement = document.getElementById('visitorCount');
        this.storageKey = 'visitorCount';
        this.init();
    }

    init() {
        // Get current count from localStorage
        let currentCount = localStorage.getItem(this.storageKey);
        
        if (currentCount === null) {
            // First visit
            currentCount = 1;
        } else {
            // Increment existing count
            currentCount = parseInt(currentCount) + 1;
        }
        
        // Save to localStorage
        localStorage.setItem(this.storageKey, currentCount);
        
        // Animate counter display
        this.animateCounter(currentCount);
    }

    animateCounter(targetCount) {
        let currentDisplay = 0;
        const increment = targetCount / 50; // Smooth animation
        const timer = setInterval(() => {
            currentDisplay += increment;
            if (currentDisplay >= targetCount) {
                currentDisplay = targetCount;
                clearInterval(timer);
            }
            this.counterElement.textContent = Math.floor(currentDisplay);
        }, 50);
    }
}

// Smooth Scrolling Navigation
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(link);
                }
            });
        });
    }

    updateActiveNavLink(clickedLink) {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
    }
}

// Form Handling
class ContactForm {
    constructor() {
        this.init();
    }

    init() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.phone || !data.service) {
            this.showMessage('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
            return;
        }
        
        // Simulate form submission
        this.showMessage('ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด', 'success');
        form.reset();
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        
        // Style the message
        messageElement.style.cssText = `
            padding: 15px;
            margin: 20px 0;
            border-radius: 10px;
            text-align: center;
            font-weight: 500;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message after form
        const formElement = document.querySelector('.contact-form form');
        formElement.parentNode.insertBefore(messageElement, formElement.nextSibling);
        
        // Auto remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Product Order System
class ProductOrder {
    constructor() {
        this.init();
    }

    init() {
        const orderButtons = document.querySelectorAll('.product-card .btn-primary');
        
        orderButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleOrder(e.target);
            });
        });
    }

    handleOrder(button) {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.price').textContent;
        
        // Show order confirmation
        this.showOrderModal(productName, productPrice);
    }

    showOrderModal(productName, productPrice) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        `;
        
        modalContent.innerHTML = `
            <h3 style="color: #e91e63; margin-bottom: 20px;">ยืนยันการสั่งซื้อ</h3>
            <p style="margin-bottom: 15px; font-size: 1.1rem;">สินค้า: <strong>${productName}</strong></p>
            <p style="margin-bottom: 15px; font-size: 1.1rem;">ราคา: <strong>${productPrice}</strong></p>
            <p style="margin-bottom: 30px; color: #666;">กรุณาติดต่อเราเพื่อดำเนินการสั่งซื้อ</p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">ตกลง</button>
                <a href="#contact" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">ติดต่อเรา</a>
            </div>
        `;
        
        // Add modal to page
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Close modal when clicking overlay
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.remove();
            }
        });
    }
}

// Scroll-based Navigation Highlighting
class ScrollNavigation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.pageYOffset >= (sectionTop - headerHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Animation on Scroll
class ScrollAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.service-card, .product-card, .contact-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize visitor counter
    new VisitorCounter();
    
    // Initialize smooth scrolling
    new SmoothScrolling();
    
    // Initialize contact form
    new ContactForm();
    
    // Initialize product ordering
    new ProductOrder();
    
    // Initialize scroll-based navigation
    new ScrollNavigation();
    
    // Initialize scroll animations
    new ScrollAnimation();
    
    // Add some interactive effects
    addInteractiveEffects();
});

// Additional interactive effects
function addInteractiveEffects() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
