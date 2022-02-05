// todo Самостоятельно напишите функцию preloadImages() для кеширования изображений из всех папок с временами года. https://github.com/rolling-scopes-school/tasks/blob/master/tasks/portfolio/portfolio-part3-hints.md
import i18Obj from './translate.js';

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

// custom video player

function videoPlayerControls () {
  const videoPlayer = document.querySelector ('.video-player');
  const video = videoPlayer.querySelector ('.video-player__video');
  const progressVideo = videoPlayer.querySelector (
    '.video-player__slider_video'
  );
  const progressSound = videoPlayer.querySelector (
    '.video-player__slider_sound'
  );
  const btnPlayHover = videoPlayer.querySelector (
    '.video-player__hover-btn-img'
  );
  const btnPlayPause = videoPlayer.querySelector ('.video-player__btn-play');
  const btnStop = videoPlayer.querySelector ('.video-player__btn-stop');
  const btnMute = videoPlayer.querySelector ('.video-player__btn-mute');
  let progressTimeVideo = 0;
  let saveVolumeVideo = 0.7;
  let isPlay = false;

  changeSound (saveVolumeVideo);

  seekingProgressVideo ();
  seekingVideoPlayer ();
  seekingVolumeVideo ();

  function seekingVideoPlayer () {
    videoPlayer.addEventListener ('click', function (e) {
      const clickBtn = e.target.classList;

      if (
        clickBtn.contains ('video-player__btn-play') ||
        clickBtn.contains ('video-player__hover-btn-img') ||
        (clickBtn.contains ('video-player__video') && isPlay)
      ) {
        isPlay === false ? playVideo () : pauseVideo ();
      } else if (clickBtn.contains ('video-player__btn-mute')) {
        video.volume > 0 ? offSoundVideo () : onSoundVideo ();
      } else if (clickBtn.contains ('video-player__btn-stop')) {
        stopVideo ();
      }
    });
  }

  function seekingProgressVideo () {
    progressVideo.addEventListener ('input', function () {
      video.currentTime = this.value * video.duration / 100;
      progressVideo.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${this.value}%, #b3b3b3 ${this.value}%, #b3b3b3 100%)`;
    });

    video.addEventListener ('timeupdate', function () {
      progressTimeVideo = this.currentTime * 100 / video.duration;
      progressVideo.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progressTimeVideo}%, #b3b3b3 ${progressTimeVideo}%, #b3b3b3 100%)`;
      progressVideo.value = progressTimeVideo;
    });
  }

  function seekingVolumeVideo () {
    progressSound.addEventListener ('input', function () {
      video.volume = this.value / 100;
      video.volume <= 0
        ? (btnMute.src = './assets/img/svg/mute.svg')
        : (btnMute.src = './assets/img/svg/volume.svg');
      progressSound.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${this.value}%, #b3b3b3 ${this.value}%, #b3b3b3 100%)`;
    });
  }

  function playVideo () {
    video.play ();
    isPlay = true;
    btnPlayHover.classList.add ('play');
    btnPlayPause.src = './assets/img/svg/pause.svg';
    btnStop.src = './assets/img/svg/stop.svg';
  }

  function pauseVideo () {
    video.pause ();
    isPlay = false;
    btnPlayHover.classList.remove ('play');
    btnPlayPause.src = './assets/img/svg/play.svg';
    btnStop.src = './assets/img/svg/previous.svg';
  }

  function stopVideo () {
    video.pause ();
    video.currentTime > 0 ? (video.currentTime = 0) : 0;
    isPlay = false;
    btnPlayPause.src = './assets/img/svg/play.svg';
    btnPlayHover.classList.remove ('play');
  }

  function offSoundVideo () {
    saveVolumeVideo = video.volume;
    video.volume = 0;
    changeSound (0);
  }

  function onSoundVideo () {
    video.volume = saveVolumeVideo;
    changeSound (saveVolumeVideo);
  }

  function changeSound (currentSound) {
    video.volume = currentSound;
    let currentSoundProgress = currentSound * 100;
    progressSound.value = currentSound * 100;
    progressSound.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${currentSoundProgress}%, #b3b3b3 ${currentSoundProgress}%, #b3b3b3 100%)`;
    currentSound <= 0
      ? (btnMute.src = './assets/img/svg/mute.svg')
      : (btnMute.src = './assets/img/svg/volume.svg');
  }
}

videoPlayerControls ();

console.log (
  `
Самооценка 60/60

  Вёрстка +10
[x] вёрстка видеоплеера: 
* есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5
* в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс + 5

[x] Кнопка Play/Pause на панели управления +10
* при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5
* внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент + 5

[x] Прогресс - бар отображает прогресс проигрывания видео.При перемещении ползунка прогресс - бара вручную меняется текущее время проигрывания видео.Разный цвет прогресс - бара до и после ползунка + 10

[x] При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише.Разный цвет регулятора громкости звука до и после ползунка + 10

[x] При клике по кнопке Volume / Mute можно включить или отключить звук.Одновременно с включением / выключением звука меняется внешний вид кнопки.Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля + 10

[x] Кнопка Play/Pause в центре видео +10
есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5
когда видео проигрывается, кнопка Play / Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается + 5

[x] Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`
);
