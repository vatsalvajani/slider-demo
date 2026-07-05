var heroSwiper = new Swiper('.hero-slider', {
    loop: true,
    speed: 600,
    autoplay: true,
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
    // Add this event listener to handle video playback smoothly
    on: {
        slideChange: function () {
            // Find any video in the currently active slide and play it
            const activeSlide = this.slides[this.activeIndex];
            const video = activeSlide.querySelector('video');
            if (video) {
                video.play().catch(error => {
                    console.log("Autoplay was prevented by browser:", error);
                });
            }
        },
    },
});