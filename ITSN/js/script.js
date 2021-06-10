let drops = document.querySelector('.drops');
drops.addEventListener("click", function (e) {
    let submenu = document.querySelector('.submenu');
    submenu.classList.toggle('submenu__active');
    let drops__nav = document.querySelector('.drops__nav');
    drops__nav.classList.toggle('drops__nav_active');
});

let nav_2 = document.querySelector('.nav_2');
nav_2.addEventListener("click", function (e) {
    let drop = document.querySelector('.drop');
    drop.classList.toggle('drop__active');
    let nav_2 = document.querySelector('.nav_2');
    nav_2.classList.toggle('nav_2_active');
});

let header__burger = document.querySelector('.header__burger');
header__burger.addEventListener("click", function (e) {
    let header__burger = document.querySelector('.header__burger');
    header__burger.classList.toggle('header__burger_active');
    let menu__header = document.querySelector('.menu__header');
    menu__header.classList.toggle('menu__header_active');
    let body = document.querySelector('body');
    body.classList.toggle('body__scrool');
});

let fixed__burger = document.querySelector('.fixed__burger');
fixed__burger.addEventListener("click", function (e) {
    let fixed__burger = document.querySelector('.fixed__burger');
    fixed__burger.classList.toggle('fixed__burger_active');
    let menu__header = document.querySelector('.menu__header');
    menu__header.classList.toggle('menu__header_active');
    let body = document.querySelector('body');
    body.classList.toggle('body__scrool');
});

document.documentElement.addEventListener("click", function (e) {
    if (!e.target.closest('.drops')) {
        let submenu = document.querySelector('.submenu');
        submenu.classList.remove('submenu__active');
        let drops__nav = document.querySelector('.drops__nav');
        drops__nav.classList.remove('drops__nav_active');
    };
    if (!e.target.closest('.drops_2')) {
        let drop = document.querySelector('.drop');
        drop.classList.remove('drop__active');
        let nav_2 = document.querySelector('.nav_2');
        nav_2.classList.remove('nav_2_active');
    };

    if (!e.target.closest('.header__burger')) {
        let header__burger = document.querySelector('.header__burger');
        header__burger.classList.remove('header__burger_active');
    };
    if (!e.target.closest('.fixed__burger')) {
        let fixed__burger = document.querySelector('.fixed__burger');
        fixed__burger.classList.remove('fixed__burger_active');
    };/////////////////////////////////////////////////////////////
    if (!e.target.closest('.hamburger')) {
        let hamburger = document.querySelector('.hamburger');
        hamburger.classList.remove('hamburger_active');
        let header__menu2 = document.querySelector('.header__menu2');
        header__menu2.classList.remove('header__menu2_active');
    };
});

///////////////////////////////////////////////////////////////////
window.onload = function () {
    let audit = document.querySelector('.audit');
    audit.addEventListener("click", function (e) {
        let audit = document.querySelector('.modals__audit');
        audit.classList.add('modals__active');
    });
    let application = document.querySelector('.application');
    application.addEventListener("click", function (e) {
        let application = document.querySelector('.modals__application');
        application.classList.add('modals__active');
    });
    let meeting = document.querySelector('.meeting');
    meeting.addEventListener("click", function (e) {
        let meeting = document.querySelector('.modals__meeting');
        meeting.classList.add('modals__active');
    });



    let audit__burger = document.querySelector('.audit__burger');
    audit__burger.addEventListener("click", function (e) {
        let audit = document.querySelector('.modals__audit');
        audit.classList.remove('modals__active');
    });
    let audit__button = document.querySelector('.audit__button');
    audit__button.addEventListener("click", function (e) {
        let audit = document.querySelector('.modals__audit');
        audit.classList.remove('modals__active');
    });
    let audit__fon = document.querySelector('.audit__fon');
    audit__fon.addEventListener("click", function (e) {
        let audit = document.querySelector('.modals__audit');
        audit.classList.remove('modals__active');
    });


    let application__burger = document.querySelector('.application__burger');
    application__burger.addEventListener("click", function (e) {
        let application = document.querySelector('.modals__application');
        application.classList.remove('modals__active');
    });
    let application__button = document.querySelector('.application__button');
    application__button.addEventListener("click", function (e) {
        let application = document.querySelector('.modals__application');
        application.classList.remove('modals__active');
    });
    let application__fon = document.querySelector('.application__fon');
    application__fon.addEventListener("click", function (e) {
        let application = document.querySelector('.modals__application');
        application.classList.remove('modals__active');
    });


    let meeting__burger = document.querySelector('.meeting__burger');
    meeting__burger.addEventListener("click", function (e) {
        let meeting = document.querySelector('.modals__meeting');
        meeting.classList.remove('modals__active');
    });
    let meeting__button = document.querySelector('.meeting__button');
    meeting__button.addEventListener("click", function (e) {
        let meeting = document.querySelector('.modals__meeting');
        meeting.classList.remove('modals__active');
    });
    let meeting__fon = document.querySelector('.meeting__fon');
    meeting__fon.addEventListener("click", function (e) {
        let meeting = document.querySelector('.modals__meeting');
        meeting.classList.remove('modals__active');
    });
}

