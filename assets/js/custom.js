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
        init: function () {
            // Find video in the initially active visible slide and play it
            const activeVideo = this.el.querySelector('.swiper-slide-active video');
            if (activeVideo) {
                activeVideo.play().catch(err => console.log("Init play blocked:", err));
            }
        },
        slideChangeTransitionEnd: function () {
            // Stop all slider videos first to prevent ghost audio/background processes
            const allVideos = this.el.querySelectorAll('video');
            allVideos.forEach(video => video.pause());

            // Target ONLY the video in the active visible slide
            const activeVideo = this.el.querySelector('.swiper-slide-active video');
            if (activeVideo) {
                activeVideo.play().catch(err => {
                    console.log("Autoplay was prevented by Safari:", err);
                });
            }
        }
    }
});