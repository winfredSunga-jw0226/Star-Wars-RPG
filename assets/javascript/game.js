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
  // *** NOTE : If game is over, the only  valid event will be the click of the restart button. For everything else, do nothing


var starWars = {
  lukeInitialHP : 120,
  lukeCurrentHP : 120,
  lukeinitialAP : 10,
  lukeCurrentAP : this.lukeInitialAP,
  lukeCounterAP : 15,

  anakinInitialHP : 150,
  anakinCurrentHP : 150,
  anakinInitialAP : 30,
  anakinCurrentAP : this.anakinInitialAttackPower,
  anakinCounterAP : 25,

  kyloInitialHP : 135,
  kyloCurrentHP : 135,
  kyloInitialAP : 20,
  kyloCurrentAP : this.kyloInitialAttackPower,
  kyloCounterAP : 20,

  quiInitialHP : 140,
  quiCurrentHP : 140,
  quiInitialAP : 25,
  quiCurrentAP: 25,
  quiCounterAP : 25,

  characterPicked : null,
  defenderPicked : null,
  isCharacterChosen : false ,
  areEnemiesAvailable : false,
  isEnemyChosen : false,
  characters : [["Luke Skywalker", "luke_container"], ["Anakin Skywalker","anakin_container"], ["Kylo Ren", "kylo_container"], ["Qui-Gon Jinn", "qui_gon_container"]],
  availableEnemies : 0, //this.characters.length - 1
  isGameOver : false
}

$(document).ready(function() {

  //display the HP for each player as soon as the html document loads
  $("#luke_hp").html(starWars.lukeCurrentHP);
  $("#anakin_hp").html(starWars.anakinCurrentHP);
  $("#kylo_hp").html(starWars.kyloCurrentHP);
  $("#qui_gon_hp").html(starWars.quiCurrentHP);
  starWars.availableEnemies = starWars.characters.length - 1;

  // console.log("BEFORE :");
  // console.log("areEnemiesAvailable : " + starWars.areEnemiesAvailable);
  // console.log("isCharacterChosen : " + starWars.isCharacterChosen);
  // console.log("characterPicked : " + starWars.characterPicked);
  // console.log("defenderPicked : " + starWars.defenderPicked);

  

  $("img").on("click", function() {
    if(!starWars.areEnemiesAvailable) {
      starWars.isCharacterChosen = true;
      starWars.characterPicked = this.alt;
      starWars.areEnemiesAvailable = true;
      $("#your_character_text").prependTo("#your_character");
      // console.log("AFTER :");
      // console.log("areEnemiesAvailable : " + starWars.areEnemiesAvailable);
      // console.log("isCharacterChosen : " + starWars.isCharacterChosen);
      // console.log("characterPicked : " + starWars.characterPicked);
      // console.log("defenderPicked : " + starWars.defenderPicked);

      starWars.characters.forEach(function(element) {
        var source = "";
        var target = "#enemies";
        var newClass = "enemy_red"
        //console.log("I am inside the forEach");

        if(starWars.characterPicked !== element[0]) {
          // console.log("I am inside the if");
          // console.log("this.alt = " + this.alt);
          // console.log("element[0] = " + element[0]);
          // console.log("element[1] = " + element[1]);

          source = "." + element[1];
          $(source).addClass(newClass);
          $(source).appendTo(target);
          //console.log("source : " + source + " target : " + target);
        

        } //closing the inner if
      }); //closing the forEach
    } //closing the outer if
    else if(starWars.areEnemiesAvailable && starWars.isCharacterChosen && !starWars.isEnemyChosen){
      
      var source;
      var target = "#defender_container";
      var newClass = "defender_black";
      
      starWars.defenderPicked = this.alt;

      starWars.characters.forEach(function(element) { 
        if(starWars.defenderPicked === element[0]) {
          source = "." + element[1];
        }
      });
        
      // console.log("I am in the choose defender event listener");
      // console.log("defender picked : " + starWars.defenderPicked);
      // console.log("source : " + source);
      // console.log("target : " + target);

      $(source).addClass(newClass);
      $(source).appendTo(target);

    }; //closing the img listener
  });

  $("#restart").on("click", function() {
    starWars.isCharacterChosen = false;
    starWars.characterPicked = "";
    starWars.isEnemyChosen = false;
    starWars.availableEnemies = this.characters.length - 1;
    starWars.areEnemiesAvailable = false;
    starWars.isGameOver = true;
    
    starWars.lukeCurrentHP = starWars.lukeInitialHP;
    starWars.lukeCurrentAP = starWars.lukeInitialAP;

    starWars.anakinCurrentHP = starWars.anakinInitialHP;
    starWars.anakinCurrentAP = starWars.anakinInitialAP;

    starWars.kyloCurrentHP = starWars.kyloInitialHP;
    starWars.kyloCurrentAP = starWars.kyloInitialAP;

    starWars.quiCurrentHP = starWars.quiInitialHP;
    starWars.quiCurrentAP = starWars.quiInitialAP;

  });  

    

    // if(!isCharacterChosen) {
    //  if() {

    //  }
    // }  
 

});

