"use strict";


// Array of names which we use as puzzle.
const names = [
	"madara",
	"tobi",
	"kakuzu",
	"itachi",
	"deidara",
	"hidan",
	"konan",
	"sasori",
	"zetsu",
	"kisame",
	"nagato"
];


const randomName = () => {
	return names[Math.floor(Math.random() * names.length)];
}


// Returns a random string from the names array.
function pickRandomName() {
	return randomName();
}


// Checks and returns the current state of the puzzle by checking the userEnteredCharacters array.
function getCurrentPuzzleState() {
	return selectedRandomName.split("")
		.map(char => (userEnteredCharacters.indexOf(char) >= 0 ? char : " __ ")).join("");
}


// Update the UI each time the user enters a character.
function setupAndUpdateWord() {
	let currentStatusOfPuzzle = getCurrentPuzzleState();
	showResultIfNecessary(currentStatusOfPuzzle);	
	document.getElementById("answer").innerHTML = currentStatusOfPuzzle;
}

/**
 * Check if the user entered character is valid or not.
 *
 * @param (character) inputChar - The character entered by the user.
 */
function checkEnteredCharacter(inputChar) {
	// If the entered character matches the puzzle word, push it to the userEnteredCharacters array.
	// If not, increase the mistakes count.
	userEnteredCharacters.indexOf(inputChar) === -1 ? userEnteredCharacters.push(inputChar) : null;

	// If the game is over (Lost) and the user presses another key, reset the game.
	if (totalMistakes > 5) {
		resetHangman();
		return;
	}

	// Update the UI - fill in the blanks.
	if (selectedRandomName.indexOf(inputChar) >= 0) {
		setupAndUpdateWord(userEnteredCharacters);
	} else {
		// Increase the mistakes count and update the image.
		totalMistakes++;
		updateHangmanImage();
	}
}


// Update the hangman image for each mistake.
function updateHangmanImage() {
	showResultIfNecessary();
	document.getElementById("hangman-image").src = "./images/" + totalMistakes + ".jpg";
}
		

// Show the result in the UI.
function showResultIfNecessary(currentStatusOfPuzzle) {
	// say you lost.
	if (totalMistakes === 6) {
		document.getElementById("answer").innerHTML = "The name is: " + selectedRandomName;
		let result = document.getElementById("result");
		result.removeAttribute("hidden");
		result.innerHTML = "You lost".fontcolor("red");
	}

	// say you won.
	if (currentStatusOfPuzzle === selectedRandomName) {
		let result = document.getElementById("result");
		result.removeAttribute("hidden");
		result.innerHTML = "Yayy! You won".fontcolor("green");
	}
}


// Reset the hangman game after a win or lose.
function resetHangman() {
	// Hide the results.
	document.getElementById("result").setAttribute("hidden", true);
	// Reset the userEnteredCharacters array.
	userEnteredCharacters = [];
	// Reset mistakes count to 0.
	totalMistakes = 0;
	// Initialise the UI.
	init();
}


// Listen for keypress from the user.
document.onkeypress = function (e) {
	// If the game is over, reset and start a new game.
	let currentStatusOfPuzzle = getCurrentPuzzleState();
	if (currentStatusOfPuzzle === selectedRandomName) {
		resetHangman();
		return;
	}

	e = e || window.event;
	let charCode = e.keyCode || e.which;

	// Convert any character the user enters to lowecase since we need to check it against the names
	// array which is in lowecase.
	// Otherwise, uppercase case characters are considered mistakes.
	let charString = String.fromCharCode(charCode).toLowerCase();

	checkEnteredCharacter(charString);
}


let userEnteredCharacters = [];
let totalMistakes = 0;
let selectedRandomName = "";


function init() {
	// Show the tree without the hangman at first.
	document.getElementById("hangman-image").src = "./images/0.jpg";

	// Pick a random name from the names array.
	selectedRandomName = pickRandomName();

	// console.log(selectedRandomName);
	
	// Set up the UI with empty dashes.
	setupAndUpdateWord(userEnteredCharacters);
}


init();
