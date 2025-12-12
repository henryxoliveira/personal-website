// Test if JavaScript is loading
console.log('Script.js is loading...');

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Dark mode script starting...');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Debug: Check if button is found
    console.log('Dark mode toggle button found:', darkModeToggle);
    
    // Check for saved preference and apply it immediately
    function applyDarkMode() {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'enabled') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }
    
    // Apply dark mode state on page load
    applyDarkMode();
    
    // Toggle between dark and light mode
    if (darkModeToggle) {
        console.log('Adding click event listener to dark mode toggle');
        darkModeToggle.addEventListener('click', function() {
            console.log('Dark mode toggle clicked!');
            body.classList.toggle('dark-mode');
            
            // Visual feedback
            console.log('Body classes after toggle:', body.className);
            console.log('Dark mode class present:', body.classList.contains('dark-mode'));
            
            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                console.log('Dark mode enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
                console.log('Dark mode disabled');
            }
        });
    } else {
        console.error('Dark mode toggle button not found!');
    }
    
    // Listen for storage changes (in case user opens multiple tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'darkMode') {
            applyDarkMode();
        }
    });
});

// Navbar shrink on scroll
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return; // Skip if navbar doesn't exist (e.g., university page)
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateNavbar() {
        const currentScrollY = window.scrollY;
        const shouldBeScrolled = currentScrollY > 50;
        const isScrolled = navbar.classList.contains('scrolled');
        const isTransparent = navbar.classList.contains('transparent');
        const isVisible = navbar.classList.contains('visible');
        
        // Handle transparency states
        if (currentScrollY <= 10) {
            // At the very top - fully transparent
            if (!navbar.classList.contains('transparent')) {
                navbar.classList.add('transitioning');
                navbar.classList.add('transparent');
                navbar.classList.remove('visible', 'scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    navbar.classList.remove('transitioning');
                    if (window.forceIndicatorUpdate) window.forceIndicatorUpdate();
                }, 600);
            }
        } else if (currentScrollY > 10 && currentScrollY <= 50) {
            // Scrolled but not enough to shrink - visible with blur
            if (!navbar.classList.contains('visible') || navbar.classList.contains('scrolled')) {
                navbar.classList.add('transitioning');
                navbar.classList.remove('transparent');
                navbar.classList.add('visible');
                navbar.classList.remove('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    navbar.classList.remove('transitioning');
                    if (window.forceIndicatorUpdate) window.forceIndicatorUpdate();
                }, 600);
            }
        } else {
            // Scrolled enough to shrink - visible and shrunk
            navbar.classList.remove('transparent');
            navbar.classList.add('visible');
            
            if (shouldBeScrolled && !isScrolled) {
                navbar.classList.add('transitioning');
                navbar.classList.add('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    navbar.classList.remove('transitioning');
                    if (window.forceIndicatorUpdate) window.forceIndicatorUpdate();
                }, 600);
            } else if (!shouldBeScrolled && isScrolled) {
                navbar.classList.add('transitioning');
                navbar.classList.remove('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    navbar.classList.remove('transitioning');
                    if (window.forceIndicatorUpdate) window.forceIndicatorUpdate();
                }, 600);
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function handleNavbarScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    // Add scroll event listener for navbar shrinking
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    
    // Initial check
    updateNavbar();
});

// Work page navbar shrink on scroll
document.addEventListener('DOMContentLoaded', function() {
    const workNavbar = document.querySelector('.work-navbar');
    if (!workNavbar) return; // Only run on work page
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateWorkNavbar() {
        const currentScrollY = window.scrollY;
        const shouldBeScrolled = currentScrollY > 50;
        const isScrolled = workNavbar.classList.contains('scrolled');
        const isTransparent = workNavbar.classList.contains('transparent');
        const isVisible = workNavbar.classList.contains('visible');
        
        // Handle transparency states
        if (currentScrollY <= 10) {
            // At the very top - fully transparent
            if (!workNavbar.classList.contains('transparent')) {
                workNavbar.classList.add('transitioning');
                workNavbar.classList.add('transparent');
                workNavbar.classList.remove('visible', 'scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    workNavbar.classList.remove('transitioning');
                }, 600);
            }
        } else if (currentScrollY > 10 && currentScrollY <= 50) {
            // Scrolled but not enough to shrink - visible with blur
            if (!workNavbar.classList.contains('visible') || workNavbar.classList.contains('scrolled')) {
                workNavbar.classList.add('transitioning');
                workNavbar.classList.remove('transparent');
                workNavbar.classList.add('visible');
                workNavbar.classList.remove('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    workNavbar.classList.remove('transitioning');
                }, 600);
            }
        } else {
            // Scrolled enough to shrink - visible and shrunk
            workNavbar.classList.remove('transparent');
            workNavbar.classList.add('visible');
            
            if (shouldBeScrolled && !isScrolled) {
                workNavbar.classList.add('transitioning');
                workNavbar.classList.add('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    workNavbar.classList.remove('transitioning');
                }, 600);
            } else if (!shouldBeScrolled && isScrolled) {
                workNavbar.classList.add('transitioning');
                workNavbar.classList.remove('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    workNavbar.classList.remove('transitioning');
                }, 600);
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function handleWorkNavbarScroll() {
        if (!ticking) {
            requestAnimationFrame(updateWorkNavbar);
            ticking = true;
        }
    }
    
    // Add scroll event listener for work navbar shrinking
    window.addEventListener('scroll', handleWorkNavbarScroll, { passive: true });
    
    // Set initial navbar state
    workNavbar.classList.add('transparent');
    
    // Initial check
    updateWorkNavbar();
});

