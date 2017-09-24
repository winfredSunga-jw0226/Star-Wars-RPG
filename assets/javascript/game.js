//Pseudocode of Star Wars RPG Game

//keep variables for characters : Luke Skywalker, Anakin Skywalker, Kylo Ren, Darth Maul 
//keep variables for each character's Health Points, Attack Power, Counter Attack Power
//keep variables as well - isCharacterChosen(boolean), isEnemyChosen(boolean), availableEnemies(number)
//There will be 5 sections (or divs), one for each - Your Character, Enemies Available to Attack, Fight Section, Defender, Message Section 
//At the start of game, the characters will all be lined up on the first row, above the Your Character Heading
//each character will have a thumbnail - their names will be show above and the HP will be shown at the bottom
//thumbnails in the Your Character row have a background color of white
//A Star Wars soundtrack plays on the background ***


//Listen for a click event on a character 
  //stop the background music ***
  //If there is no character in the Enemies Available to Attack section (availableEnemies = 0)
    //The character's thumbnail stays on the first section, but it moves under the heading Your Character
    //the other characters move to the 2nd section, underneath the heading Enemies Available to Attack
    //Update the variable availableEnemies to the appropriate number
    //thumbnails in the Enemies Available to Attack row have a background color of red
  // If there is one or more character(s) in the Enemies Available to Attack section (availableEnemies > 0) AND there are is no character in the defender section (isEnemyChosen = false)
    //the chosen character's thumbnail moves to the Defender section (under the Defender heading) 
    //update the value of  isEnemyChosen = true
    //reduce the value of availableEnemies down to 1
    //the thumbnail backgound color in the defender section is black
    //the characters not chosen stay on the 2nd section

//Listen for a click event on the Attack button
  //If there is no character in the Defender section (isEnemyChosen = false)
    //display of the 5th section - "No enemy here."
  //Else
    //play an audio (lightsaber sound)
    //reduce the defender's HP by the attack power of the player's character. Display the player's new HP
    //the defender counter attacks automatically and reduces the player's character HP by the defender's counter attack power. Display the defender's new HP
    //the player's character's attack power increments by its initial attack power
    //Diplay a message on the 5th row which says this - "You attacked <character name> for <attack power> damage. <Defender name> attacked you back for <counter attack power> damage."

    //if the player's HP <=0
      //Display this message in section 5 - "You have been defeated... GAME OVER!"
      //Display a restart button 
    //If the player's HP > 0 AND the enemy's HP <= 0 AND there are no more available enemies (availableEnemies === 0)
      //Display on the 5th section this message - "You have won! GAME OVER!"
    //Else  
      //Diplay on section 5 this message - "You have defeated <character name>, you can chose to fight another enemy."
      //remove the defeated defender's thumbnail from the screen
      //update the value of isEnemyChosen = false 


//Listen for a click event on the restart button
  //restart the game - all variables are reset to their initial values 
  //remove the restart button from the screen

var starWars = {
  lukeInitialHP : 120,
  lukeCurrentHP : 120,
  lukeAP : 10,
  lukeCAP : 15,
  anakinInitialHP : 150,
  anakinCurrentHP : 150,
  anakinAP : 30,
  anakinCAP : 25,
  kyloInitialHP : 135,
  kyloCurrentHP : 135,
  kyloAP : 20,
  kyloCAP : 20,
  quiInitialHP : 140,
  quiCurrentHP : 140,
  quilAP : 25,
  quiCAP : 25,
  isCharacterChosen : false ,
  isEnemyChosen : false,
  characters : ["Luke Skywalker", "Anakin Skywalker", "Kylo Ren", "Qui-Gon Jinn"],
  availableEnemies : this.characters.length - 1
}

$(document).ready(function() {
  //display the HP for each player
  $(".luke_hp").html("<p>" + starWars.lukeCurrentHP + "</p>");

});

