///Cлайдер/////////////////////////////////////////////////////////
const homeSlider = document.querySelector('.home__slider');
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
                translate: ["-20%", 0, -1],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        pagination: {
            el: ".home-swiper__progress",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".home-swiper__next",
            prevEl: ".home-swiper__prev",
        },
        speed: 1500,
        breakpoints: {
            320: {
            },
            780: {

            },
        },
    });

    //Переключение классоы при смене сладов
    document.querySelector('.first').addEventListener('click', function (e) {
        homeS.slideTo(1, 1500);
    });

    document.querySelector('.thoo').addEventListener('click', function (e) {
        homeS.slideTo(2, 1500);
    });

    document.querySelector('.third').addEventListener('click', function (e) {
        homeS.slideTo(3, 1500);
    });


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

    let mySliderAllSlides = document.querySelector('.home-swiper__total');
    if (mySliderAllSlides) {
        let mySliderCurrentSlide = document.querySelector('.home-swiper__current');
        let homeActive = document.querySelector('.home');
        mySliderAllSlides.innerHTML = '0' + homeS.slides.length;
        homeS.on('slideChange', function () {
            let currentSlide = ++homeS.realIndex;
            mySliderCurrentSlide.innerHTML = '0' + currentSlide;
            homeActive.classList.toggle("active");
        });
    }
    //////Пример с зацкленным слайдом + пагинация + кастомный прогресс бар
    //let homeTotal = document.querySelector('.home-swiper__total');
    //if (homeTotal) {
    //
    //    let homeCurent = document.querySelector('.home-swiper__current');
    //    //Пример с зацкленным слайдом
    //    const mySlides = document.querySelectorAll('.home-swiper__slide.swiper-slide-duplicate');
    //    let dublSlide = mySlides.length;
    //    homeTotal.innerHTML += "0" + homeS.slides.length - dublSlide;
    //
    //    //прогресс бар
    //    let ff = document.querySelector('.f');
    //    let tt = homeS.slides.length;
    //    ff.style.width = tt + 20 + '%';
    //
    //    homeS.on('slideChange', function () {
    //        let currentSlide = ++homeS.realIndex;
    //        homeCurent.innerHTML = '0' + currentSlide;
    //
    //        //прогресс бар
    //        let gg = ++homeS.realIndex * 20;
    //        ff.style.width = gg + '%';
    //    });
    //}
}

/////Cлайдер с видео закрыть при слайде/////////////////////////////////////////////////////////
//mainS.on('slideChange', function () {
//    const videos = document.querySelectorAll('.video');
//    if (videos) {
//        videos.forEach((el) => {
//            var iframes = el.querySelectorAll('iframe');
//            for (var i = 0; i < iframes.length; i++) {
//                iframes[i].parentNode.removeChild(iframes[i]);
//            }
//            el.querySelector('img').style.display = "block";
//            el.querySelector('button').style.display = "block";
//        });
//    }
//});

const services = document.querySelector('.services');
if (services) {
    const servicesContainer = document.querySelector('.services__container');
    const servicesS = new Swiper('.services-swiper', {
        grabCursor: true,
        parallax: true,
        effect: "coverflow",
        loop: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 1,
            depth: 100,
            modifier: -3,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.services-swiper__next',
            prevEl: '.services-swiper__prev',
        },
        pagination: {
            el: ".services-swiper__pagination",
            clickable: true,
        },
        speed: 1400,
    });
    servicesS.on('slideChange', function () {
        servicesContainer.classList.toggle("active");
    });
}

//const myCustomSlider = document.querySelectorAll('.project-swiper');
//if (myCustomSlider) {
//    for (i = 0; i < myCustomSlider.length; i++) {
//        myCustomSlider[i].classList.add('project-swiper-' + i);
//        var slider = new Swiper('.project-swiper-' + i, {
//            spaceBetween: 6,
//            loop: true,
//            observer: true,
//            observeParents: true,
//            speed: 1000,
//            navigation: {
//                nextEl: '.project-swiper__next',
//                prevEl: '.project-swiper__prev',
//            },
//            breakpoints: {
//                0: {
//                    slidesPerView: 1,
//                },
//                400: {
//                    slidesPerView: 1.4,
//                },
//                580: {
//                    slidesPerView: 2,
//                },
//                751: {
//                    slidesPerView: 2.5,
//                },
//                951: {
//                    slidesPerView: 3.3,
//                },
//                1251: {
//                    slidesPerView: 4,
//                },
//                1421: {
//                    slidesPerView: 5,
//                },
//            },
//        });
//    }
//}
//

const mainTabs = document.querySelectorAll('.tabs');
if (mainTabs) {

    const tabsSliders = document.querySelectorAll('.tabs__pane');
    tabsSliders.forEach(tabs => {
        const slidersPrev = tabs.querySelector('.sliders-arrow__prev');
        const slidersNext = tabs.querySelector('.sliders-arrow__next');
        const slidersPagination = tabs.querySelector('.tabs__pagination');

        const myCustomSlider = tabs.querySelectorAll('.tabs__slider');
        myCustomSlider.forEach(element => {
            const sliders = new Swiper(element, {
                speed: 1400,
                loop: true,
                observer: true,
                observeParents: true,
                observeSliderChildren: true,
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    501: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    751: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    951: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1051: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                    1251: {
                        slidesPerView: 4,
                        spaceBetween: 65,
                    },
                },
                contoller: {
                    control: element,
                },
                navigation: {
                    nextEl: slidersNext,
                    prevEl: slidersPrev,
                },
                pagination: {
                    el: slidersPagination,
                    type: 'bullets',
                    clickable: true,
                },

            });

            const tabsButton = document.querySelectorAll('.tabs__btn');
            tabsButton.forEach(item => {
                item.addEventListener('click', e => {
                    sliders.update();
                    sliders.thumbs.update();
                    sliders.navigation.update();
                });
            });
        });
    });
}