let hamburger = document.querySelector('.hamburger');
hamburger.addEventListener("click", function (e) {
    let screen__menu = document.querySelector('.screen__menu');
    let user_menu = document.querySelector('.hamburger');
    screen__menu.classList.toggle('screen__menu_active');
    user_menu.classList.toggle('hamburger_active');
});
//user_icon название объекта к которому помжно обратится
//(.user-header__menu) говорим с кем нам нужно чтото сделать (название класса)
//user_menu.classList.toggle('_active'); присваприсвоить класс актив
//на клас _active в стилях добавляем opacity и visibility: visible (до этого меню скрыто при помощи прозрачности и visability hidden)
// для контента скрытого в бургере нужно добавдять overloft: auto для скрола
document.documentElement.addEventListener("click", function (e) {
    if (!e.target.closest('.hamburger')) {
        let user_menu = document.querySelector('.hamburger');
        let screen__menu = document.querySelector('.screen__menu');
        user_menu.classList.remove('hamburger_active');
        screen__menu.classList.remove('screen__menu_active');
    }
});
//document.documentElement.addEventListener("click", function (e)клик на любую облсть всего документа
//if (!e.target.closest('.user-header')) проверяю нет ли родителя у этого элемента с таким классом
//let user_menu = document.querySelector('.user-header__menu'); если нет обращаюсь к user-header__menu и отбираем у него класс _active (последння строка кода)
