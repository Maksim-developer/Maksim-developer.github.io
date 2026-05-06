"use strict";
const messenger = document.querySelector('.messenger');
if (messenger) {
    const activeItem = (e) => {
        const target = e.target;
        if (target.closest('.nav-messenger__item')) {
            e.preventDefault();
            const item = target.closest('.nav-messenger__item');
            const active = messenger.querySelector('.nav-messenger__item.--active');
            if (active) {
                active.classList.remove('--active');
            }
            item.classList.add('--active');
        }
    };
    messenger.addEventListener('click', (event) => {
        activeItem(event);
    });
}
