'use strict';

(function () {
  var setupSimilarElement = window.setup.setupBlockElement.querySelector('.setup-similar');
  var similarListElement = setupSimilarElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионг', 'Ирвинг'];
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var wizards = [];

  var generateRandomNumber = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var generateWizards = function () {
    for (var i = 0; i < window.util.ARRAY_LENGTH; i++) {
      wizards[i] = {
        name: names[generateRandomNumber(names)],
        surname: surnames[generateRandomNumber(surnames)],
        coatColor: window.form.coatColors[generateRandomNumber(window.form.coatColors)],
        eyesColor: window.form.eyesColors[generateRandomNumber(window.form.eyesColors)],
      };
    }
    return wizards;
  };

  generateWizards();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  for (var i = 0; i < window.util.ARRAY_LENGTH; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  similarListElement.appendChild(fragment);
  setupSimilarElement.classList.remove('hidden');
})();
