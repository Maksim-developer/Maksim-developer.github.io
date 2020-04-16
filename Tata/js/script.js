var playButton = document.getElementById("start_button");
// Event listener for the play/pause button
playButton.addEventListener("click", function () {
    if (video.paused == true) {
        // Play the video
        video.play();

        // Update the button text to 'Pause'
        //<button type='button' id= 'start_button'><img src='../icon/ellips_play.sv'></ button>
        playButton.innerHTML = "";
    } else {
        // Pause the video
        video.pause();

        // Update the button text to 'Play'
        playButton.innerHTML = "<img src='../icon/ellips_play.svg'>";
    }
});
var playButton_1 = document.getElementById("start_button_1");
// Event listener for the play/pause button
playButton_1.addEventListener("click", function () {
    if (video_1.paused == true) {
        // Play the video
        video_1.play();

        // Update the button text to 'Pause'
        playButton_1.innerHTML = "";
    } else {
        // Pause the video
        video_1.pause();

        // Update the button text to 'Play'
        playButton_1.innerHTML = "<img src='../icon/ellips_play.svg'>";
    }
});
var playButton_2 = document.getElementById("start_button_2");
// Event listener for the play/pause button
playButton_2.addEventListener("click", function () {
    if (video_2.paused == true) {
        // Play the video
        video_2.play();

        // Update the button text to 'Pause'
        playButton_2.innerHTML = "";
    } else {
        // Pause the video
        video_2.pause();

        // Update the button text to 'Play'
        playButton_2.innerHTML = "<img src='../icon/ellips_play.svg'>";
    }
});
$(function () {
    $().timelinr({
        autoPlay: 'false',
        autoPlayDirection: 'forward',
        arrowKeys: 'false',
        prevButton: '#prev',
        nextButton: '#next',
        startAt: 3
    })
});
$(document).ready(function () {
    $('.carousel_inner').slick({
        centerMode: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icon/arrow_right_violet.svg"></ button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icon/arrow_right.svg"></ button>',
        accessibility: false,
        variableWidth: true,
        centerPadding: '60px',
        slidesToShow: 3,
        draggable: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: false,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
});