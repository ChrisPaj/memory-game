/*
 * Create a list that holds all of your cards
 */
 let allCards = document.getElementsByClassName("card");
 let cards = [...allCards];
 let deck = document.getElementById("deck-id");
 let restart = document.getElementsByClassName("restart");
 let symbol = new Array;
 let time = "2 min 22 s";
 let moves = 0;
 let stars = 5;
 let noOfMatches = 0;
 let noOfMoves = 0;
 let noOfSeconds = 0;
 let noOfMinutes = 0;
 let noOfMovesSpan = document.querySelector(".moves");
 let noOfStarsShown = document.getElementsByClassName("fa-star");
 let timerSpan = document.getElementById("timer");
 let t;

 let winnerDiv = document.createElement("DIV");

 function showTimer(){
 	noOfSeconds++;
 	if(noOfSeconds === 60){
 		noOfSeconds = 0;
 		noOfMinutes ++;		
 	}
 	timerSpan.textContent = (noOfMinutes < 10 ? "0" + noOfMinutes : noOfMinutes) + ":" + (noOfSeconds < 10 ? "0" + noOfSeconds : noOfSeconds);
 	timer()
 }

 function timer() {
 	t = setTimeout(showTimer, 1000);
 }
 timer();
 
 

 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
 	var currentIndex = array.length, temporaryValue, randomIndex;

 	while (currentIndex !== 0) {
 		randomIndex = Math.floor(Math.random() * currentIndex);
 		currentIndex -= 1;
 		temporaryValue = array[currentIndex];
 		array[currentIndex] = array[randomIndex];
 		array[randomIndex] = temporaryValue;
 	}

 	return array;
 }
// shuffle(cards);


// creating a fragment to apend to deck
const fragment = document.createDocumentFragment();
for(let i=0; i<cards.length; i++){
	fragment.appendChild(cards[i]);
}
deck.appendChild(fragment);

// start of the game
function startMemory(){
	shuffle(cards);
}

// add EventListener to deck
deck.addEventListener("click", clickCard);

// add EventListener to restart
restart[0].addEventListener("click", resetBoard);
if(restart[1]){
	restart[1].addEventListener("click", resetBoard);
}

function clickCard(event){  
//  EventListener waits for li-elements to be clicked
if (event.target.nodeName === 'LI') {
	let cardFlipped = event.target;
 // adding classes open and show to card   
 if(symbol.length < 2){    
 	cardFlipped.classList.add("open", "show");
 	compareSymbols(cardFlipped);
 }
}  
}

function resetBoard(){
	location.reload();
}

function compareSymbols(cardsFlipped){
	if(symbol.length == 0){
 // the first valid clicks goes into the symbol-Array       
 symbol.push(cardsFlipped);
}
if(symbol.length == 1){
	if(symbol[0].id != cardsFlipped.id) {
 // the second valid clicks goes into the symbol-Array        
 symbol.push(cardsFlipped);
}
}
if(symbol.length == 2){
// are the classes of <i> identical?       
if(symbol[0].childNodes[1].classList.value == symbol[1].childNodes[1].classList.value){
	didMatch();

}
else{
	setTimeout(didNotMatch, 1000);
}
}
return;
}

// classes of matching cards are set to match
function didMatch(){
	symbol[0].classList.add("match");
	symbol[1].classList.add("match");
	symbol[0].classList.remove("open", "show");
	symbol[1].classList.remove("open", "show");
	noOfMatches ++;	
	handleMoves();
}

// classes of non matching cards are set to open and show
function didNotMatch(){
	symbol[0].classList.remove("open", "show");
	symbol[1].classList.remove("open", "show");
	handleMoves();
}

function handleMoves(){
	symbol = [];
	noOfMoves ++;
	noOfMovesSpan.innerHTML = noOfMoves;
	if(noOfMoves === 13){
		toggleStars(4)		
	}
	if(noOfMoves === 17){
		toggleStars(3)		
	}
	if(noOfMoves === 20){
		toggleStars(2)		
	}
	if(noOfMoves === 22){
		toggleStars(1)		
	}
	if (noOfMatches == 8){
		setTimeout(winnerScreen, 1000);
	}
}

function toggleStars(i){
	noOfStarsShown[i].classList.add("fa-star-o");
	noOfStarsShown[i].classList.remove("fa-star");
	stars--;
}

function winnerScreen(){
	winnerDiv.id = "winner-div";
	winnerDiv.innerHTML = `<h2>Congratulations, you won!!</h2> 
	It took you ${time} and ${noOfMoves} moves to complete the game, <br> which makes ${stars} Star(s)
	<br><br><a href="#" onclick="resetBoard()"> Play again </a>`;
	deck.innerHTML = "";   
	deck.appendChild(winnerDiv); 
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
