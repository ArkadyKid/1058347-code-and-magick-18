'use strict';

var ARRAY_LENGTH = 4;
var userDialogElement = document.querySelector('.setup');
var setupElement = userDialogElement.querySelector('.setup-similar');
var similarListElement = userDialogElement.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();
var namesArray = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnamesArray = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионг', 'Ирвинг'];
var coatColorArray = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArray = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardsArray = [];

var generateRandomNumber = function (array) {
  return Math.floor(Math.random() * array.length);
};

var generateWizards = function () {
  for (var i = 0; i < ARRAY_LENGTH; i++) {
    wizardsArray[i] = {
      name: namesArray[generateRandomNumber(namesArray)],
      surname: surnamesArray[generateRandomNumber(surnamesArray)],
      coatColor: coatColorArray[generateRandomNumber(coatColorArray)],
      eyesColor: eyesColorArray[generateRandomNumber(eyesColorArray)],
    };
  }
  return wizardsArray;
};

generateWizards();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

for (var i = 0; i < ARRAY_LENGTH; i++) {
  fragment.appendChild(renderWizard(wizardsArray[i]));
}

similarListElement.appendChild(fragment);
userDialogElement.classList.remove('hidden');
setupElement.classList.remove('hidden');
