##General Asembly project 1

For this project I have built my very own, very first game called **Keep Homer Alive**!

#### My approach and game logics

To buil this game, I firstly made a plan of the game logic, what actions the player would need to select/perform and this helped me to create the wireframes for the main 3 design screens/stages needed.

Here are the 3 wireframes I made:
<img src="https://i.imgur.com/w4X6h4J.png"> 

During the coding process, especially when I started adding the styles I realised not all the decisions made were that good therefore decided to have this updated and the final result is **below**.

Home window with instructions and start buttons:

<img src="https://i.imgur.com/vQTAbwG.png" width="500px"> 

Once the preferred mode is selected, the first stage of the game loads:

<img src="https://i.imgur.com/NfmGjUl.png" width="500px"> 

Once the button play is clicked, it disappears and the 60 seconds timer, as well as the status bars set off and start decreasing. 

As the status bars decrease automatically, in order to survibe the 60 seconds you would need to click on the relevant button to fill that status bar.

If the player clicks on **Go to work** button, he will have more money but loose some energy. If the button clicked is **Go to sleep**, he will have more energy but will loose both money and will get more hungry.

If the player clicks on **Eat a doughnut**, he will be less hungry but it will cost him money.

<img src="https://i.imgur.com/2FCOXNb.png" width="500px"> 

If 60 seconds ended and all 3 status bars had some resources left, the player wins the game and the win result is shown.

<img src="https://i.imgur.com/TQMugcP.png" width="500px"> 

However, if one (or more) status bars decreases to 0 / empties, player lost!

<img src="https://i.imgur.com/IttQGo5.png" width="500px"> 


### Installation instructions

#####Run locally

- Download or clone the [Github repo](https://github.com/RadvileDid/WDI--first-project)


##### View online

- [View on Heroku](https://keephomeralive.herokuapp.com/)
- [View on Github](https://github.com/RadvileDid/WDI--first-project) 

####Technologies used
- HTML5
- HTML5 Audio
- SCSS
- Javascript (ECMAScript 6)
- jQuery
- Git
- Github
- Heroku

####Unsolved problems

There currently is an issue with the status bars (energy, food and money). When the player clicks on the relevant button, it adds/removes the described value to/from that status bar and it increases/decreases the bar width so the progress can be seen by the player.

However, if the player will click on a button enough times on a one button without a break, the width of that bar can decrease and be more than a 100% of its parent.

Furthermore, even though the game design is responsive, it could certainly be improved, could be more logical and user friendly.

####What's next?

1. I will fix the issue with the status bar width so it does not exceed the 100% width of its parent.
2. I will improve the UI/UX of the game play so that the game action buttons and the status bar are more logical.
3. Will improve the design of the main game screen from 2 columns to 2 rows so that when playing the game on the mobile device, it would seem more logical and easier to navigate.

