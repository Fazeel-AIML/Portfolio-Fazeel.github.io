document.addEventListener("DOMContentLoaded", function () {
    let video = document.querySelector(".video-bg");

    if (!video) {
        console.error("Video element not found!");
        return;
    }

    // If video fails to load, replace with a background image
    video.onerror = function () {
        console.warn("Video failed to load. Replacing with background image.");
        document.querySelector(".home").style.background = "url('assets/img/background.jpg') no-repeat center center/cover";
    };
});
