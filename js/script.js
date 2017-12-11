$(() => {

  console.log('I am running');

  const $playButton = $('.playButton');

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

  function timer() {
    const timerInterval = setInterval(() => {
      timeRemaining--;
      $timer.text(timeRemaining);
      console.log(timeRemaining);
      if (timeRemaining === 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

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

  function moneyBarAuto() {
    const moneyAutoInterval = setInterval(() => {
      moneyRemaining = moneyRemaining - 5;
      $moneyBar.text(moneyRemaining);
      console.log(moneyRemaining);
      newMoneyWidth= moneyRemaining + '%' ;
      $moneyBar.css('width', newMoneyWidth);

      if (moneyRemaining === 0) {
        clearInterval(moneyAutoInterval);
      }
    }, 1000);
  }

  //energy status bar, decreasing automatically. will need to add that if one of the bars reaches 0, the window 3/loose comes is shown
  let energyRemaining = 100;
  const $energyBar = $('.energyBar');
  $energyBar.text(energyRemaining);
  let newEnergyWidth;

  function energyBarAuto() {
    const energyAutoInterval = setInterval(() => {
      energyRemaining= energyRemaining - 10;
      $energyBar.text(energyRemaining);
      newEnergyWidth = energyRemaining + '%' ;
      $energyBar.css('width', newEnergyWidth);

      if (energyRemaining === 0) {
        clearInterval(energyAutoInterval);
      }
    }, 1000);
  }

  //food status bar, decreasing automatically
  let foodRemaining = 100;
  const $foodBar = $('.foodBar');
  $foodBar.text(foodRemaining);
  let newFoodWidth;

  function foodBarAuto() {
    const foodAutoInterval = setInterval(() => {
      foodRemaining = foodRemaining - 5;
      $foodBar.text(foodRemaining);
      newFoodWidth = foodRemaining + '%' ;
      $foodBar.css('width', newFoodWidth);

      if (foodRemaining === 0) {
        clearInterval(foodAutoInterval);
      }
    }, 1000);
  }

  // play buttons
  // Work button adds money and removes energy
  const $buttonWork = $('.workButton');

  $buttonWork.on('click', function() {
    moneyRemaining= moneyRemaining + 7;
    $moneyBar.text(moneyRemaining);

    $moneyBar.css('width', newMoneyWidth);
    console.log(`work added ${moneyRemaining}`);

    energyRemaining = energyRemaining - 7;
    $energyBar.text(energyRemaining);
    // newEnergyWidth= newEnergyWidth + '%' ;
    // $energyBar.css('width', newEnergyWidth);
    console.log(`work removed ${energyRemaining}`);
  });

  // sleep button adds energy removes money and foodBar
  const $sleepButton = $('.sleepButton');

  $sleepButton.on('click', function() {
    energyRemaining= energyRemaining + 7;
    $energyBar.text(energyRemaining);
    // newEnergyWidth= newEnergyWidth + '%' ;
    // $energyBar.css('width', newEnergyWidth);
    console.log(`sleep added ${energyRemaining}`);

    moneyRemaining= moneyRemaining - 7;
    $moneyBar.text(moneyRemaining);
    // newMoneyWidth= newMoneyWidth + '%' ;
    // $moneyBar.css('width', newMoneyWidth);
    console.log(`sleep removed ${moneyRemaining}`);

    foodRemaining= foodRemaining - 7;
    $foodBar.text(foodRemaining);
    // newFoodWidth= foodRemaining + '%' ;
    // $foodBar.css('width', newFoodWidth);
    console.log(`sleep removed ${foodRemaining}`);
  });

  // foot button adds to the food bar but removes money
  const $foodButton = $('.foodButton');

  $foodButton.on('click', function() {
    foodRemaining= foodRemaining + 7;
    $foodBar.text(foodRemaining);
    // newFoodWidth= foodRemaining + '%' ;
    // $foodBar.css('width', newFoodWidth);
    console.log(`eating added ${foodRemaining}`);

    moneyRemaining= moneyRemaining - 7;
    $moneyBar.text(moneyRemaining);
    // newMoneyWidth= newMoneyWidth + '%' ;
    // $moneyBar.css('width', newMoneyWidth);
    console.log(`eating removed ${moneyRemaining}`);
  });

});
