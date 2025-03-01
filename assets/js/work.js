// Object to store media files for each modal
const modalMedia = {
    modal1: ["assets/img/work1_vid1.mp4", "assets/img/work1.jpeg", "assets/img/work2.jpg"],
    modal2: ["assets\img\skin_cancer.png", "assets/img/work2_vid1.mp4"],
    modal3: ["assets/img/work3.jpeg", "assets/img/work3_vid1.mp4"],
    modal4: ["assets/img/work4.jpeg", "assets/img/work4_vid1.mp4"],
    modal5: ["assets/img/work5.jpeg", "assets/img/work5_vid1.mp4"],
    modal6: ["assets/img/work6.jpeg", "assets/img/work6_vid1.mp4"]
};

// Store current slide index per modal
let currentSlides = {};

// Function to open modal and load media dynamically
function openModal(modalId) {
    let modal = document.getElementById(modalId);
    if (!modal) return;

    modal.style.display = "flex";

    let mediaContainer = modal.querySelector('.media-slider');
    mediaContainer.innerHTML = "";

    let mediaFiles = modalMedia[modalId] || [];

    mediaFiles.forEach((file, index) => {
        let mediaElement;
        if (file.endsWith(".mp4")) {
            mediaElement = `<video controls ${index === 0 ? 'autoplay' : ''}><source src="${file}" type="video/mp4"></video>`;
        } else {
            mediaElement = `<img src="${file}" ${index === 0 ? 'style="display:block"' : 'style="display:none"'}>`;
        }
        mediaContainer.innerHTML += mediaElement;
    });

    currentSlides[modalId] = 0;
    showSlides(0, modalId);
}

// Function to close modal
function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Function to show slides
function showSlides(index, modalId) {
    let modal = document.getElementById(modalId);
    let slides = modal.querySelectorAll('.media-slider img, .media-slider video');
    if (slides.length === 0) return;

    slides.forEach(slide => {
        slide.style.display = "none";
        if (slide.tagName === "VIDEO") {
            slide.pause();
            slide.currentTime = 0;
        }
    });

    slides[index].style.display = "block";
    if (slides[index].tagName === "VIDEO") {
        slides[index].play();
    }
}

// Function to change slide
function changeSlide(direction, modalId) {
    let modal = document.getElementById(modalId);
    if (!modal) return;

    let slides = modal.querySelectorAll('.media-slider img, .media-slider video');
    if (slides.length === 0) return;

    currentSlides[modalId] = (currentSlides[modalId] + direction + slides.length) % slides.length;
    showSlides(currentSlides[modalId], modalId);
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modals = document.querySelectorAll(".modal");
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
};

// Hide all modals on page load
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
    });
});
