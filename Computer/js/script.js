let header__burger = document.querySelector('.header__burger');
header__burger.addEventListener("click", function (e) {
    let header__burger = document.querySelector('.header__burger');
    header__burger.classList.toggle('header__burger_active');
    let header__list = document.querySelector('.header__list');
    header__list.classList.toggle('header__list_active');
});

let header__list = document.querySelector('.header__list');
header__list.addEventListener("click", function (e) {
    let header__burger = document.querySelector('.header__burger');
    header__burger.classList.remove('header__burger_active');
    let header__list = document.querySelector('.header__list');
    header__list.classList.remove('header__list_active');
});
