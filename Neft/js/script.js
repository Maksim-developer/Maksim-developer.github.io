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

var mySlider = new Swiper(".slider", {
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

let mySliderAllSlides = document.querySelector('.slider__total');
let mySliderCurrentSlide = document.querySelector('.slider__current');

mySliderAllSlides.innerHTML = '0' + mySlider.slides.length;

mySlider.on('slideChange', function () {
    let currentSlide = ++mySlider.realIndex;
    mySliderCurrentSlide.innerHTML = '0' + currentSlide;
});

var geographySlider = new Swiper(".geography__slider", {
    navigation: {
        nextEl: ".geography__arrow-next",
        prevEl: ".geography__arrow-prev",
    },
    loop: "true",
    spaceBetween: 30,
    speed: 2000,
});

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


// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    // Клик по кнопке. Открыть/Закрыть select
    dropDownBtn.addEventListener('click', function (e) {
        dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.add('dropdown__button--active');
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
        }
    });

    // Нажатие на Tab или Escape. Закрыть дропдаун
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
            dropDownBtn.classList.remove('dropdown__button--active');
            dropDownList.classList.remove('dropdown__list--visible');
        }
    });
});

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
const first = document.querySelector('.main-page__body');
const headerHeight = header.offsetHeight;
const firstHeight = first.offsetHeight;
let lastScrollTop = 0;


function scrolHeader() {
    header.classList.add('header__fixed');
}
function scrolHeaderStop() {
    header.classList.remove('header__hide');

}

window.addEventListener('scroll', () => {

    let scrollDistance = window.scrollY;

    if (scrollDistance >= headerHeight) {

        header.classList.add('header__hide');
        if (header.classList.contains('header__fixed')) {
            header.classList.remove('header__hide');
        }
        setTimeout(scrolHeader, 100);

    } else {
        header.classList.remove('header__fixed');
    }

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

const drops = document.querySelector('.drops');
const dropsMenu = document.querySelector('.drops__menu');
drops.addEventListener('click', function () {
    dropsMenu.classList.toggle('_active');
    drops.classList.toggle('_active');
});