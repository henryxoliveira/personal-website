// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved preference, default to light mode if no preference saved
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
    }
    
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
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = ['home', 'about', 'work', 'publications', 'connect'];
    
    let currentSection = 'home';
    let isHovering = false;
    let hoveredLink = null;
    
    // Function to update active section based on scroll position
    function updateActiveSection() {
        if (isHovering) return; // Don't update if hovering
        
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
        const activeLink = document.querySelector(`[data-section="${currentSection}"]`);
        if (activeLink && !isHovering) {
            const linkRect = activeLink.getBoundingClientRect();
            const containerRect = document.querySelector('.nav-container').getBoundingClientRect();
            
            const leftPosition = linkRect.left - containerRect.left;
            const width = linkRect.width;
            
            navIndicator.style.left = leftPosition + 'px';
            navIndicator.style.width = width + 'px';
        }
    }
    
    // Add hover event listeners
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            isHovering = true;
            hoveredLink = this;
            
            // Show hover line
            this.classList.add('hover');
            
            // Hide the main indicator
            navIndicator.style.width = '0';
        });
        
        link.addEventListener('mouseleave', function() {
            isHovering = false;
            hoveredLink = null;
            
            // Hide hover line
            this.classList.remove('hover');
            
            // Show the main indicator again
            updateIndicator();
        });
        
        // Add click event listeners
        link.addEventListener('click', function(e) {
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
    
    // Add scroll event listener
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial setup
    updateActiveSection();
    updateIndicator();
});


