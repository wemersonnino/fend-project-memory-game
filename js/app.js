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

///* Variaveis globais
let clickView, clickAtual, clickHit, clickMiss, qtdClick, clicksMotion, arrayBoxCard;

///* criando acesso a lista de icones para criar a condicional de teste
clickAtual = $('li.card').find('i');
        let array = [];
        clickAtual.each(function (i, e) {
            const c = e.className.split(' ')[1];
            return clickHit = array.push(c);
        });
        console.log(array);

///* array list p/ teste condicional
clickHit = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-anchor",
             "fa-leaf", "fa-bicycle", "fa-diamond", "fa-bomb", "fa-leaf", "fa-bomb", "fa-bolt",
             "fa-bicycle", "fa-paper-plane-o", "fa-cube"];

console.log(clickHit);

///* Variáveis de estado do jogo
let equal = 0;
let open = [];
let moveCounter = 0;
let numStars = 3;
let timer = {
    seconds: 0,
    minutes: 0,
    clearTime: -1
};
//let musicVictory = {
//    $('.audio').attr('src', 'http://www.soundjay.com/misc/sounds/bell-ringing-01.mp3' )
//};

///* Chamada do evento principal.

var startTimer = function() {
    if (timer.seconds === 59) {
        timer.minutes++;
        timer.seconds = 0;
    } else {
        timer.seconds++;
    }

    // Ensure that single digit seconds are preceded with a 0
    var formattedSec = "0";
    if (timer.seconds < 10) {
        formattedSec += timer.seconds
    } else {
        formattedSec = String(timer.seconds);
    }

    var time = String(timer.minutes) + ":" + formattedSec;
    $(".timer").text(time);
};

function resetTimer() {
    clearInterval(timer.clearTime);
    timer.seconds = 0;
    timer.minutes = 0;
    $(".timer").text("0:00");

    timer.clearTime = setInterval(startTimer, 1000);
};

///* random cart e update doc html
function updateCards() {
    deck = shuffle(deck);
    let index = 0;
    $.each('.card i', function() {
        $(this).attr('class', 'fa' + deck[index]);
        index++;
    });
    resetTime();
}