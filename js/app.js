/*
 * Create a list that holds all of your cards
 */
 let allCards = document.getElementsByClassName("card");
 let cards = [...allCards];
 let deck = document.getElementById("deck-id");
 let restart = document.getElementsByClassName("restart");
 let symbol = new Array;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
 shuffle(cards);
 deck.innerHTML = "";

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
// are the classes df <i> identical?       
if(symbol[0].childNodes[1].classList.value == symbol[1].childNodes[1].classList.value){
	console.log(symbol[0]);
	didMatch();

}
else{
	console.log("false");
	console.log(symbol[0].id);
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
	symbol = [];
}

// classes of non matching cards are set to open and show
function didNotMatch(){
	symbol[0].classList.remove("open", "show");
	symbol[1].classList.remove("open", "show");
	symbol = [];
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
