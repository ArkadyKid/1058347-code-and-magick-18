'use strict';

(function () {
  var KEY_CODE = window.util.KEY_CODE;

  var setupOpenElement = document.querySelector('.setup-open');
  var setupBlockElement = document.querySelector('.setup');
  var uploadElement = setupBlockElement.querySelector('.upload');
  var setupCloseElement = setupBlockElement.querySelector('.setup-close');
  var setupOpenIconElement = setupOpenElement.querySelector('.setup-open-icon');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEY_CODE.ESC && evt.target !== window.setupUserNameElement) {
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

  window.setup = {
    setupBlockElement: setupBlockElement
  };

  uploadElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      setupBlockElement.style.top = (setupBlockElement.offsetTop - shift.y) + 'px';
      setupBlockElement.style.left = (setupBlockElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };
        uploadElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
    setupBlockElement.style.top = null;
    setupBlockElement.style.left = null;
  });

  setupOpenIconElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      openPopup();
    }
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      closePopup();
    }
  });

  window.setup = {
    setupBlockElement: setupBlockElement
  };
})();
