(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  var startTime;
  var elapsedTime = 0;
  var timerId;

  function updateTimerText() {
    var min = Math.floor(elapsedTime / 60000);
    // 文字列と数値を連結すると文字列になる
    min = ("0" + min).slice(-2);
    var sec = Math.floor(elapsedTime % 60000 / 1000);
    // 文字列と数値を連結すると文字列になる
    sec = ("0" + sec).slice(-2);
    var m_sec = elapsedTime % 1000;
    // 文字列と数値を連結すると文字列になる
    m_sec = ("00" + m_sec).slice(-3);
    timer.textContent = min + ':' + sec + '.' + m_sec;
  }

  function countUp() {
    timerId = setTimeout(function() {
      elapsedTime = Date.now() - startTime;
      updateTimerText();
      countUp();
    }, 10);
  };

  // startボタンの処理
  start.addEventListener('click', function() {
    startTime = Date.now();
    countUp();
  });

  // stopボタンの処理
  stop.addEventListener('click', function() {
    clearTimeout(timerId);
  });

  // resetボタンの処理
  reset.addEventListener('click', function() {
    elapsedTime = 0;
    updateTimerText();cd
  });
})();
