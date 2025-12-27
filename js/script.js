/* ============================================
   SHASHANK K.C - PORTFOLIO WEBSITE
   JavaScript Interactions
   ============================================ */

// Wait for the DOM (HTML) to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== ELEMENT SELECTORS ==========
    // Get references to HTML elements we'll work with
    
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contact-form');

    // ========== 1. HAMBURGER MENU TOGGLE ==========
    // When hamburger is clicked, show/hide mobile menu
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle 'active' class on hamburger (animates to X)
            hamburger.classList.toggle('active');
            
            // Toggle 'active' class on nav links (shows/hides menu)
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ========== 2. NAVBAR SCROLL EFFECT ==========
    // Change navbar style when user scrolls down
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add shadow and darker background when scrolled
        if (currentScrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
        
        lastScrollY = currentScrollY;
    });

    // ========== 3. ACTIVE NAVIGATION LINK ==========
    // Highlight the nav link of the section currently in view
    
    function updateActiveLink() {
        let currentSection = '';
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);

    // ========== 4. SMOOTH SCROLL FOR NAVIGATION ==========
    // Smoothly scroll to sections when nav links are clicked
    
    navLinksItems.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== 5. SCROLL REVEAL ANIMATIONS ==========
    // Animate elements when they come into view
    
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.skill-category, .project-card, .about-text, .contact-info, .contact-form-container');
        
        reveals.forEach(function(element) {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add CSS for reveal animation dynamically
    const style = document.createElement('style');
    style.textContent = `
        .skill-category,
        .project-card,
        .about-text,
        .contact-info,
        .contact-form-container {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-category.revealed,
        .project-card.revealed,
        .about-text.revealed,
        .contact-info.revealed,
        .contact-form-container.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animation delay for cards */
        .skill-category:nth-child(1), .project-card:nth-child(1) { transition-delay: 0.1s; }
        .skill-category:nth-child(2), .project-card:nth-child(2) { transition-delay: 0.2s; }
        .skill-category:nth-child(3), .project-card:nth-child(3) { transition-delay: 0.3s; }
        .skill-category:nth-child(4), .project-card:nth-child(4) { transition-delay: 0.4s; }
        .skill-category:nth-child(5) { transition-delay: 0.5s; }
        .skill-category:nth-child(6) { transition-delay: 0.6s; }
        
        /* Active nav link styling */
        .nav-links a.active {
            color: #ffd700 !important;
        }
        
        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
    
    // Run on scroll and on page load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // ========== 6. TYPING EFFECT FOR TITLE (BONUS!) ==========
    // Creates a typewriter effect for the title
    
    const titleElement = document.querySelector('.home-content .title');
    
    if (titleElement) {
        const originalText = titleElement.textContent;
        const titles = [
            'Associate Software Engineer',
            'AI/ML Engineer',
            'Backend Developer',
            'Problem Solver'
        ];
        
        let titleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeEffect() {
            const currentTitle = titles[titleIndex];
            
            if (isDeleting) {
                titleElement.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                titleElement.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Add blinking cursor effect
            titleElement.style.borderRight = '3px solid #ffd700';
            
            if (!isDeleting && charIndex === currentTitle.length) {
                // Pause at end of word
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeEffect, 1000);
    }

    // ========== 7. ENHANCED FORM HANDLING WITH GOOGLE SHEETS ==========
    // Validation, loading states, character counter, and Google Sheets integration
    
    if (contactForm) {
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');
        const charCount = document.getElementById('char-count');
        
        // Character counter for message
        if (messageInput && charCount) {
            messageInput.addEventListener('input', function() {
                const count = this.value.length;
                charCount.textContent = count;
                
                const counter = document.querySelector('.char-counter');
                
                // Change color based on count
                if (count >= 900) {
                    counter.classList.add('limit');
                    counter.classList.remove('warning');
                } else if (count >= 700) {
                    counter.classList.add('warning');
                    counter.classList.remove('limit');
                } else {
                    counter.classList.remove('warning', 'limit');
                }
            });
        }
        
        // Real-time validation on input blur (when user leaves field)
        const inputs = [nameInput, emailInput, messageInput];
        
        inputs.forEach(function(input) {
            if (input) {
                // Validate on blur (when user leaves the field)
                input.addEventListener('blur', function() {
                    validateField(this);
                });
                
                // Remove error on focus
                input.addEventListener('focus', function() {
                    this.classList.remove('invalid');
                    const errorSpan = document.getElementById(this.id + '-error');
                    if (errorSpan) errorSpan.textContent = '';
                });
            }
        });
        
        // Validate subject on change
        if (subjectInput) {
            subjectInput.addEventListener('change', function() {
                validateField(this);
            });
        }
        
        // Validate individual field
        function validateField(field) {
            const errorSpan = document.getElementById(field.id + '-error');
            let isValid = true;
            let errorMessage = '';
            
            const value = field.value.trim();
            
            switch (field.id) {
                case 'name':
                    if (value === '') {
                        isValid = false;
                        errorMessage = 'Name is required';
                    } else if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'Name must be at least 2 characters';
                    } else if (!/^[a-zA-Z\s.]+$/.test(value)) {
                        isValid = false;
                        errorMessage = 'Name can only contain letters and spaces';
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (value === '') {
                        isValid = false;
                        errorMessage = 'Email is required';
                    } else if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                    
                case 'subject':
                    if (value === '') {
                        isValid = false;
                        errorMessage = 'Please select a subject';
                    }
                    break;
                    
                case 'message':
                    if (value === '') {
                        isValid = false;
                        errorMessage = 'Message is required';
                    } else if (value.length < 10) {
                        isValid = false;
                        errorMessage = 'Message must be at least 10 characters';
                    }
                    break;
            }
            
            // Update UI
            if (isValid) {
                field.classList.remove('invalid');
                field.classList.add('valid');
                if (errorSpan) errorSpan.textContent = '';
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (errorSpan) errorSpan.textContent = errorMessage;
            }
            
            return isValid;
        }
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateField(nameInput);
            const isEmailValid = validateField(emailInput);
            const isSubjectValid = validateField(subjectInput);
            const isMessageValid = validateField(messageInput);
            
            if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
                showStatus('Please fix the errors above and try again.', 'error');
                return;
            }
            
            // Show loading state
            setLoadingState(true);
            showStatus('Sending your message...', 'loading');
            
            // Get form data
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value,
                message: messageInput.value.trim(),
                timestamp: new Date().toLocaleString()
            };
            
            // ============================================
            // SEND DATA TO GOOGLE SHEETS
            // ============================================
            
            // ⚠️⚠️⚠️ IMPORTANT: REPLACE THE URL BELOW WITH YOUR ACTUAL URL! ⚠️⚠️⚠️
            // Copy your Google Apps Script Web App URL from Step C5 and paste it here
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxhkL2CB0Twb-qu_zgXqzYm8dAFGKJLYh9yI3tUow59z6-92QQsWwVKNj4CALYjamKv1A/exec';
            
            // Send data using Fetch API
            fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(function(response) {
                // Success!
                console.log('✅ Form submitted successfully!', response);
                
                // Show success message
                setLoadingState(false);
                showStatus(
                    '🎉 Thank you, ' + formData.name + '! Your message has been received. I\'ll get back to you within 24 hours!', 
                    'success'
                );
                
                // Reset form
                contactForm.reset();
                charCount.textContent = '0';
                
                // Remove valid classes
                inputs.forEach(input => {
                    if (input) input.classList.remove('valid');
                });
                if (subjectInput) subjectInput.classList.remove('valid');
                
                // Change button to success state
                submitBtn.classList.add('success');
                submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
                
                // Reset button after 3 seconds
                setTimeout(function() {
                    submitBtn.classList.remove('success');
                    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                }, 3000);
                
                // Hide success message after 8 seconds
                setTimeout(function() {
                    formStatus.classList.remove('success');
                    formStatus.style.display = 'none';
                }, 8000);
                
            })
            .catch(function(error) {
                // Error occurred
                console.error('❌ Error submitting form:', error);
                
                setLoadingState(false);
                showStatus(
                    '❌ Oops! Something went wrong. Please try again or email me directly at sg276278@gmail.com',
                    'error'
                );
            });
        });
        
        // Helper: Show status message
        function showStatus(message, type) {
            formStatus.textContent = message;
            formStatus.className = 'form-status ' + type;
        }
        
        // Helper: Set loading state
        function setLoadingState(isLoading) {
            if (isLoading) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            } else {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    }

    // ========== 8. BUTTON CLICK RIPPLE EFFECT ==========
    // Add ripple effect when buttons are clicked
    
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            // Position ripple at click location
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            // Add ripple to button
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ========== 9. SCROLL TO TOP BUTTON ==========
    // Add a button to scroll back to top
    
    // Create scroll-to-top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ffd700, #b8860b);
        color: #0a0a0a;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for scroll-to-top button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // ========== 10. CONSOLE WELCOME MESSAGE ==========
    // Easter egg for developers who open console!
    
    console.log('%c Welcome to Shashank\'s Portfolio! 🚀', 
        'background: linear-gradient(135deg, #ffd700, #b8860b); color: #0a0a0a; font-size: 20px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
    console.log('%c Built with ❤️ using HTML, CSS & JavaScript', 
        'color: #ffd700; font-size: 14px;');
    console.log('%c Looking to hire? Contact: sg276278@gmail.com', 
        'color: #b3b3b3; font-size: 12px;');

});