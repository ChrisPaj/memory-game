/*
 * Create a list that holds all of your cards
 */
 let allCards = document.getElementsByClassName("card");
 let cards = [...allCards];
 let deck = document.getElementById("deck-id");
 let noOfCardsFlipped = 0;
 let symbol = new Array;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 shuffle(cards);
// console.log(...cards);
deck.innerHTML = "";

const fragment = document.createDocumentFragment();

for(let i=0; i<cards.length; i++){
	fragment.appendChild(cards[i]);
}
deck.appendChild(fragment);
// let abs = document.createElement('p');
// document.getElementById("card-deck").appendChild(abs);
// document.getElementById("deck-id").appendChild(abs);


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

function startMemory(){
	shuffle(cards);
}

deck.addEventListener("click", clickCard);

function clickCard(event){
    noOfCardsFlipped ++;    
    if (event.target.nodeName === 'LI') {
        let cardFlipped = event.target;
        cardFlipped.classList.add("open", "show");
        //let child1 = cardFlipped.childNodes[1];
        //let childClasses = child1.classList; 
       // if(noOfCardsFlipped < 3){
            compareSymbols(cardFlipped);
    }  
}

function compareSymbols(cardsFlipped){
    if(noOfCardsFlipped < 3){
        symbol.push(cardsFlipped);
    }
    if(noOfCardsFlipped == 2){
       if(symbol[0].childNodes[1].classList.value == symbol[1].childNodes[1].classList.value){
            console.log("true");
        }
        else{
            console.log("false");
            console.log(symbol[0].childNodes[1].classList);
            console.log(symbol[1].childNodes[1].classList);
        }
    }
    return;
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
