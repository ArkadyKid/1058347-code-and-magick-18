'use strict';

(function () {

  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var TEXT_X = 120;
  var TEXT_Y = 40;
  var GAP = 10;
  var FONT_GAP = 15;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var MAX_BAR_HEIGHT = 150;
  var messageArray = ['Ура вы победили!', 'Список результатов:'];
  var messageFont = '16px PT Mono';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(CLOUD_WIDTH + x, y);
    ctx.lineTo(CLOUD_WIDTH + x, CLOUD_HEIGHT + y);
    ctx.lineTo(x, CLOUD_HEIGHT + y);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  };

  var renderText = function (ctx, x, y, text, font) {
    ctx.font = font;
    for (var i = 0; i < messageArray.length; i++) {
      ctx.fillText(text[i], x, y + FONT_GAP * i);
    }
  };

  var getMaxElement = function (arr) {
    if (arr.length !== 0) {
      var maxElement = arr[0];
      for (var i = 1; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          arr[i] = maxElement;
        }
      }
      return maxElement;
    }
    return null;
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
    ctx.fillStyle = '#000000';
    renderText(ctx, TEXT_X, TEXT_Y, messageArray, messageFont);
    var maxTime = getMaxElement(times);
    for (var i = 0; i < names.length; i++) {
      var barHeight = (MAX_BAR_HEIGHT * times[i]) / maxTime;
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - barHeight - FONT_GAP * 2, BAR_WIDTH, barHeight);
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%' + ', 50%)';
        ctx.fillRect(TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - barHeight - FONT_GAP * 2, BAR_WIDTH, barHeight);
      }
      ctx.fillStyle = '#000000';
      ctx.fillText(names[i], TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
      ctx.fillText(Math.round(times[i]), TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - barHeight - FONT_GAP * 3);
    }
  };
})();
