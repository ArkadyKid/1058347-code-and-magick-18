'use strict';

(function () {
  var setupSimilarElement = window.setup.setupBlockElement.querySelector('.setup-similar');
  var similarListElement = setupSimilarElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  // var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионг', 'Ирвинг'];
  // var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

  // var generateRandomNumber = function (array) {
  //   return Math.floor(Math.random() * array.length);
  // };

  // var generateWizards = function () {
  //   for (var i = 0; i < window.util.WIZARD_COUNT; i++) {
  //     wizards[i] = {
  //       name: names[generateRandomNumber(names)],
  //       surname: surnames[generateRandomNumber(surnames)],
  //       coatColor: window.form.coatColors[generateRandomNumber(window.form.coatColors)],
  //       eyesColor: window.form.eyesColors[generateRandomNumber(window.form.eyesColors)],
  //     };
  //   }
  //   return wizards;
  // };

  // generateWizards();

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };
  //
  // for (var i = 0; i < window.util.WIZARD_COUNT; i++) {
  //   fragment.appendChild(renderWizard(wizards[i]));
  // }
  //
  // similarListElement.appendChild(fragment);
  // setupSimilarElement.classList.remove('hidden');

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.util.WIZARDS_COUNT; i++) {
      try {
        fragment.appendChild(renderWizard(wizards[Math.round(Math.random() * wizards.length)]));
      } catch (error) {
        i--;
      }
    }
    similarListElement.appendChild(fragment);
    setupSimilarElement.classList.remove('hidden');
  };
  window.backend.load(successHandler, window.backend.errorHandler);
})();
