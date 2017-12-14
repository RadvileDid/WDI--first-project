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
  const $foodButton = $('.foodButton');
  const $sleepButton = $('.sleepButton');
  const $buttonWork = $('.workButton');

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
  let newMoneyWidth;
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
    newMoneyWidth= moneyRemaining + '%' ;
    $moneyBar.css('width', newMoneyWidth);
  }

  function clearMoneyInterval() {
    clearInterval(moneyAutoInterval);
  }

  //energy status bar, decreasing automatically  and if the bar reached 0, loose event is executed
  let energyRemaining = 100;
  const $energyBar = $('.energyBar');
  let newEnergyWidth;
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
    newEnergyWidth = energyRemaining + '%' ;
    $energyBar.css('width', newEnergyWidth);
  }

  function clearEnergyInterval() {
    clearInterval(energyAutoInterval);
  }

  //food status bar, decreasing automatically  and if the bar reached 0, loose event is executed
  let foodRemaining = 100;
  const $foodBar = $('.foodBar');
  let newFoodWidth;
  let foodAutoInterval;

  function foodBarAuto() {
    foodAutoInterval = setInterval(foodBarAutoUpdate, 1000);
  }

  function foodBarAutoUpdate() {
    foodRemaining = foodRemaining - 2;
    foodBarUpdate();
    if ((foodRemaining === 0) || (foodRemaining < 1)) {
      clearFoodInterval();
      winLoose();
    }
  }

  function foodBarUpdate() {
    newFoodWidth = foodRemaining + '%' ;
    $foodBar.css('width', newFoodWidth);
  }

  function clearFoodInterval() {
    clearInterval(foodAutoInterval);
  }

  // play buttons - EASY mode
  // Work button adds money and removes energy
  function moneyBarEasy() {
    moneyRemaining= moneyRemaining + 4;
    moneyBarUpdate();
    energyRemaining = energyRemaining - 2;
    energyBarUpdate();
  }

  // sleep button adds energy removes money and foodBar
  function sleepBarEasy() {
    energyRemaining= energyRemaining + 4;
    energyBarUpdate();
    moneyRemaining= moneyRemaining - 2;
    moneyBarUpdate();
    foodRemaining= foodRemaining - 2;
    foodBarUpdate();
  }

  // food button adds to the food bar but removes money
  function foodBarEasy() {
    foodRemaining= foodRemaining + 4;
    foodBarUpdate();
    moneyRemaining= moneyRemaining - 2;
    moneyBarUpdate();
  }

  // play buttons - HARD mode
  // Work button adds money and removes energy
  function moneyBarHard() {
    moneyRemaining= moneyRemaining + 6;
    moneyBarUpdate();
    energyRemaining = energyRemaining - 4;
    energyBarUpdate();
  }

  // sleep button adds energy removes money and foodBar
  function sleepBarHard() {
    energyRemaining= energyRemaining + 6;
    energyBarUpdate();
    moneyRemaining= moneyRemaining - 4;
    moneyBarUpdate();
    foodRemaining= foodRemaining - 4;
    foodBarUpdate();
  }

  // food button adds to the food bar but removes money
  function foodBarHard() {
    foodRemaining= foodRemaining + 4;
    foodBarUpdate();
    moneyRemaining= moneyRemaining - 4;
    moneyBarUpdate();
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
    newMoneyWidth= moneyRemaining + '%' ;
    $moneyBar.css('width', newMoneyWidth);
  }

  function resetEnergy() {
    energyRemaining = 100;
    newEnergyWidth= energyRemaining + '%' ;
    $energyBar.css('width', newEnergyWidth);
  }

  function resetFood() {
    foodRemaining = 100;
    newFoodWidth= foodRemaining + '%' ;
    $foodBar.css('width', newFoodWidth);
  }

  function resetTimer() {
    timeRemaining = 60;
    $timer.text(timeRemaining);
  }

});
