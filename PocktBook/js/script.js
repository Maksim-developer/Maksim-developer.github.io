const swiper = new Swiper('.lineup-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: "1",
        },
        650: {
            slidesPerView: "2",
            centeredSlides: false,
        },
        1200: {
            slidesPerView: "auto",
        }
    },
    initialSlide: 2,
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    speed: 1200,
    loop: "true"
});


const longSwiper = new Swiper('.long-slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: "1",
        },
        520: {
            slidesPerView: "2",
            centeredSlides: false,
            spaceBetween: 10,
        },
        850: {
            slidesPerView: "3",
            centeredSlides: false,
            spaceBetween: 0,
        },
        1200: {
            slidesPerView: "auto",
        }
    },
    initialSlide: 5,
    slidesPerView: "auto",
    spaceBetween: 20,
    centeredSlides: true,
    speed: 1200,
    loop: "true"
});

///////////////////Аккордеон 1-3//////////////////////////
const oneAcrd = document.querySelector('.spoiler-1');
if (oneAcrd) {
    oneAcrd.addEventListener("click", function (e) {
        oneAcrd.classList.toggle("_active");
    });
}

const twoAcrd = document.querySelector('.spoiler-2');
if (twoAcrd) {
    twoAcrd.addEventListener("click", function (e) {
        twoAcrd.classList.toggle("_active");
    });
}

const threeAcrd = document.querySelector('.spoiler-3');
if (threeAcrd) {
    threeAcrd.addEventListener("click", function (e) {
        threeAcrd.classList.toggle("_active");
    });
}
//////////////////////////////////////////////////////////


///////////////////Урпавление бургером и асадом (открыть-закрыть)/////////////////
const headerBurger = document.querySelector('.header__burger');
if (headerBurger) {
    const menuAside = document.querySelector('.menu-aside');
    const body = document.querySelector('body');
    headerBurger.addEventListener("click", function (e) {
        headerBurger.classList.toggle("_active");
        menuAside.classList.toggle("_active");
        body.classList.toggle("_hidden");
    });
}

const asideClose = document.querySelector('.menu-aside__close');
if (asideClose) {
    const headerBurger = document.querySelector('.header__burger');
    const body = document.querySelector('body');
    const menuAside = document.querySelector('.menu-aside');
    asideClose.addEventListener("click", function (e) {
        body.classList.remove("_hidden");
        headerBurger.classList.remove("_active");
        menuAside.classList.remove("_active");
    });
}
//////////////////////////////////////////////////////////////////////

/////////////////Управление формой (открыть-закрыть)/////////////////////
const searchClose = document.querySelector('.search__close');
if (searchClose) {
    const search = document.querySelector('.search');
    searchClose.addEventListener("click", function (e) {
        searchClose.classList.toggle("_active");
        search.classList.toggle("_active");
    });
}

const searchButton = document.querySelector('.search__button');
if (searchButton) {
    const search = document.querySelector('.search');
    const searchClose = document.querySelector('.search__close');
    searchButton.addEventListener("click", function (e) {
        search.classList.add("_active");
        searchClose.classList.add("_active");
    });
}
//////////////////////////////////////////////////////////////////////////////


////////////////Скрол шапка////////////////////////////////////////////
const header = document.querySelector('.header-fix');
const first = document.querySelector('.description-descr');
const headerHeight = header.offsetHeight;
const firstHeight = first.offsetHeight;
let lastScrollTop = 1;

window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;

    if (scrollDistance >= firstHeight + headerHeight) {
        header.classList.add('_visible');
    } else {
        header.classList.remove('_visible');
    }

    lastScrollTop = scrollDistance;
});
//////////////////////////////////////////////////////////////////////