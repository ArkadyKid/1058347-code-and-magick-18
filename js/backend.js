'use strict';

(function () {
  var TIMEOUT = 10000;

  var XHR_STATUS = {
    SUCCESS_STATUS: 200,
    INVALID_URL: 500
  };

  var URL = {
    POST: 'https://js.dump.academy/code-and-magick',
    GET: 'https://js.dump.academy/code-and-magick/data'
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style.zIndex = '100';
    node.style.margin = 'o auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
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
        case XHR_STATUS.SUCCESS_STATUS:
          onSuccess(xhr.response);
          break;
        case XHR_STATUS.INVALID_URL:
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

    xhr.timeout = TIMEOUT;
  };

  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('POST', URL.POST);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    setBehaviourResponse(xhr, onSuccess, onError);
    xhr.responseType = 'json';
    xhr.open('GET', URL.GET);
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load,
    errorHandler: errorHandler
  };
})();
