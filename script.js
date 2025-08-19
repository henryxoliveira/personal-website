// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
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
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Listen for storage changes (in case user opens multiple tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'darkMode') {
            applyDarkMode();
        }
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = ['home', 'about', 'work', 'publications', 'connect'];
    
    let currentSection = 'home';
    let isHovering = false;
    let hoveredLink = null;
    
    // Check if we're on a subpage
    const isSubpage = window.location.pathname !== '/' && window.location.pathname !== '/index.html';
    
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
        if (isHovering || isSubpage) return; // Don't update if hovering or on subpage
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        let bestSection = 'home';
        let bestScore = 0;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const score = visibleHeight / section.offsetHeight;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestSection = sectionId;
                }
            }
        });
        
        if (bestSection !== currentSection) {
            currentSection = bestSection;
            updateIndicator();
        }
    }
    
    // Function to update the indicator position
    function updateIndicator() {
        if (isSubpage) return; // Don't update indicator on subpages
        
        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        if (activeLink && !isHovering) {
            const linkRect = activeLink.getBoundingClientRect();
            const containerRect = document.querySelector('.nav-container').getBoundingClientRect();
            
            const leftPosition = linkRect.left - containerRect.left;
            const width = linkRect.width;
            
            if (navIndicator) {
                navIndicator.style.left = leftPosition + 'px';
                navIndicator.style.width = width + 'px';
            }
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
        window.addEventListener('scroll', updateActiveSection);
        
        // Initial setup
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
});


