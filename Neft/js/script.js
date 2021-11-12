 ///////Адаптив/////////////////////////////////////////
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
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};
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
window.onload = function () {
    const found = document.querySelector('.found__images');
    if (found) {
        found.classList.add('active');
    }

    const wholesaleS = document.querySelector('.wholesale-fuel__swiper');
    if (wholesaleS) {
        var wholesaleSlider = new Swiper(".wholesale-fuel__swiper", {
            navigation: {
                nextEl: ".wholesale-fuel__next",
                prevEl: ".wholesale-fuel__prev",
            },
            loop: "true",
            speed: 2000,
        
            breakpoints: {
                320: {
                    spaceBetween: 10,
                    slidesPerView: 1.2,
                },
                549: {
                    spaceBetween: 10,
                    slidesPerView: 1.4,
                },
                750: {
                    spaceBetween: 10,
                    slidesPerView: 2.2,
                },
                970: {
                    spaceBetween: 10,
                    slidesPerView: 2.5,
                },
                1366: {
                    spaceBetween: 20,
                    slidesPerView: 3.2,
                }
            },
        });
    }

    const myS = document.querySelector('.slider');
    if (myS) {
        var mySlider = new Swiper(".slider", {
            navigation: {
                nextEl: ".slider__arrow-next",
                prevEl: ".slider__arrow-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                //type: "fraction",
                //renderFraction: function (currentClass, totalClass) {
                //    return '0<span class="' + currentClass + '"></span>' +
                //        ' / ' +
                //        '0<span class="' + totalClass + '"></span>';
                //},
            },
            autoplay: {
                delay: 2000,
            },
            //loop: "true",
            spaceBetween: 50,
            speed: 2000,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        });
        //////////Дополнительный выввод фракции///////////////////////////
        let mySliderAllSlides = document.querySelector('.slider__total');
        if (mySliderAllSlides) {
            let mySliderCurrentSlide = document.querySelector('.slider__current');
            mySliderAllSlides.innerHTML = '0' + mySlider.slides.length;

            mySlider.on('slideChange', function () {
                let currentSlide = ++mySlider.realIndex;
                mySliderCurrentSlide.innerHTML = '0' + currentSlide;
            });
        }
    }

    const geographyS = document.querySelector('.geography__slider');
    if (geographyS) {
        var geographySlider = new Swiper(".geography__slider", {
            navigation: {
                nextEl: ".geography__arrow-next",
                prevEl: ".geography__arrow-prev",
            },
            loop: "true",
            spaceBetween: 30,
            speed: 2000,
        });
    }

    const withS = document.querySelector('.with-slider');
    if (withS) {
        var withSlider = new Swiper(".with-slider", {
            autoplay: {
                delay: 2000,
            },
            loop: "true",
            spaceBetween: 20,
            speed: 2000,
            slidesPerView: "auto",
            centeredSlides: true,
        
        });
    }

    const examplesS = document.querySelector('.examples-slider');
    if (examplesS) {
        var examplesSlider = new Swiper(".examples-slider", {
            navigation: {
                nextEl: ".examples__arrow-next",
                prevEl: ".examples__arrow-prev",
            },
            loop: "true",
            spaceBetween: 10,
            speed: 2000,
            slidesPerView: 1.04,
        });
    }

    const optionS = document.querySelector('.option-clients__slider');
    if (optionS) {
        var optionSlider = new Swiper(".option-clients__slider ", {
            navigation: {
                nextEl: ".option-clients__arrow-next",
                prevEl: ".option-clients__arrow-prev",
            },
            loop: "true",
            spaceBetween: 20,
            speed: 2000,
            slidesPerView: 3.7,
            breakpoints: {
                320: {
                    slidesPerView: 1.7,
                },
                400: {
                    slidesPerView: 2.5,
                },
                550: {
                    slidesPerView: 2.9,
                },
                750: {
                    slidesPerView: 2.2,
                },
                950: {
                    slidesPerView: 2.8,
                },
                1150: {
                    slidesPerView: 3.2,
                },
                1250: {
                    spaceBetween: 20,
                    slidesPerView: 3.7,
                }
            },
        });
    }

    const asideS = document.querySelector('.aside-difference__slider');
    if (asideS) {
        var asideSlider = new Swiper(".aside-difference__slider", {
            navigation: {
                nextEl: ".aside-difference__next",
                prevEl: ".aside-difference__prev",
            },
            loop: "true",
            speed: 2000,
        
            breakpoints: {
                320: {
                    spaceBetween: 10,
                    slidesPerView: 1.2,
                },
                550: {
                    spaceBetween: 10,
                    slidesPerView: 2.5,
                },
                950: {
                    spaceBetween: 20,
                    slidesPerView: 1.5,
                }
            },
        });
    }

    //////Списки с выбором///////////////////////////////////////////////////
    const dropdownD = document.querySelector('.dropdown');
    if (dropdownD) {
        document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
            const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
            const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
            const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
            const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');
        
            // Клик по кнопке. Открыть/Закрыть select
            dropDownBtn.addEventListener('click', function (e) {
                dropDownList.classList.toggle('dropdown__list--visible');
                this.classList.add('dropdown__button--active');
                dropDownWrapper.classList.toggle('active');
            });
        
            // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
            dropDownListItems.forEach(function (listItem) {
                listItem.addEventListener('click', function (e) {
                    e.stopPropagation();
                    dropDownBtn.innerText = this.innerText;
                    dropDownBtn.focus();
                    dropDownInput.value = this.dataset.value;
                    dropDownList.classList.remove('dropdown__list--visible');
                });
            });
        
            // Клик снаружи дропдауна. Закрыть дропдаун
            document.addEventListener('click', function (e) {
                if (e.target !== dropDownBtn) {
                    dropDownBtn.classList.remove('dropdown__button--active');
                    dropDownList.classList.remove('dropdown__list--visible');
                    dropDownWrapper.classList.remove('active');
                }
            });
        
            // Нажатие на Tab или Escape. Закрыть дропдаун
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Tab' || e.key === 'Escape') {
                    dropDownBtn.classList.remove('dropdown__button--active');
                    dropDownList.classList.remove('dropdown__list--visible');
                    dropDownWrapper.classList.remove('active');
                }
            });
        });
        // Полифилл для метода forEach для NodeList
        if (window.NodeList && !NodeList.prototype.forEach) {
            NodeList.prototype.forEach = function (callback, thisArg) {
                thisArg = thisArg || window;
                for (var i = 0; i < this.length; i++) {
                    callback.call(thisArg, this[i], i, this);
                }
            };
        }
    }

    ////Переключение шагов квиза/////////////
    const qvize = document.querySelector('.qvize');
    if (qvize) {
        const stepsOne = document.querySelector('.qvize__steps-1');
        const stepsThoo = document.querySelector('.qvize__steps-2');
        const calculatorButton = document.querySelector('.calculator__button');
        const rezultSubmit = document.querySelector('.rezult__button');

        calculatorButton.addEventListener('click', function (e) {
            stepsOne.classList.add('hide');
            stepsThoo.classList.add('visible');
        });
        rezultSubmit.addEventListener('click', function (e) {
            stepsOne.classList.remove('hide');
            stepsThoo.classList.remove('visible');
        });
    }

    ////////////////Скрол шапка////////////////////////////////////////////
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {

        let scrollDistance = window.scrollY;

        if (scrollDistance >= headerHeight) {

            header.classList.add('header__fixed');

        } else {
            header.classList.remove('header__fixed');
        }

    });

    //////Открытие меню, бургера//////////////////////////
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav');
    const body = document.querySelector('body');
    const wrapper = document.querySelector('.wrapper');
    burger.addEventListener('click', function () {
        burger.classList.toggle('_active');
        nav.classList.toggle('_active');
        body.classList.toggle('_hiden');
        wrapper.classList.toggle('_hiden');
    });

    /////////Открытие выпадающего в header///////////
    const drops = document.querySelector('.drops');
    const dropsMenu = document.querySelector('.drops__menu');
    drops.addEventListener('click', function () {
        dropsMenu.classList.toggle('_active');
        drops.classList.toggle('_active');
    });

    ///////////////////Модалки////////////////////////
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

        },
        isClose: () => {
        },
    });

    ///////Аккордион///////////////////////////////////
    const dropMore = document.querySelectorAll('.dropdown-more');
    if (dropMore) {
        dropMore.forEach(function (dropDownWrapper, ) {
            const dropMoreBtn = dropDownWrapper.querySelector('.dropdown-more__button');
            const dropMoreList = dropDownWrapper.querySelector('.dropdown-more__text');
            dropMoreBtn.addEventListener('click', function (e) {
                dropMoreList.classList.toggle('visible');
                dropMoreBtn.classList.toggle('active');
            });
        });
    }

    ////////Карта (страница с толивными картами)///////////////////////
    const mapp = document.querySelector('.map');
    if (mapp) {
        function init() {
            let map = new ymaps.Map('map-fuel', {
                center: [55.11753006959305, 36.61670549999997],
                zoom: 16
            });
        
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="map__mark-small">$[properties.iconContent]</div>'
            );
        
            MyIconContentLayoutBig = ymaps.templateLayoutFactory.createClass(
                '<div class="map__mark-big">$[properties.iconContent]</div>'
            );
        
            var Placemark = new ymaps.Placemark([55.11753006959305, 36.61670549999997], {
                iconContent: '2'
            }, 
            {
                // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/road/map-icon.png',
                    // Размеры метки.
                    iconImageSize: [41, 49],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-24, -24],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [100, 100],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayout
            });
        
            var PlacemarkBig = new ymaps.Placemark([55.11753006959305, 36.61670549999997], {
                iconContent: '39'
            }, 
            {        // Опции.
                    // Необходимо указать данный тип макета.
                    iconLayout: 'default#imageWithContent',
                    // Своё изображение иконки метки.
                    iconImageHref: 'img/road/map-icon.png',
                    // Размеры метки.
                    iconImageSize: [41, 49],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-130, -130],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [-60, -60],
                    // Макет содержимого.
                    iconContentLayout: MyIconContentLayoutBig 
            });
            map.geoObjects.add(Placemark);
            map.geoObjects.add(PlacemarkBig);
        
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
    }

    ////////Карта (страница с контактами)///////////////////////
    const mappContact = document.querySelector('.map-contat__maps');
    if (mappContact) {
        function init() {
            let map = new ymaps.Map('map-contact', {
                center: [55.11753006959305, 36.61670549999997],
                zoom: 16
            });
        
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
    }

    ////////////////Показать еще/////////////
    const productsGrid = document.querySelector('.exapmles-cooperator__grid');
    const loadMore = document.querySelector('.exapmles-cooperator__button');
    let quantityProducts = 10;
    let dataLength = '';

    if (productsGrid) {
        const fetchProducts = (quantity = 10) => {
        fetch('../json/product.json')
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        dataLength = data.length;
        productsGrid.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            if (i < quantity) {

            productsGrid.innerHTML += `
            <div class="exapmles-cooperator__item item-anim">
                <div class="examples-slider__header">
                    <div class="examples-slider__shell">
                        <div class="examples-slider__logo">
                            <img src="${data[i].image}" alt="${data[i].title}">
                        </div>
                        <span>${data[i].title}</span>
                    </div>
                    <div class="examples-slider__partners">
                        <span>${data[i].title}</span>
                        <p>${data[i].text}</p>
                    </div>
                </div>
                <div class="examples-slider__footer">
                    <div class="examples-slider__item">
                        <div class="examples-slider__advantage">
                            Скидка
                        </div>
                        <div class="examples-slider__quantity">
                            <span>${data[i].discount}</span>
                        </div>
                    </div>
                    <div class="examples-slider__item">
                        <div class="examples-slider__advantage">
                            Экономия на топливе
                        </div>
                        <div class="examples-slider__quantity">
                            <span>${data[i].economy}</span>
                            <p>за год</p>
                        </div>
                    </div>
                    <div class="examples-slider__item">
                        <div class="examples-slider__advantage">
                            За счет средств контроля
                        </div>
                        <div class="examples-slider__quantity">
                            <span>${data[i].tools}</span>
                            <p>за год</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            }
        }
        });
    };

    fetchProducts(quantityProducts);
    function hideAnim() {
        const productItem = document.querySelectorAll('.item-anim');
        productItem.forEach(i => {
            i.classList.add('active');
        });
    }

    if (loadMore) {
        loadMore.addEventListener('click', (e) => {
            setTimeout(() => {
                hideAnim();
            }, 1000);
            quantityProducts = quantityProducts + 2;
            fetchProducts(quantityProducts);
            if (quantityProducts == dataLength) {
            loadMore.style.display = 'none';
            } else {
            loadMore.style.display = 'inline-flex';
            }
        });
    }
    }
};