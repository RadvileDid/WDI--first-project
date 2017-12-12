$(() => {

  console.log('I am running');

  const $playButton = $('.playButton');
  const $screen1 = $('.screen1');
  const $screen2 = $('.screen2');
  const $screen3 = $('.screen3');

  const woohooSound = new Audio('audio/woohoo.mp3');
  woohooSound.src = 'audio/woohoo.mp3';

  const whySound = new Audio('audio/why.mp3');
  whySound.src = 'audio/why.mp3';

  // let difficulty = 'easy';

  // clicking on the start button hides the screen 1

  const $startButton = $('.startButton');

  $startButton.on('click', hidescreen1addScreen2);

  function hidescreen1addScreen2() {
    $screen1.addClass('hidden');
    $screen2.removeClass('hidden');
  }

  //////

  $playButton.on('click', play);

  function play() {
    timer();
    statBarsAuto();
    $playButton.css('display', 'none');
  }

  // timer function - set's the time off from 60 to 0 seconds and stops once 0 is reached
  const $timer = $('.timer');
  let timeRemaining = 60;
  $timer.text(timeRemaining);

  let timerInterval;

  function timer() {
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

  ///// Status Bars

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

  // play buttons
  // Work button adds money and removes energy
  const $buttonWork = $('.workButton');

  $buttonWork.on('click', function() {
    moneyRemaining= moneyRemaining + 4;
    $moneyBar.text(moneyRemaining);
    // $moneyBar.css('width', newMoneyWidth);
    console.log(`work added ${moneyRemaining} money (added)`);

    energyRemaining = energyRemaining - 2;
    $energyBar.text(energyRemaining);
    console.log(`work removed ${energyRemaining} energy (removed)`);
  });

  // sleep button adds energy removes money and foodBar
  const $sleepButton = $('.sleepButton');

  $sleepButton.on('click', function() {
    energyRemaining= energyRemaining + 4;
    $energyBar.text(energyRemaining);
    console.log(`after sleep, new energy is ${energyRemaining} (added)`);

    moneyRemaining= moneyRemaining - 2;
    $moneyBar.text(moneyRemaining);
    console.log(`after sleep, new money is ${moneyRemaining} (removed)`);

    foodRemaining= foodRemaining - 2;
    $foodBar.text(foodRemaining);
    console.log(`after sleep, new food is ${foodRemaining} (removed)`);
  });

  // food button adds to the food bar but removes money
  const $foodButton = $('.foodButton');

  $foodButton.on('click', function() {
    foodRemaining= foodRemaining + 4;
    $foodBar.text(foodRemaining);
    console.log(`after eating, new food is ${foodRemaining} (added)`);

    moneyRemaining= moneyRemaining - 2;
    $moneyBar.text(moneyRemaining);
    console.log(`after eating, new money is ${moneyRemaining} (removed)`);
  });

  //

  function stop() {
    clearTimerInterval();
    clearEnergyInterval();
    clearMoneyInterval();
    clearFoodInterval();
  }


  //winning/loosing conditions
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
      whySound.play();
      newText = 'Doh, why you little $%@8*, you lost!';
      $winLooseResult.text(newText);
      $winLooseResult.after('<img src="img/simpsons_PNG94.png" />');
    } else if ((timeRemaining === 0) && ((foodRemaining > 0) && ( moneyRemaining > 0) || (energyRemaining > 0))) {
      stop();
      hidescreen2addScreen3();
      woohooSound.play();
      newText = 'Woohoo, you won!';
      $winLooseResult.text(newText);
      $winLooseResult.after('<img src="img/Homer_simpsonwoohooo.gif" width="140px" height="150px"/>');
    }
  }

  const $playAgainButton = $('.playAgainButton');

  $playAgainButton.on('click', playAgainClicked);

  function playAgainClicked() {
    $screen2.removeClass('hidden');
    $screen3.addClass('hidden');
  }

  const $homeButton = $('.homeButton');

  $homeButton.on('click', homeClicked);

  function homeClicked() {
    $screen1.removeClass('hidden');
    $screen3.addClass('hidden');
  }

});
