//////Открытие меню, бургера + фикс//////////////////////////
const header = document.querySelector('.header');
if (header) {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__wrapper');
    const body = document.querySelector('body');
    burger.addEventListener('click', function () {
        burger.classList.toggle('--active');
        nav.classList.toggle('--visible');
        body.classList.toggle('--hiden');
    });
}

//////Открытие меню, бургера + фикс//////////////////////////
const navDrow = document.querySelectorAll('.nav-drop');
if (navDrow) {
    navDrow.forEach(element => {
        element.addEventListener('click', function (e) {
            element.classList.toggle('--active');
        });
    });
}

////////Клик по кнопкам шапка Start////////////////////////
const seviceslist = document.querySelectorAll('.personal__item');
if (seviceslist) {
    function activeList() {
        seviceslist.forEach((item) =>
            item.classList.remove('--active')
        );
        this.classList.add('--active');
    }
    seviceslist.forEach((item) =>
        item.addEventListener('click', activeList)
    );
}

////////Анимация Start/////////////////////////
gsap.registerPlugin(ScrollTrigger);
const mask = document.querySelector(".mask");
if (mask) {
    const maskItem = document.querySelectorAll(".mask__item");

    maskItem.forEach(element => {
        const progressTo = gsap.quickTo("progress", { ease: "power3", duration: parseFloat(element.dataset.scrub) || 0.5 });

        gsap.to(element, {
            y: "-160%",
            ease: "none",
            duration: 5,
            scrollTrigger: {
                scrub: true,
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                onUpdate: self => progressTo(self.progress)
            }
        });
    });
}

////////Модальные окна Start/////////////////////////
const btns = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelectorAll('.modal-close');
const body = document.querySelector('body');
const homeBg = document.querySelector('.home__bg');
let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        body.classList.add('modal-hide');
        body.style.paddingRight = paddingOffset;
        header.style.paddingRight = paddingOffset;
        homeBg.style.paddingRight = paddingOffset;

        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
        modalOverlay.classList.add('modal-overlay--visible');
    });
});
modalClose.forEach((el) => {
    el.addEventListener('click', (e) => {
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });
        body.classList.remove('modal-hide');
        body.style.paddingRight = 0;
        header.style.paddingRight = 0;
        homeBg.style.paddingRight = 0;
        modalOverlay.classList.remove('modal-overlay--visible');
    });
});
modalOverlay.addEventListener('click', (e) => {
    if (e.target == modalOverlay) {
        body.style.paddingRight = 0;
        header.style.paddingRight = 0;
        homeBg.style.paddingRight = 0;
        body.classList.remove('modal-hide');
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });
    }
});

////////Валидация + Маска Start/////////////////////////
const eventCalllback = function (e) {
    let el = e.target,
        clearVal = el.dataset.phoneClear,
        pattern = el.dataset.phonePattern,
        matrix_def = "+7 ( _ _ _ ) ___ - __ - __",
        matrix = pattern ? pattern : matrix_def,
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
}
const phone_inputs = document.querySelectorAll('.tel');
for (let elem of phone_inputs) {
    for (let ev of ['input', 'blur', 'focus']) {
        elem.addEventListener(ev, eventCalllback);
    }
}
const validation = new JustValidate('.form-suggest');
validation
    .addField('.input-name', [
        {
            rule: 'minLength',
            value: 1,
        },
        {
            rule: 'maxLength',
            value: 30,
        },
        {
            rule: 'required',
            value: true,
            errorMessage: 'Введите имя'
        }
    ])
    .addField('.input-tel', [
        {
            rule: 'required',
            value: true,
            errorMessage: 'Телефон обязателен',
        },
    ]).onSuccess((event) => {
        let formData = new FormData(event.target);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const submit = document.querySelector('.question__submit');
                    function comlite(params) {
                        submit.classList.add('active');
                    }
                    const removeComplite = setInterval(function () {
                        submit.classList.remove('active');
                    }, 2000)

                    comlite();
                    console.log('Отправлено');
                }
            }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        event.target.reset();
    });

const validationModal = new JustValidate('.form-modal');
validationModal
    .addField('.modal-name', [
        {
            rule: 'minLength',
            value: 1,
        },
        {
            rule: 'maxLength',
            value: 30,
        },
        {
            rule: 'required',
            value: true,
            errorMessage: 'Введите имя'
        }
    ])
    .addField('.modal-mail', [
        {
            rule: 'required',
            value: true,
            errorMessage: 'Email обязателен',
        },
        {
            rule: 'email',
            value: true,
            errorMessage: 'Введите корректный Email',
        },
    ])
    .addField('.modal-tel', [
        {
            rule: 'required',
            value: true,
            errorMessage: 'Телефон обязателен',
        },
    ]).onSuccess((event) => {
        let formData = new FormData(event.target);
        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('Отправлено');
                    body.style.paddingRight = 0;
                    header.style.paddingRight = 0;
                    homeBg.style.paddingRight = 0;
                    body.classList.remove('modal-hide');
                    modalOverlay.classList.remove('modal-overlay--visible');
                    modals.forEach((el) => {
                        el.classList.remove('modal--visible');
                    });
                }
            }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        event.target.reset();
    });

