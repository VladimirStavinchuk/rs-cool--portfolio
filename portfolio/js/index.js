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
// todo добавить при загрузке или кнопке запоминание последней активной, или делать активной кнопку соответствующую сезону.
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
  let language;

  language = localStorage.getItem ('lang');
  language === null ? (language = 'en') : 0;
  if (language === 'ru') {
    languageLink[0].classList.remove ('active');
    languageLink[1].classList.add ('active');
  } else {
    languageLink[0].classList.add ('active');
    languageLink[1].classList.remove ('active');
  }

  setLanguage ();

  languageList.addEventListener ('click', function (event) {
    if (event.target.classList.contains ('language__link')) {
      if (event.target.innerHTML === language) {
      } else {
        changeClassActive (languageLink[1]);
        changeClassActive (languageLink[0]);
        language === 'en' ? (language = 'ru') : (language = 'en');
        localStorage.setItem ('lang', language);
        setLanguage ();
      }
    }
  });

  function setLanguage () {
    bodyLanguag.forEach (element => {
      if (i18Obj[language][element.dataset.i18]) {
        if (element.placeholder) {
          element.placeholder = i18Obj[language][element.dataset.i18];
          // element.textContent = '';
        } else {
          element.textContent = i18Obj[language][element.dataset.i18];
        }
      }
    });
  }
}

// changeTheme
let theme;

theme = localStorage.getItem ('theme');
theme == null ? (theme = 'dark') : 0;

setTheme ();

function listеnTheme () {
  const iconTheme = document.querySelector ('.icon-theme');
  iconTheme.addEventListener ('click', () => {
    theme === 'dark' ? (theme = 'light') : (theme = 'dark');
    setTheme (theme);
  });
}

function setTheme () {
  const iconTheme = document.querySelector ('.icon-theme');

  if (theme === 'light') {
    iconTheme.src = './assets/img/icon/night_icon.svg';
    iconTheme.classList.add ('light-theme');
    document.querySelector ('.body').classList.add ('light-theme');
    setLocalStorage (theme);
  } else {
    iconTheme.src = './assets/img/icon/day_icon.svg';
    iconTheme.classList.remove ('light-theme');
    document.querySelector ('.body').classList.remove ('light-theme');
    setLocalStorage (theme);
  }
}

function setLocalStorage () {
  localStorage.setItem ('theme', theme);
}

listеnTheme ();
getBurgerMenu ();
getPortfolioSeason ();
getTranslate ();
