'use strict';

(function () {
  var setupUserNameElement = document.querySelector('.setup-user-name');
  var setupPlayerElement = document.querySelector('.setup-player');
  var wizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
  var wizardEyeElement = setupPlayerElement.querySelector('.wizard-eyes');
  var wizardFireballElement = setupPlayerElement.querySelector('.setup-fireball');
  var inputCoatElement = setupPlayerElement.querySelector('input[name=coat-color]');
  var inputEyesElement = setupPlayerElement.querySelector('input[name=eyes-color]');
  var inputFireballElement = setupPlayerElement.querySelector('input[name=fireball-color]');
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var generateColor = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var generateRandomCoat = function () {
    generateColor(coatColors);
  };

  var generateRandomEye = function () {
    generateColor(eyesColors);
  };

  var generateRandomFireball = function () {
    generateColor(fireballs);
  };

  window.form = {
    setupUserNameElement: setupUserNameElement,
    eyesColors: eyesColors,
    coatColors: coatColors
  };

  setupUserNameElement.addEventListener('invalid', function () {
    if (setupUserNameElement.validity.tooShort) {
      setupUserNameElement.setCustomValidity('Имя не должно быть короче 2ух символов');
    } else if (setupUserNameElement.validity.tooLong) {
      setupUserNameElement.setCustomValidity('Имя не должно быть длинее 25 символов');
    } else if (setupUserNameElement.validity.valueMissing) {
      setupUserNameElement.setCustomValidity('Обязательное поле!');
    } else {
      setupUserNameElement.setCustomValidity('');
    }
  });

  setupUserNameElement.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя не должно быть короче 2ух символов');
    }
    target.setCustomValidity('');
  });

  wizardCoatElement.addEventListener('click', function () {
    var coatColor = coatColors[generateRandomCoat()];
    wizardCoatElement.style.fill = coatColor;
    inputCoatElement.value = coatColor;
  });

  wizardEyeElement.addEventListener('click', function () {
    var eyesColor = eyesColors[generateRandomEye()];
    wizardEyeElement.style.fill = eyesColor;
    inputEyesElement.value = eyesColor;
  });

  wizardFireballElement.addEventListener('click', function () {
    var fireballColor = fireballs[generateRandomFireball()];
    wizardFireballElement.style.backgroundColor = fireballColor;
    inputFireballElement.value = fireballColor;
  });
})();
