const prompt = require('prompt-sync')();

const devs = [`Miles Tarricone`, `Coraline Love`, `Jen Cortez-Walters`]

const character = { 
    name: null, 
    race: null,
    armor: null,        // Null values will get filled when prompted - CL
    weapon: null,
    baseAttack:  0,
    baseDefense: 0,
    backpack: [
        {potions: null}, //<<--- we'll add a quantity as we expand
        {arrows: null}, //<<--- we'll add a quantity as we eqpand
    ]
}   

// === Mob Object ====
const mob = {
    baseAttack: 0,    // 0 values for now - CL
    baseDefense: 0, 
}

// let racetype       //<<--- these are not needed -CL
// let weapontype       
let playerLife = 0;
let mobLife = 0;
let turnCount = 0;

const randomDice = (min, max) => {              //<<-------- use randomDice(1, 9)for D8 random(1, 7) for a D6
    const minDice = Math.ceil(min)                      
    const maxDice = Math.floor(max)
    return Math.floor(Math.random() * (maxDice - minDice) + minDice) 
}

// console.log(getRandomNum(6)) <<---use parameter of 6 to get a random number between 0 and 5 - CL

const pickName = () => {
    const username = prompt('What is your name? ');
    character.name = `${username}`
    console.log(`Your name is ${username}`);
}

//This is selecting the race. it takes the users input, and checks it agains 3 predetermained entries.
// if the user enters something that does not work, we call the function back at the bottom
const pickRace = () => {
    console.log("what race do you want to choose?")
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
    console.log(`what weapon do you want to choose?`)
    const weaponChoice = prompt(`1 - Sword amd Shield,  2 - Battle Axe, 3 - Bow and Arrow `) //asking the user what they would like to pick
    if (weaponChoice == 1) { //comparing the choice the user made to the predetermained selection 
        character.weapon = `Sword and Shield`//assigning the weapontype
        character.baseAttack += 1
        character.baseDefense += 2

    }
     else if (weaponChoice == 2) {  //comparing the choice the user made to the predetermained selection 
        character.weapon = `Battle Axe`   //assigning the weapontype
        character.baseAttack += 3
        character.baseDefense += 0
    }
     else if (weaponChoice == 3) {   //comparing the choice the user made to the predetermained selection 
        character.weapon = `Bow and Arrow` //assigning the weapontype
        character.baseAttack += 2
        character.baseDefense += 1
    }
        else {console.log(`invalid choice, choose better`)//if the user did not pick an option that is predetermained, this calls the function again. 
    pickWeapon()//call the function again. 
    }
};


//This function will be for the user to choose their armor type.  - JCW
const pickArmor = () => {
    const armorChoice = prompt(`1 - Heavy Armor, 2. Medium Armor, 3. Light Armor `)
    if (armorChoice == 1) {             //comparing the choicevalue to determine the armor type & assigning the armor-type to character object  - JCW
        character.armor = `Heavy Armor`    
        character.baseAttack += 0
        character.baseDefense += 0       //<<---temp  0 values - CL
   }
    else if (armorChoice == 2) {         //comparing the choicevalue to determine the armor type & assigning the armor-type to character object  -JCW
        character.armor = `Medium Armor` 
        character.baseAttack += 0
        character.baseDefense += 0       //<<---temp  0 values - CL
    }
    else if(armorChoice == 3) {         //comparing the choicevalue to determine the armor type & assigning the armor-type to character object -JCW
        character.armor = `Light Armor`  
        character.baseAttack += 0 
        character.baseDefense += 0       //<<---temp  0 values - CL
    }
    else{console.log('invalid choice, choose better')
        pickArmor()
    }
}



