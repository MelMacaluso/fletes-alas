const mainHeaderNav = document.querySelectorAll('.header__menu')[0];
const burgerToggle = document.getElementById('burgerToggle');
burgerToggle.addEventListener("click", menuToggle, false);

function menuToggle() {
    mainHeaderNav.style.right = "0";
}