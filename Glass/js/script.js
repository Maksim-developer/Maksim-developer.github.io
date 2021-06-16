/////////////////Меню///////////////////////////////////////////////
let header__burger = document.querySelector('.header__burger');
header__burger.addEventListener("click", function (e) {
    let header__burger = document.querySelector('.header__burger');
    header__burger.classList.toggle('header__burger_active');
    let header__mobile = document.querySelector('.header-mobile');
    header__mobile.classList.toggle('header-mobile_active');
});

let header_mobile = document.querySelector('.header-mobile');
header_mobile.addEventListener("click", function (e) {
    let header__burger = document.querySelector('.header__burger');
    header__burger.classList.remove('header__burger_active');
    let header__mobile = document.querySelector('.header-mobile');
    header__mobile.classList.remove('header-mobile_active');
});
///////////////////////////////////////////////////////////////////

///////////Спойлер/////////////////////////////////////////////
let down = document.querySelector('.text-spoiler__down');
down.addEventListener("click", function (e) {
    let text = document.querySelector('.text-spoiler__hidden');
    text.classList.toggle('text-spoiler__hidden_active');
    let down = document.querySelector('.text-spoiler__down');
    down.classList.toggle('text-spoiler__down_active');
});

let up = document.querySelector('.text-spoiler__up');
up.addEventListener("click", function (e) {
    let text = document.querySelector('.text-spoiler__hidden');
    text.classList.remove('text-spoiler__hidden_active');
    let up = document.querySelector('.text-spoiler__up');
    up.classList.remove('text-spoiler__up_active');
    let down = document.querySelector('.text-spoiler__down');
    down.classList.remove('text-spoiler__down_active');
    setScrollIntoView();
});

function setScrollIntoView() {
    const lessonSelected = document.querySelector('.text-spoiler__visible');
    lessonSelected.scrollIntoView();
}
///////////////////////////////////////////////////////////////////////

var swiper = new Swiper('.slider-container', {
    loop: true,
    navigation: {
        nextEl: '.slider__next',
        prevEl: '.slider__prev',
    },
});

