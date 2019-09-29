'use strict';

(function () {

  var setupOpenElement = document.querySelector('.setup-open');
  var setupBlockElement = document.querySelector('.setup');
  var setupCloseElement = setupBlockElement.querySelector('.setup-close');
  var setupOpenIconElement = setupOpenElement.querySelector('.setup-open-icon');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEY_CODE && evt.target !== window.setupUserNameElement) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupBlockElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setupBlockElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupOpenIconElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE) {
      openPopup();
    }
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEY_CODE) {
      closePopup();
    }
  });
})();
