///Cлайдер/////////////////////////////////////////////////////////
const homeSlider = document.querySelector('.home');
if (homeSlider) {
    const homeS = new Swiper('.home-swiper', {
        grabCursor: true,
        parallax: true,
        effect: "creative",
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        creativeEffect: {
            prev: {
                translate: ["-20%", 0, -150],
            },
            next: {
                translate: ["100%", -0, 150],
            },
        },
        speed: 1500,
        loop: true,
    });


    //Связь кнопок со слайдами
    document.querySelector('.first').addEventListener('click', function (e) {
        homeS.slideTo(1, 1500);
    });
    document.querySelector('.thoo').addEventListener('click', function (e) {
        homeS.slideTo(2, 1500);
    });
    document.querySelector('.third').addEventListener('click', function (e) {
        homeS.slideTo(3, 1500);
    });

    //Активный класс кнопок при смене слайда
    homeS.on('slideChange', function (swiper) {
        let activeIndex = swiper.realIndex
        let button = document.querySelectorAll('.home-swiper__item');

        button.forEach((item, index) => {
            if (index === activeIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active')
            }
        });
    });
}