////////Карта///////////////////////
const contacts = document.querySelector('.contacts');
if (contacts) {
    function init() {
        let map = new ymaps.Map('contacts__office', {
            center: [55.11753006959305, 36.61670549999997],
            zoom: 16
        });


        var Placemark = new ymaps.Placemark([55.11753006959305, 36.61670549999997], {

        });


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
}