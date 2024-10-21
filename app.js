const prompt = require('prompt-sync')();

const character = { 
    name: null, 
    race: null,
    armor: null,
    weapon: null,
    attack:  0,
    defense: 0,
    backpack: {
        potions: null, //<<--- we'll add a quantity as we expand
        arrows: null, //<<--- we'll add a quantity as we eqpand

    }
}   

// let racetype             //<<--- this are not needed
// let weapontype       
let lifePlayer = 0;
let lifeNPC = 0;

const getRandomNum = (max) => {
    return Math.floor(Math.random() * max);      //<<----- random Number Generator - CL
}

// console.log(getRandomNum(6))


//This is selecting the race. it takes the users input, and checks it agains 3 predetermained entries.
// if the user enters something that does not work, we call the function back at the bottom
const pickRace = () => {
    const raceChoice = prompt(`Please select Human, Elf, or Dwarf. `)
    if (raceChoice === `Human`) {
        racetype = `Human`
        character.race = raceChoice
    }
    else if (raceChoice === `Elf`) {
        racetype = `Elf`
        character.race = raceChoice
    }
    else if (raceChoice === `Dwarf`) {
        racetype = `Dwarf`
        character.race = raceChoice
    }
    else {
        console.log(`invalid selection, choose better`)
        pickRace()
    }
}

//This function is to take imput from the user, and pick a weapon from 3 predetermained weapon choices. 
//sort and shield has a numerical value of 1, battle axe has a numerical value of 2, bow and arrow has a numerical value of 3
 const pickWeapon = () => {
    const weaponChoice = prompt(`1 - Sword amd Shield,  2 - Battle Axe, 3 - Bow and Arrow `) //asking the user what they would like to pick
    if (weaponChoice == 1) { //comparing the choice the user made to the predetermained selection 
        character.weapon = `Sword and Shield`//assigning the weapontype
        character.attack += 1
        character.defense += 2

    }
     else if (weaponChoice == 2) {  //comparing the choice the user made to the predetermained selection 
        character.weapon = `Battle Axe`   //assigning the weapontype
        character.attack += 3
        character.defense += 0
    }
     else if (weaponChoice == 3) {   //comparing the choice the user made to the predetermained selection 
        character.weapon = `Bow and Arrow` //assigning the weapontype
        character.attack += 2
        character.defense += 1
    }
        else {console.log(`invalid choice, choose better`)//if the user did not pick an option that is predetermained, this calls the function again. 
    pickWeapon()//call the function again. 
    }
};


// This will always run first!
const init = () => {
    lifePlayer = 10;
    lifeNPC = 10;

    // pickName()
    console.log("what race do you want to choose?");
    pickRace()
    console.log(`Your chosen race is ${racetype}.`);
    console.log(`what weapons do you want to choose?`)
    pickWeapon()
    console.log(`You have choosen ${weapontype} for your weapn.`);
    console.log(character)
    // pickArmor
} 

init()



// ================================================================ Put all this code in a init Function==================

//===We'll add the armor choice function here.=== -CL

// const username = prompt('What is your name? ');
// console.log(`Your name is ${username}.`);

// console.log("what race do you want to choose?");
// pickRace()//calling the pick race function from the top of the page
// console.log(`Your chosen race is ${racetype}.`);

// console.log(`what weapons do you want to choose?`)
// pickWeapon()//calling the pick weapon function from the top of the page. 
// console.log(`You have choosen ${weapontype} for your weapn.`);

//===envoke Armor function here=== 

// console.log(`Your have choose ${armortype} for your aromor.`);

//character sheet
// const character = { 
//     name:`${username}`, 
//     race:`${racetype}`,
//     armor: null,
//     weapon: `${weapontype}`,
//     attack:  0,
//     defense: 0,
//     backpack: {
//         potions: null, //<<--- we'll add a quantity as we expand
//         arrows: null, //<<--- we'll add a quantity as we eqpand

//     }
// }   
    
// console.log(`Your weapon is ` +  ${character.weapon});
  
//=======================================================================================================================




// Start of game framework

//declare values

//attack and heal functions

//player turn
turnPlayer = () => {
    console.log(`player life is ${playeLife} and computer life is ${computerLife}`)

    const playerTurnChoice = prompt(`tbd`)//todo
        if (playerTurnChoice === `attack`) {
            //attack function lose health from computer
            if (character.weapon === true) {
                computerLife -= 1 //sword and shield extra defense for the shield +1 attack +2 defence
            }
            else if (weaponChoice === `2`) {
                computerLife -= 3 // batte axe all attack 3 attack
            }
            else if (weaponChoice === `3`) {
                computerLife -= 2 //bow gets extra defense due to mobility +2 attack +1 defence
            }
        }
        else if (playerTurnChoice === `heal`) {
            //player heal function add health to player 
        }
        else {
            console.log(`invalid choice please choose better!`)
            playerturn()
        }      

    console.log(`player life is ${playeLife} and computer life is ${computerLife}`)
}


evaluate = () => {

}


//NPC turn
tunrNPC = () => {
    if (getRandomNum(6) >= 3){


    } else { 
    //computer gets to pick attack or heal
    }
}





//NPC turn

