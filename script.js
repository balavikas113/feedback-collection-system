document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        const messageField = document.getElementById('message');
        
        if (!messageField.value.trim()) {
            event.preventDefault();
            alert('Please enter your feedback message');
            messageField.focus();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
