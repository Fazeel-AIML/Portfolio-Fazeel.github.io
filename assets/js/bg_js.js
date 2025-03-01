document.addEventListener("DOMContentLoaded", function () {
    let video = document.querySelector(".video-bg");

    // If video fails to load, replace with a background image
    video.onerror = function () {
        document.querySelector(".home").style.background = "url('assets/img/background.jpg') no-repeat center center/cover";
    };
});
