/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            // Update the ID to match the one in your HTML
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        } else {
            // Update the ID to match the one in your HTML
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

// Update the ID to match the one in your HTML
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text, .personal, .personal__img',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img, .personal__text',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});


document.addEventListener("DOMContentLoaded", function () {
    const titles = ["AI Engineer", "ML and DL Scientist", "IoT Developer", "CV Developer"];
    const titleElement = document.querySelector(".home__title .job-title");
    let titleIndex = 0;

    function typeTitle() {
        const currentTitle = titles[titleIndex];
        const currentText = titleElement.innerHTML;
        const lengthToType = Math.min(currentText.length + 1, currentTitle.length);

        titleElement.innerHTML = currentTitle.substring(0, lengthToType);

        if (lengthToType < currentTitle.length) {
            requestAnimationFrame(typeTitle);
        } else {
            setTimeout(replaceTitle, 2000);
        }
    }

    function replaceTitle() {
        const currentTitle = titles[titleIndex];
        titleElement.innerHTML = currentTitle;

        setTimeout(eraseTitle, 1000);
    }

    function eraseTitle() {
        const currentText = titleElement.innerHTML;

        if (currentText !== "") {
            titleElement.innerHTML = currentText.substring(0, currentText.length - 1);
            requestAnimationFrame(eraseTitle);
        } else {
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeTitle, 1000);
        }
    }

    setTimeout(typeTitle, 1000);
});

const workImages = document.querySelectorAll('.work__img');

workImages.forEach((workImage) => {
    const description = workImage.getAttribute('data-description');
    const descriptionElement = workImage.querySelector('.work__description');
    
    descriptionElement.textContent = description;
});