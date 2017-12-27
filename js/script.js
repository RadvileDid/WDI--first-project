$(() => {

  const $playButton = $('.playButton');
  const $screen1 = $('.screen1');
  const $screen2 = $('.screen2');
  const $screen3 = $('.screen3');


  //sounds for win or loose
  const woohooSound = new Audio('audio/woohoo.mp3');
  woohooSound.src = 'audio/woohoo.mp3';

  const whySound = new Audio('audio/why.mp3');
  whySound.src = 'audio/why.mp3';

  //play options/buttons
  const $foodButton = $('.food-button');
  const $sleepButton = $('.sleep-button');
  const $buttonWork = $('.work-button');

  // clicking on the start button hides the screen 1
  const $easyButton = $('.easyButton');
  const $hardButton = $('.hardButton');

  $easyButton.on('click', easyMode);
  $hardButton.on('click', hardMode);


  // functions for the modes easy or hard selections
  function easyMode() {
    $screen1.addClass('hidden');
    $screen2.removeClass('hidden');
    $foodButton.on('click', foodBarEasy);
    $sleepButton.on('click', sleepBarEasy);
    $buttonWork.on('click', moneyBarEasy);
  }

  function hardMode() {
    $screen1.addClass('hidden');
    $screen2.removeClass('hidden');
    $foodButton.on('click', foodBarHard);
    $sleepButton.on('click', sleepBarHard);
    $buttonWork.on('click', moneyBarHard);
  }

  // clicked button play - the timer sets off, the status bars start to decrease automatically end the play button disappears
  $playButton.on('click', play);

  function play() {
    timer();
    statBarsAuto();
    $playButton.css('display', 'none');
    $buttonWork.removeAttr('disabled');
    $sleepButton.removeAttr('disabled');
    $foodButton.removeAttr('disabled');
  }

  // timer function - set's the time off from 60 to 0 seconds and stops once 0 is reached, clears the interval
  const $timer = $('.timer');
  let timeRemaining = 60;
  $timer.text(timeRemaining);
  let timerInterval;

  function timer() {
    $timer.addClass('animated infinite flash');
    timerInterval = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);
      if (timeRemaining === 0){
        clearTimerInterval();
        winLoose();
      }
    }, 1000);
  }

  function clearTimerInterval() {
    clearInterval(timerInterval);
  }

  // all 3 status bars will start decreasing automatically using the intervals set
  function statBarsAuto() {
    moneyBarAuto();
    energyBarAuto();
    foodBarAuto();
  }

  //money status bar, decreasing automatically and if the bar reached 0, loose event is executed
  let moneyRemaining = 100;
  const $moneyBar = $('.moneyBar');
  let newMoneyHeight;
  let moneyAutoInterval;

  function moneyBarAuto() {
    moneyAutoInterval = setInterval(moneyBarAutoUpdate, 1000);
  }

  function moneyBarAutoUpdate() {
    moneyRemaining = moneyRemaining - 2;
    moneyBarUpdate();
    if ((moneyRemaining === 0) || (moneyRemaining < 1)) {
      clearMoneyInterval();
      winLoose();
    }
  }

  function moneyBarUpdate() {
    newMoneyHeight= moneyRemaining + '%' ;
    $moneyBar.css('height', newMoneyHeight);
  }

  function clearMoneyInterval() {
    clearInterval(moneyAutoInterval);
  }

  //energy status bar, decreasing automatically  and if the bar reached 0, loose event is executed
  let energyRemaining = 100;
  const $energyBar = $('.energyBar');
  let newEnergyHeight;
  let energyAutoInterval;

  function energyBarAuto() {
    energyAutoInterval = setInterval(energyBarAutoUpdate , 1000);
  }

  function energyBarAutoUpdate() {
    energyRemaining= energyRemaining - 4;
    energyBarUpdate();
    if ((energyRemaining === 0) || (energyRemaining < 1)) {
      clearEnergyInterval();
      winLoose();
    }
  }

  function energyBarUpdate() {
    newEnergyHeight = energyRemaining + '%' ;
    $energyBar.css('height', newEnergyHeight);
  }

  function clearEnergyInterval() {
    clearInterval(energyAutoInterval);
  }

  //food status bar, decreasing automatically  and if the bar reached 0, loose event is executed
  let foodRemaining = 100;
  const $foodBar = $('.foodBar');
  let newFoodHeight;
  let foodAutoInterval;

  function foodBarAuto() {
    foodAutoInterval = setInterval(foodBarAutoUpdate, 1000);
  }

  function foodBarUpdate() {
    newFoodHeight = foodRemaining + '%' ;
    $foodBar.css('height', newFoodHeight);
  }

  function foodBarAutoUpdate() {
    foodRemaining = foodRemaining - 2;
    foodBarUpdate();
    if ((foodRemaining === 0) || (foodRemaining < 1)) {
      clearFoodInterval();
      winLoose();
    }
  }

  function clearFoodInterval() {
    clearInterval(foodAutoInterval);
  }

  // play buttons - EASY mode
  // Work button adds money and removes energy
  function moneyBarEasy() {
    if (moneyRemaining >= 100) {
      return;
    } else {
      moneyRemaining= moneyRemaining + 4;
      moneyBarUpdate();
      energyRemaining = energyRemaining - 2;
      energyBarUpdate();
    }
  }

  // sleep button adds energy removes money and foodBar
  function sleepBarEasy() {
    if (energyRemaining >= 100) {
      return;
    } else {
      energyRemaining= energyRemaining + 4;
      energyBarUpdate();
      moneyRemaining= moneyRemaining - 2;
      moneyBarUpdate();
      foodRemaining= foodRemaining - 2;
      foodBarUpdate();
    }
  }

  // food button adds to the food bar but removes money
  function foodBarEasy() {
    if (foodRemaining >= 100) {
      return;
    } else {
      foodRemaining= foodRemaining + 4;
      foodBarUpdate();
      moneyRemaining= moneyRemaining - 2;
      moneyBarUpdate();
    }
  }

  // play buttons - HARD mode
  // Work button adds money and removes energy
  function moneyBarHard() {
    if (moneyRemaining >= 100) {
      return;
    } else {
      moneyRemaining= moneyRemaining + 6;
      moneyBarUpdate();
      energyRemaining = energyRemaining - 4;
      energyBarUpdate();
    }
  }

  // sleep button adds energy removes money and foodBar
  function sleepBarHard() {
    if (energyRemaining >= 100) {
      return;
    } else {
      energyRemaining= energyRemaining + 6;
      energyBarUpdate();
      moneyRemaining= moneyRemaining - 4;
      moneyBarUpdate();
      foodRemaining= foodRemaining - 4;
      foodBarUpdate();
    }
  }

  // food button adds to the food bar but removes money
  function foodBarHard() {
    if (foodRemaining >= 100) {
      return;
    } else {
      foodRemaining= foodRemaining + 4;
      foodBarUpdate();
      moneyRemaining= moneyRemaining - 4;
      moneyBarUpdate();
    }
  }

  //winning/loosing conditions and functions, displaying result, img and the sound
  const $winLooseResult = $('.winLooseResult');
  let newText = '';
  $winLooseResult.text(newText);

  function hidescreen2addScreen3() {
    $screen2.addClass('hidden');
    $screen3.removeClass('hidden');
  }

  function winLoose() {
    if( (foodRemaining <= 0) || ( moneyRemaining <= 0) || (energyRemaining <= 0)) {
      stop();
      hidescreen2addScreen3();
      win();
      $timer.removeClass('animated infinite flash');
    } else if ((timeRemaining === 0) && ((foodRemaining > 0) && ( moneyRemaining > 0) || (energyRemaining > 0))) {
      stop();
      hidescreen2addScreen3();
      loose();
      $timer.removeClass('animated infinite flash');
    }
  }

  function stop() {
    clearTimerInterval();
    clearEnergyInterval();
    clearMoneyInterval();
    clearFoodInterval();
  }

  const $winImg = $('.winImg');
  const $looseImg = $('.looseImg');

  function win() {
    whySound.play();
    newText = 'Doh, why you little $%@8*, you lost!';
    $winLooseResult.text(newText);
    $looseImg.removeClass('hidden');
  }

  function loose() {
    woohooSound.play();
    newText = 'Woohoo, you won! Well done';
    $winLooseResult.text(newText);
    $winImg.removeClass('hidden');
  }

  //home button clicked resets the remaining amounts in bars, resets the timer, hides shown result images and changes display
  const $homeButton = $('.homeButton');
  $homeButton.on('click', homeClicked);

  function homeClicked() {
    $screen1.removeClass('hidden');
    $playButton.css('display', '');
    $screen3.addClass('hidden');
    resetEnergy();
    resetFood();
    resetMoney();
    resetTimer();
    $winImg.addClass('hidden');
    $looseImg.addClass('hidden');
    $buttonWork.attr('disabled', 'disabled');
    $sleepButton.attr('disabled', 'disabled');
    $foodButton.attr('disabled', 'disabled');
  }

  function resetMoney() {
    moneyRemaining = 100;
    newMoneyHeight= moneyRemaining + '%' ;
    $moneyBar.css('height', newMoneyHeight);
  }

  function resetEnergy() {
    energyRemaining = 100;
    newEnergyHeight= energyRemaining + '%' ;
    $energyBar.css('height', newEnergyHeight);
  }

  function resetFood() {
    foodRemaining = 100;
    newFoodHeight= foodRemaining + '%' ;
    $foodBar.css('height', newFoodHeight);
  }

  function resetTimer() {
    timeRemaining = 60;
    $timer.text(timeRemaining);
  }

});
