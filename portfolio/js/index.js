// todo Самостоятельно напишите функцию preloadImages() для кеширования изображений из всех папок с временами года. https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part3-hints.md
import i18Obj from './translate.js';
console.log (i18Obj.ru);

const changeClassActive = function (className) {
  className.classList.toggle ('active');
};

const deleteClassActive = function (className) {
  className.classList.remove ('active');
};

// Burger menu
function burgerMenu () {
  const burgerItem = document.querySelector ('.menu-btn');
  const menuBurger = document.querySelector ('.nav__list');

  burgerItem.addEventListener ('click', function (e) {
    document.body.classList.toggle ('open');
    changeClassActive (burgerItem);
    changeClassActive (menuBurger);
  });

  menuBurger.addEventListener ('click', function (event) {
    if (event.target.classList.contains ('nav__link')) {
      document.body.classList.remove ('open');
      deleteClassActive (burgerItem);
      deleteClassActive (menuBurger);
    }
  });
}

// Portfolio Season
function portfolioSeason () {
  const portfolioTabs = document.querySelector ('.portfolio-tabs');
  const portfolioBtns = document.querySelectorAll ('.portfolio-tabs__btn');
  const portfolioImages = document.querySelectorAll ('.portfolio-img');

  portfolioTabs.addEventListener ('click', function (event) {
    if (event.target.classList.contains ('portfolio-tabs__btn')) {
      const sesonActiv = event.target.dataset.season;

      portfolioBtns.forEach (element => {
        deleteClassActive (element);
      });
      changeClassActive (event.target);
      portfolioImages.forEach (
        (img, index) =>
          (img.src = `./assets/img/${sesonActiv}/${index + 1}.jpg`)
      );
    }
  });
}

// Switch language
function switchLanguage () {
  const languageList = document.querySelector ('.language__list');
  const languageLink = document.querySelectorAll ('.language__link');

  languageList.addEventListener ('click', function (event) {
    if (event.target.classList.contains ('language__link')) {
      changeClassActive (languageLink[0]);
      changeClassActive (languageLink[1]);
    }
  });
}

burgerMenu ();
portfolioSeason ();
switchLanguage ();