// University page navbar shrink on scroll
document.addEventListener('DOMContentLoaded', function() {
    const universityNavbar = document.querySelector('.university-navbar');
    if (!universityNavbar) return; // Only run on university page
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    function updateUniversityNavbar() {
        const currentScrollY = window.scrollY;
        const shouldBeScrolled = currentScrollY > 50;
        const isScrolled = universityNavbar.classList.contains('scrolled');
        const isTransparent = universityNavbar.classList.contains('transparent');
        const isVisible = universityNavbar.classList.contains('visible');
        
        // Handle transparency states
        if (currentScrollY <= 10) {
            // At the very top - fully transparent
            if (!universityNavbar.classList.contains('transparent')) {
                universityNavbar.classList.add('transitioning');
                universityNavbar.classList.add('transparent');
                universityNavbar.classList.remove('visible', 'scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    universityNavbar.classList.remove('transitioning');
                }, 600);
            }
        } else if (currentScrollY > 10 && currentScrollY <= 50) {
            // Scrolled but not enough to shrink - visible with blur
            if (!universityNavbar.classList.contains('visible') || universityNavbar.classList.contains('scrolled')) {
                universityNavbar.classList.add('transitioning');
                universityNavbar.classList.remove('transparent');
                universityNavbar.classList.add('visible');
                universityNavbar.classList.remove('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    universityNavbar.classList.remove('transitioning');
                }, 600);
            }
        } else {
            // Scrolled enough to shrink - visible and shrunk
            universityNavbar.classList.remove('transparent');
            universityNavbar.classList.add('visible');
            
            if (shouldBeScrolled && !isScrolled) {
                universityNavbar.classList.add('transitioning');
                universityNavbar.classList.add('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    universityNavbar.classList.remove('transitioning');
                }, 600);
            } else if (!shouldBeScrolled && isScrolled) {
                universityNavbar.classList.add('transitioning');
                universityNavbar.classList.remove('scrolled');
                // Show indicator after transition completes
                setTimeout(() => {
                    universityNavbar.classList.remove('transitioning');
                }, 600);
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    function handleUniversityNavbarScroll() {
        if (!ticking) {
            requestAnimationFrame(updateUniversityNavbar);
            ticking = true;
        }
    }
    
    // Add scroll event listener for university navbar shrinking
    window.addEventListener('scroll', handleUniversityNavbarScroll, { passive: true });
    
    // Set initial navbar state
    universityNavbar.classList.add('transparent');
    
    // Initial check
    updateUniversityNavbar();
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const navbar = document.querySelector('.navbar');
    const sections = ['home', 'about', 'work', 'projects', 'university', 'publications', 'connect'];
    
    let currentSection = 'home';
    let isHovering = false;
    let hoveredLink = null;
    
    // Check if we're on a subpage
    const isSubpage = window.location.pathname !== '/' && window.location.pathname !== '/index.html';
    
    // Make function available globally
    window.forceIndicatorUpdate = forceIndicatorUpdate;
    
    // Set active navigation link for subpages
    if (isSubpage) {
        const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
        const activeLink = document.querySelector(`[href="index.html#${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Function to update active section based on scroll position (only for main page)
    function updateActiveSection() {
        if (isSubpage) return; // Don't update if on subpage (but allow during hovering)
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Use scroll position to determine active section
        let newSection = 'home';
        
        // Get section positions
        const homeSection = document.getElementById('home');
        const aboutSection = document.getElementById('about');
        const workSection = document.getElementById('work');
        const projectsSection = document.getElementById('projects');
        const universitySection = document.getElementById('university');
        const publicationsSection = document.getElementById('publications');
        const connectSection = document.getElementById('connect');
        
        // Calculate section boundaries
        const homeBottom = homeSection ? homeSection.offsetTop + homeSection.offsetHeight : 0;
        const aboutBottom = aboutSection ? aboutSection.offsetTop + aboutSection.offsetHeight : 0;
        const workBottom = workSection ? workSection.offsetTop + workSection.offsetHeight : 0;
        const projectsBottom = projectsSection ? projectsSection.offsetTop + projectsSection.offsetHeight : 0;
        const universityBottom = universitySection ? universitySection.offsetTop + universitySection.offsetHeight : 0;
        const publicationsBottom = publicationsSection ? publicationsSection.offsetTop + publicationsSection.offsetHeight : 0;
        
        // Determine active section based on scroll position
        // If at the very top of the page, always show "home" as active
        if (scrollY <= 50) {
            newSection = 'home';
        } else {
            // Check which section is currently in the viewport
            // Use a smaller threshold to make it more responsive
            const scrollThreshold = scrollY + (windowHeight * 0.3); // 30% down from top of viewport
            
            // Special case: if we're near the bottom of the page, always show connect
            const documentHeight = document.documentElement.scrollHeight;
            const bottomThreshold = documentHeight - windowHeight - 100; // 100px from bottom
            
            if (scrollY >= bottomThreshold) {
                newSection = 'connect';
            } else if (scrollThreshold < aboutSection.offsetTop) {
                newSection = 'home';
            } else if (scrollThreshold < workSection.offsetTop) {
                newSection = 'about';
            } else if (scrollThreshold < projectsSection.offsetTop) {
                newSection = 'work';
            } else if (scrollThreshold < universitySection.offsetTop) {
                newSection = 'projects';
            } else if (scrollThreshold < publicationsSection.offsetTop) {
                newSection = 'university';
            } else if (scrollThreshold < connectSection.offsetTop) {
                newSection = 'publications';
            } else {
                newSection = 'connect';
            }
        }
        
        // Debug logging
        console.log(`Scroll: ${scrollY}px, Section: ${newSection}, Previous: ${currentSection}`);
        
        if (newSection !== currentSection) {
            console.log(`Changing from ${currentSection} to ${newSection}`);
            currentSection = newSection;
            updateIndicator();
        }
    }
    
    // Function to update the indicator position
    function updateIndicator() {
        if (isSubpage) return; // Don't update indicator on subpages
        
        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        if (activeLink && !isHovering && navIndicator) {
            // Use offsetLeft for more reliable positioning relative to the container
            const leftPosition = activeLink.offsetLeft;
            const width = activeLink.offsetWidth;
            
            console.log(`Positioning indicator for ${currentSection}: left=${leftPosition}px, width=${width}px`);
            
            navIndicator.style.left = leftPosition + 'px';
            navIndicator.style.width = width + 'px';
            
            // Mark as positioned so it becomes visible
            navIndicator.classList.add('positioned');
        }
    }
    
    // Function to force indicator update without transition interference
    function forceIndicatorUpdate() {
        if (!isSubpage && navIndicator) {
            // Use a more efficient approach
            requestAnimationFrame(() => {
                updateIndicator();
            });
        }
    }
    
    // Add hover event listeners
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (isSubpage) return; // Don't handle hover effects on subpages
            
            isHovering = true;
            hoveredLink = this;
            
            // Show hover line
            this.classList.add('hover');
            
            // Hide the main indicator
            if (navIndicator) {
                navIndicator.style.width = '0';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (isSubpage) return; // Don't handle hover effects on subpages
            
            isHovering = false;
            hoveredLink = null;
            
            // Hide hover line
            this.classList.remove('hover');
            
            // Show the main indicator again
            updateIndicator();
        });
        
        // Add click event listeners
        link.addEventListener('click', function(e) {
            // For subpages, let the default behavior happen (navigation to main page with hash)
            if (isSubpage) {
                return;
            }
            
            // For main page, handle smooth scrolling
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                currentSection = targetId;
                
                // Update indicator after scroll
                setTimeout(() => {
                    updateIndicator();
                }, 100);
            }
        });
    });
    
    // Add scroll event listener (only for main page)
    if (!isSubpage) {
        console.log('JavaScript is running!'); // Simple test
        console.log('Current page:', window.location.pathname);
        
        // Set initial navbar state
        navbar.classList.add('transparent');
        
        // Separate scroll listener for section detection
        window.addEventListener('scroll', updateActiveSection);
        
        // Initial setup - let scroll detection determine the active section
        updateActiveSection();
        updateIndicator();
        
    }
    
    // Handle back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if there's a referrer and it's from the same domain
            if (document.referrer && document.referrer.includes(window.location.hostname)) {
                // Go back to the previous page
                window.history.back();
            } else {
                // Default to home page
                window.location.href = 'index.html';
            }
        });
    }

    // Experience card toggle functionality
    function toggleCard(header) {
        const card = header.parentElement;
        const content = card.querySelector('.card-content');
        const arrow = header.querySelector('.dropdown-arrow');
        
        // Toggle expanded state
        const isExpanded = content.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            content.classList.remove('expanded');
            header.classList.remove('expanded');
        } else {
            // Expand
            content.classList.add('expanded');
            header.classList.add('expanded');
        }
    }
});


