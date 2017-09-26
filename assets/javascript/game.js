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
    //Update the variable availableEnemies to the appropriate list of characters that are now your enemise
    //thumbnails in the Enemies Available to Attack row have a background color of red
  // Else if there is one or more character(s) in the Enemies Available to Attack section (availableEnemies > 0) AND there are is no character in the defender section (isEnemyChosen = false)
    //the chosen character's thumbnail moves to the Defender section (under the Defender heading) 
    //update the value of  isEnemyChosen = true
    //remove the defender from the avaialable enemies list
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
  // *** NOTE : If game is over, the only  valid event will be the click of the restart button. For everything else, do nothing
  // *** The restart button will show up once the Game is Over
  // *** The restart button will disappear when the game starts again (after clicking it)

var starWars = {
  playerHP : 0,
  playerAP : 0,
  defenderHP : 0,
  defenderCAP : 0,
  characters : [
  {name : "Luke Skywalker", healthPower : 135, attackPower : 15, counterAttackPower : 15, container : "luke_container", hpClass : "luke_hp"},
  {name : "Anakin Skywalker", healthPower : 180, attackPower : 25, counterAttackPower : 25, container : "anakin_container", hpClass : "anakin_hp"},
  {name : "Kylo Ren", healthPower : 120, attackPower : 15, counterAttackPower : 10, container : "kylo_container", hpClass : "kylo_hp"},
  {name : "Qui-Gon Jinn", healthPower : 150, attackPower : 20, counterAttackPower : 20, container : "qui_gon_container", hpClass : "qui_gon_hp"}
  ],
  characterPicked : null,
  defenderPicked : null,
  isCharacterChosen : false ,
  areEnemiesAvailable : false,
  isEnemyChosen : false,
  availableEnemies : [],
  defeatedEnemies : [],
  isGameOver : false,
  resetVariables : function() {
    starWars.characterPicked = null;
    starWars.defenderPicked = null;
    starWars.isCharacterChosen = false;
    starWars.areEnemiesAvailable = false;
    starWars.isEnemyChosen = false;
    starWars.availableEnemies = [];
    starWars.defeatedEnemies = [];
    starWars.isGameOver = false;
    starWars.playerHP = 0;
    starWars.playerAP = 0;
    starWars.defenderHP = 0;
    starWars.defenderCAP = 0;
  }
}

$(document).ready(function() {

  //display the HP for each player as soon as the html document loads
  $("#luke_hp").html(starWars.characters[0].healthPower);
  $("#anakin_hp").html(starWars.characters[1].healthPower);
  $("#kylo_hp").html(starWars.characters[2].healthPower);
  $("#qui_gon_hp").html(starWars.characters[3].healthPower);

  $("img").on("click", function() {
    var character = this.alt;

    if(!starWars.areEnemiesAvailable) {
      starWars.isCharacterChosen = true;
      starWars.areEnemiesAvailable = true;
      starWars.characterPicked = character //this.alt;
      $("#your_character_text").prependTo("#your_character");

      starWars.characters.forEach(function(element) {
        var source = "";
        var target = "#enemies";
        var newClass = "enemy_red"

        //if(starWars.characterPicked !== element[0]) {
        if(starWars.characterPicked === element.name) {
          starWars.characterPicked = element; //assign the character as an object
          starWars.playerHP = starWars.characterPicked.healthPower;
        } else {
          //create list of available enemies
          starWars.availableEnemies.push(element);

          source = "." + element.container;
          $(source).addClass(newClass);
          $(source).appendTo(target);
        } //closing the else
      }); //closing the forEach
    } //closing the outer if
    else if(starWars.areEnemiesAvailable && starWars.isCharacterChosen && !starWars.isEnemyChosen && character !== starWars.characterPicked.name){
      var source;
      var target = "#defender_container";
      var newClass = "defender_black";

      starWars.isEnemyChosen = true;
      starWars.defenderPicked = this.alt;

      starWars.availableEnemies.forEach(function(element, index) { 
        if(starWars.defenderPicked === element.name) {
          starWars.defenderPicked = element; //assign the defender as an object
          source = "." + element.container;
          starWars.availableEnemies.splice(index,1);
          starWars.defenderHP = starWars.defenderPicked.healthPower;
          starWars.defenderCAP = starWars.defenderPicked.counterAttackPower;
        } 
      });

      $(source).addClass(newClass);
      $("#message").html("");
      $(source).appendTo(target);

    }; // closing the else if

     //update the areEnemiesAvailable variable
    if(starWars.availableEnemies.length < 1) {
      starWars.areEnemiesAvailable = false;
    }

  }); //closing the img listener

  $("button").on("click", function() {
    var buttonClicked = this.value;

    if(buttonClicked === "attack") {
      if(starWars.isGameOver) {
        return; 
      } else {
        if(!starWars.isEnemyChosen) {
          $("#message").html("<p>No enemy here!</p>");
        } else {
          var playerHPTarget = "#" + starWars.characterPicked.hpClass;
          var defenderHPTarget = "#" + starWars.defenderPicked.hpClass;
          starWars.playerAP += starWars.characterPicked.attackPower;
          starWars.playerHP -= starWars.defenderCAP;
          starWars.defenderHP -= starWars.playerAP;

          $(playerHPTarget).html(starWars.playerHP);
          $(defenderHPTarget).html(starWars.defenderHP);

          //your HP <= 0, GAME OVER, YOU LOSE!!!
          //display restart button
          if(starWars.playerHP <= 0) {
            starWars.isGameOver = true;

            $("#message").html("<br><p>You have been defeated. GAME OVER!!!</p><br>");
            $("#message").append("<a class='btn btn-primary' href='index.html' role='button'>Reset</a>");
          } else if(starWars.playerHP > 0 && starWars.defenderHP <=0 && starWars.areEnemiesAvailable && starWars.isEnemyChosen) {
            $("#message").html("<br><p>You have defeated " + starWars.defenderPicked.name + ".</p>");
            $("#message").append("<p>You can choose to fight another enemy.</p>");
            starWars.isEnemyChosen = false;
            $(".defender_black").remove();
          } else if(starWars.playerHP > 0 && starWars.defenderHP <=0 && !starWars.areEnemiesAvailable) {
            $("#message").html("<br><p>GAME OVER. You have defeated all your enemies!!!</p><br>");
            starWars.isGameOver = true;
            $("#message").append("<a class='btn btn-primary' href='index.html' role='button'>Reset</a>");
          } // else if both players still have HP > 0
           else {
            $("#message").html("<br><p>You attacked " + starWars.defenderPicked.name + " for " + starWars.playerAP + " damage. </p>");
            $("#message").append("<p>" + starWars.defenderPicked.name + " attacked you back for " + starWars.defenderCAP + " damage. </p>");
          }
        } //closing the inner if-else
      } //closing the outer if-else
    }  
  }); //closing the button listener 

});

