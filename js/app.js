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

///* criando acesso a lista de icones para criar a condicional de teste

let clickHit, opened, clickAtual, star;
clickAtual = $('li.card').find('i');
let cards = [];
const arrayCar = 16;
let countMove = 0;
let stars = $('ul.stars').find('li').remove('li');



///* Array com as classes para comparar condicional
const arrayCards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
    "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

///* Variaveis de estado do game


function listCards() {
    clickAtual.each(function (i, e) {
        const c = e.className.split(' ')[1];
        return cards.push(c);
    });
    console.log(cards);
}

///* Logica do click
function clickCard() {
    clickHit = $('.card').on('click', function () {
        $(this).addClass('flipInY');
        $(this).addClass('open');
        $(this).addClass('show');
        countMove++;
        clicksMotion();
        countStar();
    });
}
;

///* Atualiza a quantidade movimentos
function clicksMotion() {
    $(".moves").text(countMove);

}
;

///* Contando estrelas e movimentos
function countStar() {
    $('ul.stars').append('<li><i class="fa fa-star"></i></li>');
    let n = ('ul.stars').size();
    $('li').html(n);
}


window.onload = function () {
    clickCard();
    clicksMotion();
};

$(".card").click(clickCard);
$(".card").click(clicksMotion);
listCards();
//console.log(star);