playerTurn = () => {
    console.log(`player HP:${playerLife} \n mob HP: ${mobLife}`)
    
    const playerTurnChoice = prompt(`Attack or Heal?    `)//todo
    if (playerTurnChoice === `Attack`) {
            //attack function lose health from computer
            damage = (randomDice(1, 9) + character.baseAttack) - mob.baseDefense
            mobLife -= damage         
            console.log(`You have attacked the mob`, `Mob took ${damage}`)       //<<--- code for attack rolls againt mob, this calculates on total attack power, not weapon selection, removed previous code - CL
    }
        // else if(){
            //     //maybe a defense option to bolster defense stat?
            
            // }
            //player heal function add health to player , should we use potion count??
    else if (playerTurnChoice === `Heal`) {
        playerLife += 10
    }
    else if (playerTurnChoice === `Quit`) {
        quit()
    }
    else {
        console.log(`invalid choice please choose better!`)
        playerTurn()
    }      
    evaluatePhase() //<<--- evaluatephase function - CL
    mobTurn()       
}

//NPC turn
mobTurn = () => {
    //computer gets to pick attack or heal
    
    if (randomDice(1, 7) >= 4){
        
        damage = (randomDice(1, 9) + mob.baseAttack + 1) - character.baseDefense  // <<---- code for mob attack roll against player - CL **UNTESTED**
        playerLife -= damage
        console.log(`Mob has attacked you`, `You took ${damage}` )  //<---- change mob name to something else
    } else { 
        console.log(`Mob Heals this turn`);
            mobLife += 4
            
        }
        
    evaluatePhase()  //<<--- evaluatephase function - CL
    playerTurn() // this will loop into the players turn. as long as either party hasnt won/lost, it will keep looping
}
gameStart = () => {
    init()
    playerTurn()
}
// gameStart()

// Evaluation  Phase Code
evaluatePhase = () => { 
    // console.log(`evaluation phase for testing`);
    // console.log(turnCount);
    
                                                         //<<----- this evaluation code should  ran after each turn - CL **UNTESTED** **TESTED** MT
    if (playerLife <= 0){                                                   
        console.log(`Game over you lost!`)
        const gameOver = prompt(`Would you like to try again? yes no `)
            if (gameOver === `yes`){
                init()
            }else {
                console.log(`Thank you for playing`)
            }    
    } else if (mobLife <= 0){    
        console.log(`Game over you won!`)
        const gameOver = prompt(`Would you like to try again? yes no `)
            if (gameOver === `yes`){
                init()
            }else {
                console.log(`Thank you for playing`)
                mainMenu()
            }    
        } else {    
            // whatTurn();
        }    
        
        
    }    
mainMenu = () => {
    console.log(`MAIN MANU`);
    console.log(`START GAME 1`);
    console.log(`CREDITS 2`);
    console.log(`QUIT 3`);
    let userMenuChoice = prompt(`please choose 1, 2, 3      `)
    
    if (userMenuChoice === `1`) {
        console.log(`Type out "Quit" at any time to quit to the menu`);
        
        gameStart()
    }    
    else if (userMenuChoice === `2`) {
        console.log(devs)
        mainMenu()
    }    
    else if (userMenuChoice === `3`) {
        console.log(`have a nice day`)
        process.exit();
    }    
}    
    
quit = () => {//function to quit to main manu at any time
    mainMenu()
}    
    
    
    // This will always run first!
    const init = () => {
        playerLife = 50;
        mobLife = 50;
        
        pickName()
        
    pickRace()
    console.log(`Your chosen race is ${racetype}.`);
    
    pickWeapon()
    console.log(`You have choosen ` + character.weapon + ` for your weapon.`);
    
    pickArmor()
    console.log(`You have chosen ` + character.armor + ` for your armor`);
    
    console.log(character)
}     

mainMenu()






// this was an attempt and it did not work correctly
// whatTurn = () => {// goal of this is to switch turns between npc and player. Running count. 0 and 1. If the count is zero, its the players turn, if it is 1 its the computers turn.
//     if (turnCount == 0) {
//         console.log(`Players Turn`);    
//         playerTurn(); // this will run the players turn then add 1 to the turn cound. switching the turns. UNTESTED.
//         turnCount = turnCount + 1;
//         console.log(turnCount);
//     }
//     else if (turnCount == 1) {//this will run the NPC turn then SUBTRACT 1 to the turn cound. switching the turns. UNTESTED.
//         console.log(`Mob Turn`);
//         mobTurn();
//         turnCount--;
//         console.log(turnCount);
//     }
// }


// init()



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
//======================================================= Pushed character object to the top================================
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


