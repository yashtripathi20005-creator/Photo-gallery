document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    let currentIndex = 0;
    let images = [];

    // Build array of image URLs from gallery
    triggers.forEach((trigger, index) => {
        const imgUrl = trigger.getAttribute('data-image');
        images.push(imgUrl);
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = index;
            openLightbox(imgUrl);
        });
    });

    // Open lightbox
    function openLightbox(src) {
        lightboxImg.src = src;
        caption.textContent = src.split('/').pop();
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // Navigate
    function showImage(index) {
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        lightboxImg.src = images[currentIndex];
        caption.textContent = images[currentIndex].split('/').pop();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
    });

    // Swipe support (touch)
    let touchStartX = 0;
    let touchEndX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) showImage(currentIndex + 1);
            else showImage(currentIndex - 1);
        }
    });
});
