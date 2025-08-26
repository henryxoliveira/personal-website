// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
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
        darkModeToggle.addEventListener('click', function() {
            console.log('Dark mode toggle clicked!');
            body.classList.toggle('dark-mode');
            
            // Save preference
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
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

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = ['home', 'about', 'work', 'projects', 'publications', 'connect'];
    
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
        
        // Use scroll position to determine active section
        let newSection = 'home';
        
        // Get section positions
        const homeSection = document.getElementById('home');
        const aboutSection = document.getElementById('about');
        const workSection = document.getElementById('work');
        const projectsSection = document.getElementById('projects');
        const publicationsSection = document.getElementById('publications');
        const connectSection = document.getElementById('connect');
        
        // Calculate section boundaries
        const homeBottom = homeSection ? homeSection.offsetTop + homeSection.offsetHeight : 0;
        const aboutBottom = aboutSection ? aboutSection.offsetTop + aboutSection.offsetHeight : 0;
        const workBottom = workSection ? workSection.offsetTop + workSection.offsetHeight : 0;
        const projectsBottom = projectsSection ? projectsSection.offsetTop + projectsSection.offsetHeight : 0;
        const publicationsBottom = publicationsSection ? publicationsSection.offsetTop + publicationsSection.offsetHeight : 0;
        
        // Determine active section based on scroll position
        const scrollMiddle = scrollY + (windowHeight / 2);
        
        if (scrollMiddle < homeBottom) {
            newSection = 'home';
        } else if (scrollMiddle < aboutBottom) {
            newSection = 'about';
        } else if (scrollMiddle < workBottom) {
            newSection = 'work';
        } else if (scrollMiddle < projectsBottom) {
            newSection = 'projects';
        } else if (scrollMiddle < publicationsBottom) {
            newSection = 'publications';
        } else {
            newSection = 'connect';
        }
        
        if (newSection !== currentSection) {
            currentSection = newSection;
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
        console.log('JavaScript is running!'); // Simple test
        console.log('Current page:', window.location.pathname);
        
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


