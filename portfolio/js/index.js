// todo Самостоятельно напишите функцию preloadImages() для кеширования изображений из всех папок с временами года. https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part3-hints.md
import i18Obj from './translate.js';
// const arrChangeTheme = [
//   '.body',
//   // 'menu-btn',
//   // 'burgerItem',
//   '.section__title',
//   '.skills-wrap__title',
//   '.skills-wrap__text',
//   'price__title',
//   'price__item-description',
// ];

const changeClassActive = function (className) {
  className.classList.toggle ('active');
};

const deleteClassActive = function (className) {
  className.classList.remove ('active');
};

// Burger menu
function getBurgerMenu () {
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
function getPortfolioSeason () {
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

// getTranslate
// todo далее можно сделать две проверки:
// ? На соответствие ключей в объекте i18Obj с data-атрибутами из коллекции

function getTranslate () {
  const languageList = document.querySelector ('.language__list');
  const languageLink = document.querySelectorAll ('.language__link');
  const bodyLanguag = document.querySelectorAll ('[data-i18]');
  let language = '';
  languageLink[0].classList.contains ('active')
    ? (language = 'en')
    : (language = 'ru');

  languageList.addEventListener ('click', function (event) {
    if (event.target.classList.contains ('language__link')) {
      if (event.target.innerHTML === language) {
      } else {
        changeClassActive (languageLink[1]);
        icon - theme (languageLink[0]);
        language === 'en' ? (language = 'ru') : (language = 'en');
      }

      bodyLanguag.forEach (element => {
        if (i18Obj[language][element.dataset.i18]) {
          if (element.placeholder) {
            element.placeholder = i18Obj[language][element.dataset.i18];
            element.textContent = '';
          } else {
            element.textContent = i18Obj[language][element.dataset.i18];
          }
        }
      });
    }
  });
}

function getTheme () {
  const iconTheme = document.querySelector ('.icon-theme');
  let lightTheme;

  // function changeTheme (newTheme) {
  //   // arrChangeTheme
  //   arrChangeTheme.forEach (elemeArrChangeTheme => {
  //     const changeTags = document.querySelectorAll ([elemeArrChangeTheme]);

  //     changeTags.forEach (element => {
  //       element.classList.toggle ('light-theme');
  //     });
  //   });
  // }

  iconTheme.addEventListener ('click', function (theme) {
    iconTheme.classList.toggle ('light-theme');
    document.querySelector ('.body').classList.toggle ('light-theme');
    if (iconTheme.classList.contains ('light-theme')) {
      iconTheme.src = './assets/img/icon/night_icon.svg';
      lightTheme = true;
    } else {
      iconTheme.src = './assets/img/icon/day_icon.svg';
      lightTheme = false;
    }

    // changeTheme (lightTheme);
  });
}

getTheme ();
getBurgerMenu ();
getPortfolioSeason ();
getTranslate ();
