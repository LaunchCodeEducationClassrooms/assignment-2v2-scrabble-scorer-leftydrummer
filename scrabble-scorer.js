// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
};

function oldScrabbleScore(word) {
    word = word.toUpperCase();
    let letterPoints = "";

    for (let i = 0; i < word.length; i++) {

        for (const pointValue in oldPointStructure) {

            if (oldPointStructure[pointValue].includes(word[i])) {
                letterPoints += `Points for '${word[i]}': ${pointValue}\n`
            }

        }
    }
    return letterPoints;
}

let scrabbleScore = function (word) {
    word = word.toLowerCase();
    let letterPoints = 0;
    for (let i = 0; i < word.length; i++) {
        letterPoints += newPointStructure[word[i]]
    }
    return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
    return input.question("Let's play some scrabble! Enter a word:");
}

let simpleScore =
    function (word) {return word.length}

let simpleScoreObj = {
    scoringFunction: simpleScore,
    name: "Simple Score",
    description: "Each letter is worth 1 point."
}

let vowelBonusScore = function (word) {
    let vbs = 0

    for (let i = 0; i < word.length; i++) {
        if (isVowel(word[i])) {
            vbs += 3
        } else {
            vbs += 1
        }
    }
    return vbs
}

let vowelBonusScoreObj = {
    scoringFunction: vowelBonusScore,
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt."
}


let scrabbleScoreObj = {
    scoringFunction: scrabbleScore,
    name: "Scrabble",
    description: "The traditional scoring algorithm."
}

const scoringAlgorithms = [simpleScoreObj, vowelBonusScoreObj, scrabbleScoreObj];

function scorerPrompt() {
    for (let i = 0; i < scoringAlgorithms.length; i++) {
        console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
    }
    let index = input.question("Enter 0, 1, or 2:\n", {limit: [0, 1, 2]})
    return scoringAlgorithms[index]

}

function transform(oldPointStruct) {
    let newPointStruct = {}

    for (let k in oldPointStruct) {
        for (let i = 0; i < oldPointStruct[k].length; i++) {
            newPointStruct[oldPointStruct[k][i].toLowerCase()] = Number([k])
        }
    }

    return newPointStruct
}

let newPointStructure = transform(oldPointStructure);

function isVowel(c) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
}

function runProgram() {
    let word = initialPrompt();
    let algo = scorerPrompt();
    let score = algo.scoringFunction(word)
    console.log(`Score for '${word}': ${score}`)

/*    let oldLetterArray = Object.values(oldPointStructure)

    for(i=0; i < oldLetterArray.length;i++){
        console.log(oldLetterArray);
        for(j=0;j<oldLetterArray[j].length;i++){
            console.log(oldLetterArray[i].length);
        };*/


}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
    initialPrompt: initialPrompt,
    transform: transform,
    oldPointStructure: oldPointStructure,
    simpleScore: simpleScore,
    vowelBonusScore: vowelBonusScore,
    scrabbleScore: scrabbleScore,
    scoringAlgorithms: scoringAlgorithms,
    newPointStructure: newPointStructure,
    runProgram: runProgram,
    scorerPrompt: scorerPrompt
};

