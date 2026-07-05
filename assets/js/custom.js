var heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    speed: 600,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    watchSlidesProgress: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0:   { navigation: { enabled: false } },
        576: { slidesPerView: 1 }
    },
    on: {
        init: function () {
            // Force play on init for the current active slide
            const activeSlide = this.el.querySelector('.swiper-slide-active');
            if (activeSlide) {
                const video = activeSlide.querySelector('video');
                if (video) video.play().catch(e => console.log('Init play deferred:', e));
            }
        },
        slideChangeTransitionStart: function () {
            const activeSlide = this.el.querySelector('.swiper-slide-active');
            if (activeSlide) {
                const video = activeSlide.querySelector('video');
                if (video) {
                    video.muted = true; // Hard re-enforce silence for Safari
                    
                    // Wait for Safari's CSS rendering engine to paint the slide completely
                    window.requestAnimationFrame(() => {
                        setTimeout(() => {
                            video.play().catch(err => {
                                console.log("CSS or Engine restriction caught:", err);
                            });
                        }, 100); // 100ms cushion allows custom.css animations to finish
                    });
                }
            }
        }
    }
});