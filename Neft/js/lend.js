const optionLS = document.querySelector('.lending-garanty__slider');
if (optionLS) {
    var optionLendSlider = new Swiper(".lending-garanty__slider ", {
        navigation: {
            nextEl: ".lending-garanty__arrow-next",
            prevEl: ".lending-garanty__arrow-prev",
        },
        loop: "true",
        spaceBetween: 20,
        speed: 2000,
        slidesPerView: 1,
        breakpoints: {
            320: {
                slidesPerView: 1.7,
            },
            350: {
                slidesPerView: 2.5,
            },
            451: {
                slidesPerView: 2.8,
            },
            551: {
                slidesPerView: 3.85,
            },
            851: {
                slidesPerView: 2.3,
            },
            951: {
                slidesPerView: 1,
            },
        },
    });
}

const lendingQvize = document.querySelector('.lending__payment');
if (lendingQvize) {
    const stepsOne = document.querySelector('.payment-lending__choice');
    const stepsThoo = document.querySelector('.payment-lending__outcome');
    const calculatorButton = document.querySelector('.payment-lending__button');
    const rezultSubmit = document.querySelector('.outcome__button');

    calculatorButton.addEventListener('click', function (e) {
        stepsOne.classList.add('hide');
        stepsThoo.classList.add('visible');
    });
    rezultSubmit.addEventListener('click', function (e) {
        stepsOne.classList.remove('hide');
        stepsThoo.classList.remove('visible');
    });
}