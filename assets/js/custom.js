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
            // Target the upcoming active slide immediately as the transition starts
            // Swiper updates classes at the start of the slide transition
            setTimeout(() => {
                const activeSlide = this.el.querySelector('.swiper-slide-active');
                if (activeSlide) {
                    const video = activeSlide.querySelector('video');
                    if (video) {
                        // Reset video runtime back to 0 so it plays from the beginning on slide entry
                        video.currentTime = 0; 
                        var playPromise = video.play();
                        
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.log("Safari auto-play restriction intercepted: ", error);
                            });
                        }
                    }
                }
            }, 50); // Small 50ms macro-task delay ensures Swiper DOM manipulation has finished updating classes
        }
    }
});