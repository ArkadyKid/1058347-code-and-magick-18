'use strict';

(function () {
  var POST_URL = 'https://js.dump.academy/code-and-magick';
  var GET_URL = 'https://js.dump.academy/code-and-magick/data';

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.top = '0';
    node.style.width = '100%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var setBehaviourResponse = function (xhr, onSuccess, onError) {

    var checkError = function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 500:
          onError('Введён неверный URL');
          break;
        default:
          onError('Статус ответа:' + xhr.status + ' ' + xhr.statusText);
      }
    };

    xhr.addEventListener('load', checkError);

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'ms');
    });

    xhr.timeout = 10000;
  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('POST', POST_URL);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('GET', GET_URL);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load,
    errorHandler: errorHandler
  };
})();
