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


function fillInTheBlanks(guessedName) {
	console.log("The selected random name is " + selectedName);
	console.log(typeof selectedName);
	let status = selectedName.split("")
		.map(char => (guessedName.indexOf(char) >= 0 ? char : " __ ")).join("");
		
	if (status === selectedName) {
		// say you won.
		document.getElementById("result").innerHTML = "Yayy! You won".fontcolor("green");
	}

	document.getElementById("answer").innerHTML = status;
}


function checkEnteredCharacter(inputChar) {
	userEnteredCharacters.indexOf(inputChar) === -1 ? userEnteredCharacters.push(inputChar) : null;

	if (mistakesCount > 5) {
		console.log("You lost");
		resetHangman();
		return;
	}

	if (selectedName.indexOf(inputChar) >= 0) {
		fillInTheBlanks(userEnteredCharacters);
	} else {
		// update the image
		mistakesCount++;
		updateHangmanImage();
	}
}


function updateHangmanImage() {
	if (mistakesCount === 6) {
		document.getElementById("answer").innerHTML = "Name: " + selectedName;
		document.getElementById("result").innerHTML = "You lost".fontcolor("red");
	}
	document.getElementById("hangman-image").src = "./images/" + mistakesCount + ".jpg";
}


function resetHangman() {
	console.log("Resetting everything");
	document.getElementById("result").style.visibility = "hidden";
	userEnteredCharacters = [];
	mistakesCount = 0;
	init();
}


document.onkeypress = function (e) {
	e = e || window.event;
	let charCode = e.keyCode || e.which;
	let charString = String.fromCharCode(charCode);
	checkEnteredCharacter(charString);
}


let userEnteredCharacters = [];
let mistakesCount = 0;
let selectedName = "";


function init() {
	document.getElementById("hangman-image").src = "./images/0.jpg";
	selectedName = pickRandomName();
	// console.log(typeof selectedName);
	fillInTheBlanks(userEnteredCharacters);
}


init();
