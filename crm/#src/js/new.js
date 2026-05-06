const itemText = document.querySelectorAll('.menu-nav__item');
if (itemText) {
    itemText.forEach(element => {
        const itemBox = element.querySelector('.menu-nav__box');
        const itemBtn = element.querySelector('.menu-nav__button');
        if (itemBox && itemBtn) {
            const itemBoxHight = itemBox.offsetHeight;

            function updateHight() {
                if (element.classList.contains('--active') && itemBox) {
                    itemBox.style.cssText += `max-height: ${itemBoxHight + "px"}`
                } else if (itemBox) {
                    itemBox.style.cssText += `max-height: ${0 + "px"}`;
                }
            }
            updateHight();

            itemBtn.addEventListener('click', function (e) {
                e.preventDefault();

                element.classList.toggle('--active');
                this.classList.toggle('--active');
                updateHight();
            });
        }
    });
}

//////Списки с выбором///////////////////////////////////////////////////
const dropdown = document.querySelectorAll('.dropdown');
if (dropdown) {
    dropdown.forEach(dropDownWrapper => {
        const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
        const dropDownText = dropDownWrapper.querySelector('.dropdown__button span');
        const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
        const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
        const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

        // функция открытия дропов
        const toggleClassDrop = (e) => {
            e.preventDefault()
            dropDownList.classList.toggle('--visible');
            dropDownBtn.classList.toggle('--active');
            dropDownBtn.classList.remove('--color')
            dropDownWrapper.classList.toggle('--active');

        }

        // функция закрытия дропов
        const removeClassDrop = (e) => {
            if (e) e.preventDefault()
            dropDownBtn.classList.remove('--active');
            dropDownList.classList.remove('--visible');
            dropDownWrapper.classList.remove('--active');
        }

        // Клик по кнопке. Открыть/Закрыть select
        dropDownBtn.addEventListener('click', function (e) {
            toggleClassDrop(e)
        });

        // Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун + проверка на чекбоксы
        dropDownListItems.forEach(listItem => {
            listItem.addEventListener('click', function (e) {
                dropDownText.innerText = this.innerText.trim();
                dropDownInput.value = this.dataset.value.trim();
                removeClassDrop(e);
                dropDownBtn.classList.add('--color')
            });
        });

        // Клик снаружи дропдауна. Закрыть дропдаун
        document.addEventListener('click', function (e) {
            if (e.target !== dropDownBtn) {
                removeClassDrop();
            }
        });

        // Нажатие на Tab или Escape. Закрыть дропдаун
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Tab' || e.key === 'Escape') {
                removeClassDrop();
            }
        });
    });
}


const tableMod = document.querySelector('.table-mod');
if (tableMod) {
    const btns = tableMod.querySelectorAll('.table-mode__more');
    btns.forEach((el) => {
        el.addEventListener('click', (e) => {
            let path = e.currentTarget.getAttribute('data-path');
            document.querySelector(`[data-target="${path}"]`).classList.toggle('--hide');
            el.classList.toggle('--active');
        });
    });
}