'use strict';

(function () {
  var COAT_COLORS = window.form.COLORS.COAT;

  var EYES_COLORS = window.form.COLORS.EYES;

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  var wizardElement = document.querySelector('.setup-wizard');

  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  wizardCoatElement.addEventListener('click', function () {
    var newColor = getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  wizardEyesElement.addEventListener('click', function () {
    var newColor = getRandomElement(EYES_COLORS);
    wizardCoatElement.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  window.wizard = wizard;
})();
