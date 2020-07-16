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
	let name = randomName();
	console.log("The selected random name is " + name);
	let status = name.split("").map(char => (guessedName.indexOf(char) >= 0 ? char : " __ ")).join("");
		
	document.getElementById("answer").innerHTML = status;
}


fillInTheBlanks([]);
