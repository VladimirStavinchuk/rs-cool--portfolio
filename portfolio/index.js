(function () {
  const burgerItem = document.querySelector ('.menu-btn');
  const menuBurger = document.querySelector ('.nav__list');
  // const navLink = document.querySelectorAll ('.nav__link');

  burgerItem.addEventListener ('click', function (e) {
    document.body.classList.toggle ('lock');
    burgerItem.classList.toggle ('active');
    menuBurger.classList.toggle ('active');
  });

  menuBurger.addEventListener ('click', function (event) {
    if (event.target.classList == 'link nav__link') {
      document.body.classList.remove ('lock');
      burgerItem.classList.remove ('active');
      menuBurger.classList.remove ('active');
    }
  });
}) ();
