'use strict';

(function () {
  var setupSimilarElement = window.setup.setupBlockElement.querySelector('.setup-similar');
  var similarListElement = setupSimilarElement.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  window.render = function (wizard) {
    var wizardsCount = wizard.length > 4 ? 4 : wizard.length;
    var fragment = document.createDocumentFragment();

    if (similarListElement.firstChild) {
      var child = similarListElement.firstChild;
      while (child) {
        similarListElement.removeChild(child);
        child = similarListElement.firstChild;
      }
    }

    for (var i = 0; i < wizardsCount; i++) {
      fragment.appendChild(renderWizard(wizard[i]));
    }

    similarListElement.appendChild(fragment);
    setupSimilarElement.classList.remove('hidden');
  };
})();
