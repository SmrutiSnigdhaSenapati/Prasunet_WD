let menuIcon=document.querySelector('#menu-icon');
let navbar=document.querySelector('.navbar');

menuIcon.onclick=()=>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


let sections=document.querySelectorAll('section');
let navLinks=document.querySelectorAll('header nav a');




document.addEventListener("DOMContentLoaded", () => {
    const aboutContent = document.querySelector('.about-content');
    const elements = aboutContent.querySelectorAll('.line');
    const readMoreBtn = document.getElementById('read-more-btn');
    const secondParagraph = document.getElementById('second-paragraph');

    function showWords(element) {
        const text = element.textContent;
        const words = text.split(' ');
        element.textContent = '';
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        words.forEach((word, index) => {
            setTimeout(() => {
                element.textContent += word + ' ';
            }, index * 100); // Faster interval for smoother animation
        });
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        showWords(element);
                    }, index * 800); // Faster interval for smoother animation
                });
                observer.unobserve(entry.target); // Unobserve after animation starts
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1 // Adjust this threshold as needed
    });

    observer.observe(aboutContent);

    readMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        readMoreBtn.style.display = 'none'; // Hide the button
        secondParagraph.style.display = 'block';
        showWords(secondParagraph);
    });
});












window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };

    });
    let header=document.querySelector('header');

    header.classList.toggle('sticky',window.screenY>100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
    //reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-content,.heading',{origin:'top'});
ScrollReveal().reveal('.home-img,.services-container,.portfolio-box,.contact form',{origin:'bottom'});
ScrollReveal().reveal('.home-content h1,.about-img',{origin:'left'});
ScrollReveal().reveal('.home-content p,.about-content',{origin:'right'});

const typed = new Typed('.multiple-text',{
    strings:['CSE Student at Trident Academy of Technology ','Frontend developer', 'Java developer'],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});