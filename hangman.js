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


function fillInTheBlanks(guessedName) {
	console.log("The selected random name is " + selectedName);
	let status = selectedName.split("")
		.map(char => (guessedName.indexOf(char) >= 0 ? char : " __ ")).join("");
		
	if (status === selectedName) {
		// say you won.
	}

	document.getElementById("answer").innerHTML = status;
}


function checkEnteredCharacter(inputChar) {
	userEnteredCharacters.indexOf(inputChar) === -1 ? userEnteredCharacters.push(inputChar) : null;

	if (selectedName.indexOf(inputChar) >= 0) {
		fillInTheBlanks(userEnteredCharacters);
	} else {
		// update the image
		mistakesCount++;
		updateHangmanImage();
	}
}


function updateHangmanImage() {
	if (mistakesCount >= 6) {
		document.getElementById("answer").innerHTML = "Name: " + selectedName;
		document.getElementById("result").innerHTML = "You lost";
	}
	document.getElementById("hangman-image").src = "./images/" + mistakesCount + ".jpg";
}


document.onkeypress = function (e) {
	e = e || window.event;
	let charCode = e.keyCode || e.which;
	let charString = String.fromCharCode(charCode);
	checkEnteredCharacter(charString);
}


let  userEnteredCharacters = [];
let selectedName = randomName();
let mistakesCount = 0;


function init() {
	fillInTheBlanks(userEnteredCharacters);
}


init();
