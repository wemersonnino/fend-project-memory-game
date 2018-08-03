/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
            temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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

///* Var contendo a localização dos cards
let deck = $('.deck');
//console.log(deck);

///* Random cards
function deckRandom() {
    let parent = $(deck);
    let ul = parent.children();
    while (ul.length) {
        parent.append(ul.splice(Math.floor(Math.random() * ul.length), 1)[0]);
    }
}

///*Carregamento da pagina randomiza os cards
window.onload = function resets() {
    deckRandom();
    clicked();
};

///* Reload pagina
let reload = $('.restart');
reload.on('click', function () {
    location.reload();
});

///* Var para obter os cards abertos
let opened = $('.open');

///* Var para conter os acertos/para as stars
let hits = 0;

///* Var para conter numnber de movimentos
let palpites = 0;

///* Var para registar os cards combinados
let isCombined = false;

let stars = false;


//--------------init logic game-------------------

///* contando os movimentos
function countMove() {
    let clickMotion = $("span.moves").text(palpites);
    $(clickMotion).click(palpites++).is('.card');
}

///* função confere se o card esta aberto
function open() {
        if($(opened).hasClass('open')){
            console.log('teste acertos');
            isCombined = isCombined = true;
            return true;
        } else {
            console.log('teste error');
            isCombined = isCombined = false;
            countMove();
            return false;
        }
}

//function openCard(){
//    let cardClic = $(this);
//    if($(clicked) == true){
//        cardClic.addClass('open show');
//        return true;
//    } else{
//        $('.card').addClass('open');
//        console.log('erro add class');
//        return false;
//    }
//    open();
//}

///* Click card
function clicked() {
    let clickAtual = $('.card');
    clickAtual.on('click', function () {
        if(clickAtual == true){
            $(this).removeClass('open show');
        } else{
            $(this).addClass('flipInY open show');
            if($(open).hasClass('.open') === true){
               $(this).addClass('bounce match'); 
               openCard();
            }
            console.log('erro add class');
            return false;
     }
        
        
    });
}

$();