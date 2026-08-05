const darkModeBtn = document.getElementById("darkMode");

if (darkModeBtn) {

    // Carregar preferência guardada
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
        darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem("theme", "dark");
            darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }

    });

}