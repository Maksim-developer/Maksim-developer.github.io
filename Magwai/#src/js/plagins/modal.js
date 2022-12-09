///////////////////Модалки////////////////////////
const btns = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const modalClose = document.querySelectorAll('.modal-close');
const body = document.querySelector('body');
let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        body.classList.add('modal-hide');
        body.style.paddingRight = paddingOffset;

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
        modalOverlay.classList.remove('modal-overlay--visible');
    });
});

modalOverlay.addEventListener('click', (e) => {

    if (e.target == modalOverlay) {
        body.style.paddingRight = 0;
        body.classList.remove('modal-hide');
        modalOverlay.classList.remove('modal-overlay--visible');
        modals.forEach((el) => {
            el.classList.remove('modal--visible');
        });
    }
});