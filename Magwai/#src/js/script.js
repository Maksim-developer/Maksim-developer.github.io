window.onload = function () {
    @@include('plagins/da.js');
    @@include('main/swiper.js');
    @@include('sliders/sliders.js');
    @@include('plagins/modal.js');
    @@include('main/mask.js');
    @@include('main/validate.js');

    //////Открытие меню, бургера + фикс + фулл-скрин моб//////////////////////////
    const header = document.querySelector('.header');
    if (header) {
        const burger = document.querySelector('.header__burger');
        const nav = document.querySelector('.header__wrapper');
        const body = document.querySelector('body');
        const home = document.querySelector('.home');
        burger.addEventListener('click', function () {
            burger.classList.toggle('_active');
            nav.classList.toggle('_active');
            body.classList.toggle('_hiden');
        });
        if (document.documentElement.clientWidth < 1250) {
            const fixedScrollBlock = () => {
                let scrollDistance = window.scrollY;
                if (scrollDistance > 500) {
                    body.style.paddingTop = header.offsetHeight + 'px'
                    header.classList.add('fixed');
                } else {
                    header.classList.remove('fixed');
                    body.style.paddingTop = 0 + 'px'
                }
            }
            window.addEventListener('scroll', fixedScrollBlock);
        }
        if (document.documentElement.clientWidth < 550) {
            const slide = document.querySelectorAll('.home-swiper__slide');
            const innerHeight = window.innerHeight;
            document.body.style.minHeight = innerHeight + 'px';
            slide.forEach(item => {
                item.style.minHeight = innerHeight - header.offsetHeight + 'px';
            });

        }
    }

    ////////////////Показать еще/////////////
    const productsGrid = document.querySelector('.grid-product');
    if (productsGrid) {
        const loadMore = document.querySelector('.product-more');
        let quantityProducts = 10;
        let dataLength = '';
        //Медиа для моб устрйств
        if (document.documentElement.clientWidth < 1430) {
            quantityProducts = 8;
        }
        if (document.documentElement.clientWidth < 1250) {
            quantityProducts = 9;
        }
        if (document.documentElement.clientWidth < 950) {
            quantityProducts = 6;
        }

        const fetchProducts = (quantity = 10) => {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    dataLength = Math.min(data.length, 50);
                    productsGrid.innerHTML = '';
                    for (let i = 0; i < data.length; i++) {
                        if (i < quantity) {
                            productsGrid.innerHTML += `
                                           <article class="product">
                                           <a href="#">
                                           <picture><source srcset="img/home/product-2.webp" type="image/webp"><img src="img/home/product-2.jpg" alt="Товар 1"></picture>
                                               <div class="product__box">
                                                   <h3 class="product__title">bridge ${data[i].id}</h3>
                                                   <p class="product__descr">${data[i].title}</p>
                                                   <p class="product__text">
                                                       ${data[i].body}
                                                   </p>
                                                   <p class="product__publish">Posted by&nbsp;<strong>Eugenia</strong>,
                                                       on&nbsp;July&nbsp;24,
                                                       2019
                                                   </p>
                                               </div>
                                               <div class="product__btn"><span>Continue reading</span></div>
                                           </a>
                                       </article>
                               `;
                        }
                    }
                });
        };
        fetchProducts(quantityProducts);
        loadMore.addEventListener('click', (e) => {
            quantityProducts = quantityProducts + 5;
            if (document.documentElement.clientWidth < 1430) {
                quantityProducts = quantityProducts - 1;
            }
            if (document.documentElement.clientWidth < 1250) {
                quantityProducts = quantityProducts - 1;
            }
            if (document.documentElement.clientWidth < 950) {
                quantityProducts = quantityProducts - 1;
            }
            fetchProducts(quantityProducts);
            if (quantityProducts == dataLength) {
                loadMore.style.pointerEvents = 'none';
                loadMore.style.opacity = '.5';
            } else {
                loadMore.style.pointerEvents = 'auto';
                loadMore.style.opacity = '1';
            }
        });
    }

    ////////Валидация + Маска/////////////////////////
    const form = document.querySelector('.form');
    if (form) {
        const telSelector = form.querySelector('input[type="tel"]');
        const inputMask = new Inputmask('+7 (999) 999-99-99');
        inputMask.mask(telSelector);
        const validation = new JustValidate('.form');
        validation
            .addField('.input-name', [
                {
                    rule: 'minLength',
                    value: 3,
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
            .addField('.input-mail', [
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
            .addField('.input-tel', [
                {
                    rule: 'required',
                    value: true,
                    errorMessage: 'Телефон обязателен',
                },
                {
                    rule: 'function',
                    validator: function () {
                        const phone = telSelector.inputmask.unmaskedvalue();
                        return phone.length === 10;
                    },
                    errorMessage: 'Введите корректный телефон',
                },
            ]).onSuccess((event) => {
                console.log('Validation passes and form submitted', event);

                let formData = new FormData(event.target);

                console.log(...formData);

                let xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log('Отправлено');
                        }
                    }
                }

                xhr.open('POST', 'mail.php', true);
                xhr.send(formData);

                event.target.reset();
            });
    }
}
