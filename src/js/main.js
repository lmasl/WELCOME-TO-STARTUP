$(document).ready(function () { 
    $(".about__slider").slick({ 
        autoplay: true,
        autoplaySpeed: 2000,
        dots: false,
        lazyLoad: "ondemand", 
        speed: 1e3, 
        arrows: true, 
        slidesToShow: 4, 
        slidesToScroll: 1, 
        fade: !1, 
        infinite: !0,
        responsive: [
            {
              breakpoint: 576,
              settings: "unslick"
            }
        ]
    });
});

$(window).resize(function () {
    $('.about__slider').not('.slick-initialized').slick('resize');
});

$(window).on('orientationchange', function () {
    $('.about__slider').not('.slick-initialized').slick('resize');
});