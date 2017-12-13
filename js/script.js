$(() => {

  console.log('I am running');

  const $playButton = $('.playButton');
  const $screen1 = $('.screen1');
  const $screen2 = $('.screen2');
  const $screen3 = $('.screen3');


  //sound
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

  ////// clicked button play - the timer sets off, the status bars start to decrease automatically end the play button disappears
  $playButton.on('click', play);

  function play() {
    timer();
    statBarsAuto();
    $playButton.css('display', 'none');
    $buttonWork.removeAttr('disabled');
    $sleepButton.removeAttr('disabled');
    $foodButton.removeAttr('disabled');
  }

  // timer function - set's the time off from 60 to 0 seconds and stops once 0 is reached
  const $timer = $('.timer');
  let timeRemaining = 60;
  $timer.text(timeRemaining);

  let timerInterval;

  function timer() {
    $timer.addClass('animated infinite flash');
    timerInterval = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);
      console.log(timeRemaining);
      if (timeRemaining === 0){
        clearTimerInterval();
        winLoose();
      }
    }, 1000);
  }

  function clearTimerInterval() {
    clearInterval(timerInterval);
  }

  /////////////////
  function statBarsAuto() {
    moneyBarAuto();
    energyBarAuto();
    foodBarAuto();
  }

  //money status bar, decreasing automatically

  let moneyRemaining = 100;
  const $moneyBar = $('.moneyBar');
  $moneyBar.text(moneyRemaining);
  let newMoneyWidth;

  let moneyAutoInterval;

  function moneyBarAuto() {
    moneyAutoInterval = setInterval(() => {
      moneyRemaining = moneyRemaining - 2;
      $moneyBar.text(moneyRemaining);
      console.log(moneyRemaining);
      newMoneyWidth= moneyRemaining + '%' ;
      $moneyBar.css('width', newMoneyWidth);

      if ((moneyRemaining === 0) || (moneyRemaining < 1)) {
        clearMoneyInterval();
        winLoose();
      }
    }, 1000);
  }

  function clearMoneyInterval() {
    clearInterval(moneyAutoInterval);
  }

  //energy status bar, decreasing automatically.
  let energyRemaining = 100;
  const $energyBar = $('.energyBar');
  $energyBar.text(energyRemaining);
  let newEnergyWidth;

  let energyAutoInterval;

  function energyBarAuto() {
    energyAutoInterval = setInterval(() => {
      energyRemaining= energyRemaining - 4;
      $energyBar.text(energyRemaining);
      newEnergyWidth = energyRemaining + '%' ;
      $energyBar.css('width', newEnergyWidth);

      if ((energyRemaining === 0) || (energyRemaining < 1)) {
        clearEnergyInterval();
        winLoose();
      }
    }, 1000);
  }

  function clearEnergyInterval() {
    clearInterval(energyAutoInterval);
  }

  //food status bar, decreasing automatically
  let foodRemaining = 100;
  const $foodBar = $('.foodBar');
  $foodBar.text(foodRemaining);
  let newFoodWidth;

  let foodAutoInterval;

  function foodBarAuto() {
    foodAutoInterval = setInterval(() => {
      foodRemaining = foodRemaining - 2;
      $foodBar.text(foodRemaining);
      newFoodWidth = foodRemaining + '%' ;
      $foodBar.css('width', newFoodWidth);

      if ((foodRemaining === 0) || (foodRemaining < 1)) {
        clearFoodInterval();
        winLoose();
      }
    }, 1000);
  }

  function clearFoodInterval() {
    clearInterval(foodAutoInterval);
  }

  //////////////////////////////////// play buttons EASY mode
  // Work button adds money and removes energy
  function moneyBarEasy() {
    moneyRemaining= moneyRemaining + 4;
    $moneyBar.text(moneyRemaining);
    console.log(`work added ${moneyRemaining} money (added)`);

    energyRemaining = energyRemaining - 2;
    $energyBar.text(energyRemaining);
    console.log(`work removed ${energyRemaining} energy (removed)`);
  }

  // sleep button adds energy removes money and foodBar
  function sleepBarEasy() {
    energyRemaining= energyRemaining + 4;
    $energyBar.text(energyRemaining);
    console.log(`after sleep, new energy is ${energyRemaining} (added)`);

    moneyRemaining= moneyRemaining - 2;
    $moneyBar.text(moneyRemaining);
    console.log(`after sleep, new money is ${moneyRemaining} (removed)`);

    foodRemaining= foodRemaining - 2;
    $foodBar.text(foodRemaining);
    console.log(`after sleep, new food is ${foodRemaining} (removed)`);
  }

  // food button adds to the food bar but removes money
  function foodBarEasy() {
    foodRemaining= foodRemaining + 4;
    $foodBar.text(foodRemaining);
    console.log(`after eating, new food is ${foodRemaining} (added)`);

    moneyRemaining= moneyRemaining - 2;
    $moneyBar.text(moneyRemaining);
    console.log(`after eating, new money is ${moneyRemaining} (removed)`);
  }

  //////////////////////////////////// play buttons HARD mode
  // Work button adds money and removes energy
  function moneyBarHard() {
    moneyRemaining= moneyRemaining + 6;
    $moneyBar.text(moneyRemaining);
    console.log(`work added ${moneyRemaining} money (added)`);

    energyRemaining = energyRemaining - 4;
    $energyBar.text(energyRemaining);
    console.log(`work removed ${energyRemaining} energy (removed)`);
  }

  // sleep button adds energy removes money and foodBar
  function sleepBarHard() {
    energyRemaining= energyRemaining + 6;
    $energyBar.text(energyRemaining);
    console.log(`after sleep, new energy is ${energyRemaining} (added)`);

    moneyRemaining= moneyRemaining - 4;
    $moneyBar.text(moneyRemaining);
    console.log(`after sleep, new money is ${moneyRemaining} (removed)`);

    foodRemaining= foodRemaining - 4;
    $foodBar.text(foodRemaining);
    console.log(`after sleep, new food is ${foodRemaining} (removed)`);
  }

  // food button adds to the food bar but removes money
  function foodBarHard() {
    foodRemaining= foodRemaining + 4;
    $foodBar.text(foodRemaining);
    console.log(`after eating, new food is ${foodRemaining} (added)`);

    moneyRemaining= moneyRemaining - 4;
    $moneyBar.text(moneyRemaining);
    console.log(`after eating, new money is ${moneyRemaining} (removed)`);
  }

  //winning/loosing conditions, displaying result, img and the sound
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

  function win() {
    whySound.play();
    newText = 'Doh, why you little $%@8*, you lost!';
    $winLooseResult.text(newText);
    $winLooseResult.after('<img src="img/simpsons_PNG94.png" />');
  }

  function loose() {
    woohooSound.play();
    newText = 'Woohoo, you won!';
    $winLooseResult.text(newText);
    $winLooseResult.after('<img src="img/Homer_simpsonwoohooo.gif" width="380px"/>');
  }


  //screen 3 home button clicked
  const $homeButton = $('.homeButton');
  $homeButton.on('click', homeClicked);

  function homeClicked() {
    $screen1.removeClass('hidden');
    $screen3.addClass('hidden');
    resetEnergy();
    resetFood();
    resetMoney();
    resetTimer();
  }

  function resetMoney() {
    moneyRemaining = 100;
    $moneyBar.text(moneyRemaining);
    newMoneyWidth= moneyRemaining + '%' ;
    $moneyBar.css('width', newMoneyWidth);
  }

  function resetEnergy() {
    energyRemaining = 100;
    $energyBar.text(energyRemaining);
    newEnergyWidth= energyRemaining + '%' ;
    $energyBar.css('width', newEnergyWidth);
  }

  function resetFood() {
    foodRemaining = 100;
    $foodBar.text(foodRemaining);
    newFoodWidth= foodRemaining + '%' ;
    $foodBar.css('width', newFoodWidth);
  }

  function resetTimer() {
    timeRemaining = 60;
    $timer.text(timeRemaining);
  }

});
