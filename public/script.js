const day = document.getElementById('day');
const night = document.getElementById('night');
const feature = document.getElementById('Cb');
const dis = document.getElementById('dis');
const back = document.getElementById('back');
const bk = document.querySelector('.cr');
const hamburger = document.getElementById('hamburger');
const box1 = document.getElementById('box1');
const sec = document.querySelector('.sec');
const p = document.querySelector('.sub-free4 h1 ');
const p1 = document.querySelector('.sub-free4 p ');
function navbarAnimation() {
    gsap.to("#op img", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -8%",
            scrub: true,
        },
    });
}

navbarAnimation();

function ActiveNav() {

    feature.addEventListener('click', () => {
        dis.style.display = "block";
    });

    back.addEventListener('click', () => {
        dis.style.display = "none";
    });

    night.addEventListener('click', () => {
        night.style.display = 'none';
        day.style.display = 'block';
        sec.style.backgroundcolor = "black";
        const idArray = ['Black', 'Black1', 'do-black'];
        idArray.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('isActive');
            }
        });
        p.style.color = "#fff";
        p1.style.color = "#fff";
        const color = ['Cb', 'info', 'ft', 'wt', 'gid', 'hid'];
        color.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('CisActive');
            }
        });
    });

    day.addEventListener('click', () => {
        day.style.display = 'none';
        night.style.display = 'block';
        const idArray = ['Black', 'Black1', 'do-black'];
        idArray.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('isActive');
            }
        });
        p.style.color = "black";
        p1.style.color = "black";
        const color = ['Cb', 'info', 'ft', 'wt'];
        color.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('CisActive');
            }
        });
    });
}

ActiveNav();

function Menu_back() {
    const mn = document.querySelector('.menu-bar');
    hamburger.addEventListener('click', () => {
        mn.style.display = "block";
        bk.style.display = 'block'
    });

    bk.addEventListener('mouseover', () => {
        bk.style.cursor = "pointer";
    });

    bk.addEventListener('click', () => {
        bk.style.display = "none";
        mn.style.display = "none";
    });
    const ft = document.getElementById('ft');
    const bx = document.getElementById('bx');
    const box = document.querySelector('.box');
    ft.addEventListener('click', () => {
        dis.style.display = "block";
        dis.style.zIndex = '101';
        bx.style.display = 'flex';
        bx.style.flexDirection = 'column';
        dis.style.height = "100%";
    });

}

Menu_back();


function ScollIcon() {
    document.addEventListener('DOMContentLoaded', function () {
        const scrollIcon = document.getElementById('GoBack');
        window.addEventListener('scroll', function () {
            const scrollPosition = window.scrollY;
            const halfWindowHeight = window.innerHeight / 2;

            if (scrollPosition >= halfWindowHeight) {
                scrollIcon.style.display = '';
            } else {
                scrollIcon.style.display = 'none';
            }
        });
        scrollIcon.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

ScollIcon();

