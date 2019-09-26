'use strict';

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var ARRAY_LENGTH = 4;
var userDialogElement = document.querySelector('.setup');
var similarListElement = userDialogElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var setupOpenElement = document.querySelector('.setup-open');
var setupBlockElement = document.querySelector('.setup');
var setupCloseElement = setupBlockElement.querySelector('.setup-close');
var setupOpenIconElement = setupOpenElement.querySelector('.setup-open-icon');
var setupUserNameElement = document.querySelector('.setup-user-name');
var setupPlayerElement = document.querySelector('.setup-player');
var wizardCoatElement = setupPlayerElement.querySelector('.wizard-coat');
var wizardEyeElement = setupPlayerElement.querySelector('.wizard-eyes');
var wizardFireballElement = setupPlayerElement.querySelector('.setup-fireball');
var inputCoatElement = setupPlayerElement.querySelector('input[name=coat-color]');
var inputEyesElement = setupPlayerElement.querySelector('input[name=eyes-color]');
var inputFireballElement = setupPlayerElement.querySelector('input[name=fireball-color]');
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионг', 'Ирвинг'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizards = [];

var generateRandomNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};

var generateWizards = function () {
  for (var i = 0; i < ARRAY_LENGTH; i++) {
    wizards[i] = {
      name: names[generateRandomNumber(names)],
      surname: surnames[generateRandomNumber(surnames)],
      coatColor: coatColors[generateRandomNumber(coatColors)],
      eyesColor: eyesColors[generateRandomNumber(eyesColors)],
    };
  }
  return wizards;
};

var generateRandomCoat = function () {
  return Math.round(Math.random() * coatColors.length);
};

var generateRandomEye = function () {
  return Math.round(Math.random() * eyesColors.length);
};

var generateRandomFireball = function () {
  return Math.round(Math.random() * fireballs.length);
};

generateWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE && evt.target !== setupUserNameElement) {
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

for (var i = 0; i < ARRAY_LENGTH; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);

setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupOpenIconElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closePopup();
  }
});

wizardCoatElement.addEventListener('click', function () {
  wizardCoatElement.style.fill = coatColors[generateRandomCoat()];
  inputCoatElement.value = wizardCoatElement.style.fill;
});

wizardEyeElement.addEventListener('click', function () {
  wizardEyeElement.style.fill = eyesColors[generateRandomEye()];
  inputEyesElement.value = wizardEyeElement.style.fill;
});

wizardFireballElement.addEventListener('click', function () {
  wizardFireballElement.style.backgroundColor = fireballs[generateRandomFireball()];
  inputFireballElement.value = wizardFireballElement.style.backgroundColor;
});

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
