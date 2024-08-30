document.addEventListener("DOMContentLoaded", function() {
    const viewDetailsButtons = document.querySelectorAll(".view-details");

    viewDetailsButtons.forEach(button => {
        button.addEventListener("click", toggleDetails);
        button.addEventListener("keydown", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleDetails.call(this);
            }
        });
    });

    function toggleDetails() {
        const fullDetails = this.nextElementSibling;
        const isExpanded = this.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            fullDetails.hidden = true;
            this.setAttribute("aria-expanded", "false");
            this.textContent = "View Details";
        } else {
            fullDetails.hidden = false;
            this.setAttribute("aria-expanded", "true");
            this.textContent = "Hide Details";
        }

        // Smooth scroll to the toggled content
        if (!isExpanded) {
            fullDetails.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    // Implement lazy loading for images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imgObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});