/////////////////////////////////////////////////////
let hamburger = document.querySelector('.hamburger');
hamburger.addEventListener("click", function (e) {
    let hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('hamburger_active');
    let header__menu2 = document.querySelector('.header__menu2');
    header__menu2.classList.toggle('header__menu2_active');

});

let menu__header = document.querySelector('.menu__header');
menu__header.addEventListener("click", function (e) {
    let menu__header = document.querySelector('.menu__header');
    menu__header.classList.remove('menu__header_active');
    let body = document.querySelector('body');
    body.classList.remove('body__scrool');
});




//Появление элемента при скролее (+ стили в css)///////////////////////////////////////////////////////////////////////
window.addEventListener('DOMContentLoaded', function () {
    const scrollUpButton = document.querySelector('.header__fixed');
    const scrollUpButton2 = document.querySelector('.fixed');
    if (scrollUpButton, scrollUpButton2) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (scrolled >= 40) {
                scrollUpButton.classList.add('header__fixed__visible');
                scrollUpButton2.classList.add('fixed__visible');
            } else {
                scrollUpButton.classList.remove('header__fixed__visible');
                scrollUpButton2.classList.remove('fixed__visible');
            }
        });
    }
});
/*click_iks = document.querySelector('.drops__nav_link');
theid = document.querySelector('.submenu');
click_iks.onclick = function () {
    if (theid.classList.contains('submenu_hide')) {
        theid.classList.remove('submenu_hide');
        theid.classList.add('submenu_show');
    }
    else {
        theid.classList.add('submenu_hide');
        theid.classList.remove('submenu_show');
    }
}
*/
var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    initialSlide: 1,
    speed: 1200,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    breakpoints: {
        320: {
            direction: 'horizontal',
        },
        650: {
            direction: 'vertical',
        }
    },
});

var menu = ['<div class="bullet-animated bullet-animated-1"></div><p class="slider-pagination-num">1</p><p class="slider-pagination-text">Обсудить ключевые задачи вашего проекта</p>', '<div class="bullet-animated bullet-animated-2"></div><p class="slider-pagination-num">2</p><p class="slider-pagination-text">Встретиться с командой наших специалистов</p>', '<div class="bullet-animated bullet-animated-3"></div><p class="slider-pagination-num">3</p><p class="slider-pagination-text">Провести комплексный аудит на месте</p>'];
var swiper = new Swiper('.slider__container', {
    pagination: {
        el: '.slider-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (menu[index]) + '</span>';
        },
        //renderBullet: function (index, className) {
        //return '<span class="' + className + '">' + (index + 1) + '</span>';
        //},
    },
    navigation: {
        nextEl: '.slider__button-next',
        prevEl: '.slider__button-prev',
    },
    initialSlide: 1,
    speed: 800,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

var swiper = new Swiper('.compani__container', {
    navigation: {
        nextEl: '.compani__button-next',
        prevEl: '.compani__button-prev',
    },
    initialSlide: 1,
    speed: 800,
});

var swiper = new Swiper('.examples__container', {
    spaceBetween: 30,
    slidesPerView: 1,
    pagination: {
        el: '.examples__pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.examples__buttons-next',
        prevEl: '.examples__buttons-prev',
    },
    initialSlide: 0,
    speed: 800,
});