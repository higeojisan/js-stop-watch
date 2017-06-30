(function() {
  'use strict';

  var timer = document.getElementById('timer');
  var start = document.getElementById('start');
  var stop = document.getElementById('stop');
  var reset = document.getElementById('reset');

  var startTime;
  var elapsedTime = 0;
  var timerId;
  var last_elapsedTime = 0;
  var isRunning = false;

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
      elapsedTime = Date.now() - startTime + last_elapsedTime;
      updateTimerText();
      countUp();
    }, 10);
  };

  function updateButtonState(startButtonState, stopButtonState, resetButtonState) {
    start.className = startButtonState ? 'btn' : 'btn disabled';
    stop.className = stopButtonState ? 'btn' : 'btn disabled';
    reset.className = resetButtonState ? 'btn' : 'btn disabled';
  }

  updateButtonState(true, false, false);

  // startボタンの処理
  start.addEventListener('click', function() {
    if (isRunning) {
      return false;
    }
    startTime = Date.now();
    isRunning = true;
    updateButtonState(false, true, false);
    countUp();
  });

  // stopボタンの処理
  stop.addEventListener('click', function() {
    if (isRunning === false) {
      return false;
    }
    clearTimeout(timerId);
    last_elapsedTime += Date.now() - startTime;
    isRunning = false;
    updateButtonState(true, false, true)
  });

  // resetボタンの処理
  reset.addEventListener('click', function() {
    if (isRunning) {
      return false;
    }
    elapsedTime = 0;
    last_elapsedTime = 0;
    updateTimerText();
    updateButtonState(true, false, false);
  });
})();
