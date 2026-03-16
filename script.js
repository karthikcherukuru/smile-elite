document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Testimonial Slider Logic (With Auto-Scroll) ---
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        let slideInterval;

        function updateSlider(index) {
            if (!track) return;
            // Move track horizontally
            track.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active classes for styling
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextSlide() {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlider(currentIndex);
        }

        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 3000); // 3 seconds
        }

        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        // Manual Controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoSlide(); // Reset timer on manual interaction
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
                updateSlider(currentIndex);
                resetAutoSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider(currentIndex);
                resetAutoSlide();
            });
        });

        // Start the automated scroll when page loads
        startAutoSlide();
    }


    // --- 2. FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Find the parent item
            const faqItem = question.parentElement;
            
            // Toggle the 'active' class on the clicked item
            faqItem.classList.toggle('active');

            // Find the answer container
            const answer = question.nextElementSibling;

            // Apply smooth max-height transition
            if (faqItem.classList.contains('active')) {
                // Open it
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Close it
                answer.style.maxHeight = null;
            }
        });
    });


    // --- 3. Floating Button Scroll Logic (MOBILE ONLY) ---
    const floatingBtn = document.getElementById('floating-book');
    const testimonialsSection = document.getElementById('testimonials');

    if (floatingBtn && testimonialsSection) {
        // Run check on scroll
        window.addEventListener('scroll', () => {
            // Only execute logic on mobile screens
            if (window.innerWidth > 768) return;

            // Get the current vertical scroll position
            const scrollY = window.scrollY;
            
            // Calculate the bottom position of the testimonials section relative to the document top
            const testimonialsRect = testimonialsSection.getBoundingClientRect();
            const testimonialsBottom = testimonialsRect.bottom + scrollY;

            // Define point at which to disappear (e.g., bottom of testimonial section)
            // Small offset added so it disappears just before hitting the bento gallery
            const disappearPoint = testimonialsBottom - 100;

            if (scrollY > disappearPoint) {
                floatingBtn.classList.add('hidden');
            } else {
                floatingBtn.classList.remove('hidden');
            }
        });
    }

});