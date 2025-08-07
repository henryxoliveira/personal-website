document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.createElement("button");
    toggleButton.innerText = "Toggle Dark Mode";
    toggleButton.style.position = "fixed";
    toggleButton.style.top = "10px";
    toggleButton.style.right = "10px";
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
    });
});

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    const indicator = document.getElementById('indicator');
    const sections = ['home', 'about', 'work', 'publications', 'connect'];
    
    // Function to update indicator position
    function updateIndicator() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        // Find which section is currently in view
        let currentSection = 'home';
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
                currentSection = sections[i];
                break;
            }
        }
        
        // Calculate indicator position (20% width per section)
        const sectionIndex = sections.indexOf(currentSection);
        const translateX = sectionIndex * 20;
        
        // Update indicator position
        indicator.style.transform = `translateX(${translateX}%)`;
        
        // Update active nav button
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[href="#${currentSection}"]`).classList.add('active');
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', updateIndicator);
    
    // Initial call to set correct position
    updateIndicator();
});

// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved preference, default to dark mode if no preference saved
    const lightMode = localStorage.getItem('lightMode');
    if (lightMode !== 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }
    
    // Toggle between dark and light mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');
        
        // Save preference (inverted logic - we save light mode preference)
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('lightMode', 'disabled');
        } else {
            localStorage.setItem('lightMode', 'enabled');
        }
    });
});
