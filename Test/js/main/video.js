/////Видео////////////////////////////////////////////////
const videos = document.querySelectorAll('.video');
if (videos) {
    // generate video url
    let generateUrl = function (id) {
        let query = '?rel=0&showinfo=0&autoplay=1';
        return 'https://www.youtube.com/embed/' + id + query;
    };

    // creating iframe
    let createIframe = function (id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('src', generateUrl(id));

        return iframe;
    };

    // main code
    videos.forEach((el) => {
        let videoHref = el.getAttribute('data-video');

        let deletedLength = 'https://youtu.be/'.length;

        let videoId = videoHref.substring(deletedLength, videoHref.length);



        el.addEventListener('click', (e) => {
            e.preventDefault();

            let iframe = createIframe(videoId);
            el.querySelector('img').remove();
            el.appendChild(iframe);
            el.querySelector('button').remove();
        });
    });
}