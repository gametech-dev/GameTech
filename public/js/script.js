// ==========================================
// GAME TECH 4.0
// ==========================================

// ==========================
// MENU MOBILE
// ==========================

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

if (menuBtn && menu) {

    menuBtn.addEventListener("click", () => {

        menu.classList.toggle("active");

    });

}

// ==========================
// MODO CLARO / ESCURO
// ==========================

const darkModeBtn = document.getElementById("darkMode");

if (darkModeBtn) {

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const icon = darkModeBtn.querySelector("i");

        if (document.body.classList.contains("light-mode")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}

// ==========================
// HEADER AO FAZER SCROLL
// ==========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 80) {

        header.style.background = "rgba(8,17,31,.98)";
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.35)";

    } else {

        header.style.background = "rgba(8,17,31,.90)";
        header.style.boxShadow = "none";

    }

});

// ==========================
// ANIMAÇÃO SUAVE DOS CARDS
// ==========================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = ".7s ease";

    observer.observe(card);

});