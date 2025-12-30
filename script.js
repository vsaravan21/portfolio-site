document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('revealCanvas');
    const coloredImage = document.getElementById('coloredImage');
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    let isDrawing = false;
    let brushSize = 150;
    let bwImage = new Image();
    let imageLoaded = false;
    let lastX = 0;
    let lastY = 0;
    
    // Function to resize canvas and redraw
    function resizeCanvas() {
        if (!imageLoaded) return;
        
        const containerWidth = container.offsetWidth;
        const aspectRatio = bwImage.height / bwImage.width;
        const containerHeight = containerWidth * aspectRatio;
        
        // Set canvas display size
        canvas.style.width = containerWidth + 'px';
        canvas.style.height = containerHeight + 'px';
        
        // Set canvas internal size (for drawing)
        canvas.width = bwImage.width;
        canvas.height = bwImage.height;
        
        // Redraw the black and white image
        ctx.drawImage(bwImage, 0, 0, canvas.width, canvas.height);
        
        // Set composite operation to erase (reveal what's underneath)
        ctx.globalCompositeOperation = 'destination-out';
    }
    
    // Load the black and white image
    bwImage.src = 'images/black-white-image.png';
    
    bwImage.onload = function() {
        imageLoaded = true;
        resizeCanvas();
    };
    
    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    
    // Handle mouse down
    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        lastX = (e.clientX - rect.left) * scaleX;
        lastY = (e.clientY - rect.top) * scaleY;
        draw(e);
    });
    
    // Handle mouse move
    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            draw(e);
        }
    });
    
    // Handle mouse up
    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });
    
    // Handle mouse leave
    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
    });
    
    // Handle touch events for mobile
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        lastX = (e.touches[0].clientX - rect.left) * scaleX;
        lastY = (e.touches[0].clientY - rect.top) * scaleY;
        draw(e.touches[0]);
    });
    
    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (isDrawing) {
            draw(e.touches[0]);
        }
    });
    
    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        isDrawing = false;
    });
    
    // Draw function
    function draw(e) {
        if (!imageLoaded) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        
        // Adjust brush size based on scale
        const scaledBrushSize = (brushSize * scaleX + brushSize * scaleY) / 2;
        
        // Draw a smooth line from last point to current point
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.lineWidth = scaledBrushSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        // Also draw a circle at the end point to ensure full coverage
        ctx.beginPath();
        ctx.arc(x, y, scaledBrushSize / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Update last point
        lastX = x;
        lastY = y;
    }
    
    // Role rotation functionality
    const roles = [
        'Impact-Driven Builder',
        'Creative Thinker',
        'Product Manager',
        'Problem Solver',
    ];
    
    const roleTextElement = document.getElementById('roleText');
    let currentRoleIndex = 0;
    
    function updateRole() {
        roleTextElement.style.opacity = '0';
        roleTextElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            roleTextElement.textContent = roles[currentRoleIndex];
            roleTextElement.style.opacity = '1';
            roleTextElement.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Set initial transition styles
    roleTextElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Start the rotation
    setInterval(updateRole, 2500);
    
    // Navigation handling - smooth scroll to sections
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If link goes to another page (contains .html), let it navigate normally
            if (href.includes('.html')) {
                return; // Allow normal navigation
            }
            
            // Otherwise, handle internal anchor links
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const target = href.substring(1);
            let targetElement;
            
            if (target === 'home') {
                targetElement = document.getElementById('home-section');
            } else if (target === 'work') {
                targetElement = document.querySelector('.work-section');
            } else if (target === 'portfolio') {
                targetElement = document.getElementById('portfolio') || document.querySelector('.portfolio-section');
            } else if (target === 'contact') {
                targetElement = document.getElementById('contact') || document.querySelector('.footer-section');
            } else {
                // For other sections that don't exist yet, create placeholder
                targetElement = document.getElementById(target) || document.querySelector(`.${target}-section`);
            }
            
            if (targetElement) {
                // Smooth scroll to the target section
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Update active nav link based on scroll position after scroll completes
                setTimeout(() => {
                    updateActiveNavLink();
                }, 500);
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = [
            { id: 'home-section', navId: 'home' },
            { id: 'work', navId: 'work' },
            { id: 'portfolio', navId: 'portfolio' },
            { id: 'contact', navId: 'contact' }
        ];
        
        let currentSection = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3; // Use viewport offset for better detection
        
        // Sort sections by their position on page
        const sectionElements = sections
            .map(section => {
                const element = document.getElementById(section.id) || document.querySelector(`#${section.id}`);
                return element ? { element, navId: section.navId, top: element.getBoundingClientRect().top + window.scrollY } : null;
            })
            .filter(item => item !== null)
            .sort((a, b) => a.top - b.top);
        
        // Find which section is currently in view
        for (let i = sectionElements.length - 1; i >= 0; i--) {
            if (scrollPosition >= sectionElements[i].top) {
                currentSection = sectionElements[i].navId;
                break;
            }
        }
        
        // If scrolled to top, default to home
        if (scrollPosition < 100) {
            currentSection = 'home';
        }
        
        // Update active nav link
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Update active nav link on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNavLink, 100);
    }, { passive: true });
    
    // Initial update
    updateActiveNavLink();
    
    // Scroll indicator click handler
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    scrollIndicators.forEach(indicator => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            const currentWrapper = indicator.closest('.content-wrapper');
            const main = indicator.closest('main');
            const workSection = indicator.closest('.work-section');
            
            // Check if we're on the about page (has multiple content-wrappers in main)
            if (currentWrapper && main) {
                const allWrappers = main.querySelectorAll('.content-wrapper');
                if (allWrappers.length > 1 && currentWrapper === allWrappers[0]) {
                    // On about page, first section: scroll to next content-wrapper
                    const nextWrapper = currentWrapper.nextElementSibling;
                    if (nextWrapper) {
                        nextWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        return;
                    }
                }
            }
            
            // Check if we're on the work section
            if (workSection) {
                const nextSection = workSection.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                }
            }
            
            // Default: scroll to next section or scroll down
            if (main) {
                const nextSection = main.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }
            }
        });
    });
});

