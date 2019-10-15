'use strict';

(function () {
  var merlin = {
    onEyesChange: function (color) {
    },
    onCoatChange: function (color) {
    }
  };

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var coatColor;
  var eyesColor;

  var getRank = function (wizards) {
    var rank = 0;

    if (wizards.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizards.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(window.wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name - right.name);
      }
      return rankDiff;
    }));
  };

  merlin.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  merlin.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  var successHandler = function (data) {
    window.wizards = data;
    updateWizards();
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  wizardCoatElement.addEventListener('click', function (wizards) {
    var newColor = wizards.colorCoat;
    this.style.fill = newColor;
    merlin.onCoatChange(newColor);
  });

  wizardEyesElement.addEventListener('click', function (wizards) {
    var newColor = wizards.colorEyes;
    this.style.fill = newColor;
    merlin.onEyesChange(newColor);
  });
})();
