"use strict";


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


function pickRandomName() {
	return randomName();
}


function getCurrentPuzzleState() {
	return selectedRandomName.split("")
		.map(char => (userEnteredCharacters.indexOf(char) >= 0 ? char : " __ ")).join("");
}


function setupAndUpdateWord() {
	let currentStatusOfPuzzle = getCurrentPuzzleState();
	showResultIfNecessary(currentStatusOfPuzzle);	
	document.getElementById("answer").innerHTML = currentStatusOfPuzzle;
}


function checkEnteredCharacter(inputChar) {
	userEnteredCharacters.indexOf(inputChar) === -1 ? userEnteredCharacters.push(inputChar) : null;

	if (totalMistakes > 5) {
		resetHangman();
		return;
	}

	if (selectedRandomName.indexOf(inputChar) >= 0) {
		setupAndUpdateWord(userEnteredCharacters);
	} else {
		// update the image
		totalMistakes++;
		updateHangmanImage();
	}
}


function updateHangmanImage() {
	showResultIfNecessary();
	document.getElementById("hangman-image").src = "./images/" + totalMistakes + ".jpg";
}
		


function showResultIfNecessary(currentStatusOfPuzzle) {
	if (totalMistakes === 6) {
		document.getElementById("answer").innerHTML = "The name is: " + selectedRandomName;
		let result = document.getElementById("result");
		result.removeAttribute("hidden");
		result.innerHTML = "You lost".fontcolor("red");
	}
	if (currentStatusOfPuzzle === selectedRandomName) {
		// say you won.
		let result = document.getElementById("result");
		result.removeAttribute("hidden");
		result.innerHTML = "Yayy! You won".fontcolor("green");
	}

}


function resetHangman() {
	document.getElementById("result").setAttribute("hidden", true);
	userEnteredCharacters = [];
	totalMistakes = 0;
	init();
}


document.onkeypress = function (e) {
	let currentStatusOfPuzzle = getCurrentPuzzleState();
	if (currentStatusOfPuzzle === selectedRandomName) {
		resetHangman();
		return;
	}

	e = e || window.event;
	let charCode = e.keyCode || e.which;
	let charString = String.fromCharCode(charCode);
	checkEnteredCharacter(charString);
}


let userEnteredCharacters = [];
let totalMistakes = 0;
let selectedRandomName = "";


function init() {
	document.getElementById("hangman-image").src = "./images/0.jpg";
	selectedRandomName = pickRandomName();
	console.log(selectedRandomName);
	setupAndUpdateWord(userEnteredCharacters);
}


init();
