window.onload = function () {
    ///////////////////Карты/////////////
    function inits() {
        let map = new ymaps.Map('map', {
            center: [55.11753006959305, 36.61670549999997],
            zoom: 16
        });

        var Placemark = new ymaps.Placemark([55.11753006959305, 36.61670549999997]);
        map.geoObjects.add(Placemark);

        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }

    function init() {
        let map = new ymaps.Map('gim-map', {
            center: [55.11753006959305, 36.61670549999997],
            zoom: 16
        });

        var Placemark = new ymaps.Placemark([55.11753006959305, 36.61670549999997]);
        map.geoObjects.add(Placemark);

        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    }
    ymaps.ready(init);
    ymaps.ready(inits);

    ///////////////////Слайдер/////////////
    var swiper = new Swiper('.slider-screen__container', {
        spaceBetween: 0,
        navigation: {
            nextEl: '.slider-screen__next>.slider-screen__arrow-box ',
            prevEl: '.slider-screen__prev>.slider-screen__arrow-box ',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            750: {
                slidesPerView: 1.46,
            }
        },
        centeredSlides: true,
        initialSlide: 1,
        speed: 2000,
        loop: "true",
    });

    ///////////////////Табы/////////////
    const filterBox = document.querySelectorAll('.tabs__box');
    document.querySelector('.tabs__nav').addEventListener('click', (event) => {

        if (event.target.tagName !== 'LI') return false;
        let filterClass = event.target.dataset['f'];

        filterBox.forEach(elem => {
            if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
                elem.classList.add('anime');
            } else {
                elem.classList.remove('anime');
                elem.classList.remove('hide');
            }
        });

        filterBox.forEach((elem) => {
            elem.ontransitionend = function () {
                if (elem.classList.contains('anime')) {
                    elem.classList.add('hide');
                }
            }
        });
    });
    const tabsBtn = document.querySelectorAll('.tabs__list');
    tabsBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            tabsBtn.forEach(el => {
                el.classList.remove('tabs__list-active');
            });
            item.classList.add('tabs__list-active');
        });
    });

    ///////////////////Зум/////////////
    new ImageZoom(document.getElementById("tabs-images"), {
        "offset": { "vertical": -150, "horizontal": 300 },
        "height": 400,
        "width": 800,
        "zoomWidth": 432,
        "scale": 0.1,
        "zoomStyle": 'width: 300px; height: 300px;',
        "zoomPosition": "top"
    });


    ///////////////////Кнопка/////////////
    const fixedBlock = document.querySelector('.gim-booking'),
        gim = document.querySelector('.gim'),
        buuttonOffsetTop = gim.offsetTop,
    //smallOffset = 300;

    const fixedScrollBlock = () => {
        let scrollDistance = pageYOffset;

        if (scrollDistance > (buuttonOffsetTop) && scrollDistance <= (gim.offsetHeight + buuttonOffsetTop)) {
            fixedBlock.classList.add('fixed');
        } else {
            fixedBlock.classList.remove('fixed');
        }
    }
    window.addEventListener('scroll', fixedScrollBlock);

    ////////Меню////////////
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".header__nav");
    if (burger) {
        burger.addEventListener("click", function (e) {
            document.body.classList.toggle("lock");
            burger.classList.toggle("active");
            menu.classList.toggle("active");
        })
    }

    ///////////////////Якоря/////////////
    const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
    const header = document.querySelector(".header");
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

                if (burger.classList.contains("active")) {
                    document.body.classList.remove("lock");
                    burger.classList.remove("active");
                    menu.classList.remove("active");
                }

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }


    ///////////////////////Спойлер////////////

    const spoliler = document.querySelector(".spoiler__box");
    const spolierClose = document.querySelector(".spoiler__button");
    if (spoliler) {
        spolierClose.addEventListener("click", function (e) {
            spoliler.classList.toggle("visible");
            spolierClose.classList.toggle("active");
        })
    }

    ///////////////////Модалки/////////////
    class Modal {
        constructor(options) {
            let defaultOptions = {
                isOpen: () => { },
                isClose: () => { },
            }
            this.options = Object.assign(defaultOptions, options);
            this.modal = document.querySelector('.modal');//Находим родителя модалок
            this.speed = false; //Время открытия окна
            this.animation = false;//Анимация по умолчанию false
            this.isOpen = false;//Открыто либо не открытое окно
            this.modalContainer = false;//Само модальное окно по умолчанию fuls закрыто 
            this.previousActiveElement = false;//Выделяется элемент 
            this.fixBlocks = document.querySelectorAll('.fix-block');//Находим элемент который абсолютный и в дальнейшем убираем прыжок при открытии
            this.focusElements = [//Возможные фокусируемые элеинты
                'a[href]',
                'input',
                'button',
                'select',
                'options',
                'textarea',
                '[tabindex]'//итд
            ];
            this.events();
        }

        events() {//Все события тут
            if (this.modal) {//Проверка на наличие элемнта
                document.addEventListener('click', function (e) {
                    const clickedElement = e.target.closest('[data-path]');//Находим элемент который нужно кликнуть
                    if (clickedElement) {
                        let target = clickedElement.dataset.path;
                        let animation = clickedElement.dataset.animation;
                        let speed = clickedElement.dataset.speed;
                        this.animation = animation ? animation : 'fade';//Значение анимации по дату атрибуду в html, если его нет то по умолчанию анимация fale
                        this.speed = speed ? parseInt(speed) : 300;//Также как и с анимацией по умолчанию 300
                        this.modalContainer = document.querySelector(`[data-target="${target}"]`);//В модальное окно помещаем элемент который должен открыватся
                        this.open();//Когда находим вызываем
                        return;
                    }

                    if (e.target.closest('.modal-close')) {//Если кликаем сюда
                        this.close();//то происходит закрытие
                        return;
                    }
                }.bind(this));

                window.addEventListener('keydown', function (e) {
                    if (e.keyCode == 27) {
                        if (this.isOpen) {
                            this.close();
                        }
                    }

                    if (e.keyCode == 9 && this.isOpen) {
                        this.focusCatch(e);
                        return;
                    }

                }.bind(this));

                this.modal.addEventListener('click', function (e) {
                    if (!e.target.classList.contains('modal__container') && !e.target.closest('.modal__container') && this.isOpen) {
                        this.close();
                    }
                }.bind(this));
            }
        }

        open() {//Метод открытия
            this.previousActiveElement = document.activeElement;

            this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);//Меняем время открытия окна в стилях заданна перемнная у элемнта modal - --transition-time (IE не поддерживает данный метод)
            this.modal.classList.add('is-open');//Добавляем класс для открытия окна
            this.disableScroll();//При открытии выключаем скрол

            this.modalContainer.classList.add('modal-open');//Добавляем класс для открытия окна
            this.modalContainer.classList.add(this.animation);// и анимауию 

            setTimeout(() => {//Таймаут после перхода окна с diplaq none на inline-block
                this.options.isOpen(this);
                this.modalContainer.classList.add('animate-open');//Так же запуска анимацию окна
                this.isOpen = true;
                this.focusTrap();
            }, this.speed);//Время задержки
        }

        close() {//Метод закрытия
            if (this.modalContainer) {
                this.modalContainer.classList.remove('animate-open');
                this.modalContainer.classList.remove(this.animation);
                this.modal.classList.remove('is-open');
                this.modalContainer.classList.remove('modal-open');

                this.enableScroll();
                this.options.isClose(this);
                this.isOpen = false;
                this.focusTrap();
            }
        }

        focusCatch(e) {//Упарвление фокусом
            const focusable = this.modalContainer.querySelectorAll(this.focusElements);
            const focusArray = Array.prototype.slice.call(focusable);
            const focusedIndex = focusArray.indexOf(document.activeElement);

            if (e.shiftKey && focusedIndex === 0) {
                focusArray[focusArray.length - 1].focus();
                e.preventDefault();
            }

            if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
                focusArray[0].focus();
                e.preventDefault();
            }
        }

        focusTrap() {//Метод управления фокусом
            const focusable = this.modalContainer.querySelectorAll(this.focusElements);//Находим эдементы внутри модалки которые совпадают с this.focusElements который просан выше
            if (this.isOpen) {
                focusable[0].focus();
            } else {
                this.previousActiveElement.focus();
            }
        }

        disableScroll() {
            let pagePosition = window.scrollY;
            this.lockPadding();
            document.body.classList.add('disable-scroll');
            document.body.dataset.position = pagePosition;
            document.body.style.top = -pagePosition + 'px';
        }

        enableScroll() {//
            let pagePosition = parseInt(document.body.dataset.position, 10);
            this.unlockPadding();
            document.body.style.top = 'auto';
            document.body.classList.remove('disable-scroll');
            window.scroll({ top: pagePosition, left: 0 });
            document.body.removeAttribute('data-position');
        }

        lockPadding() {//Метод удаления отступов (что бы убрать скочек)
            let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
            this.fixBlocks.forEach((el) => {
                el.style.paddingRight = paddingOffset;
            });
            document.body.style.paddingRight = paddingOffset;
        }

        unlockPadding() {
            this.fixBlocks.forEach((el) => {
                el.style.paddingRight = '0px';
            });
            document.body.style.paddingRight = '0px';
        }
    }

    const modal = new Modal({
        isOpen: (modal) => {
            console.log(modal);
            console.log('opened');
        },
        isClose: () => {
            console.log('closed');
        },
    });


    function DynamicAdapt(type) {
        this.type = type;
    }

    DynamicAdapt.prototype.init = function () {
        const _this = this;
        // массив объектов
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        // массив DOM-элементов
        this.nodes = document.querySelectorAll("[data-da]");

        // наполнение оbjects объктами
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }

        this.arraySort(this.оbjects);

        // массив уникальных медиа-запросов
        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
            return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        });

        // навешивание слушателя на медиа-запрос
        // и вызов обработчика при первом запуске
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];

            // массив объектов с подходящим брейкпоинтом
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                return item.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };

    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }

    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }

    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };

    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }

                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }

                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }

                    return a.place - b.place;
                }

                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }

                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }

                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }

                    return b.place - a.place;
                }

                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };

    const da = new DynamicAdapt("max");
    da.init();

};
