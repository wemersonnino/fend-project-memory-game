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
clickAtual = $('li.card').find('i');
let cards = [];

clickAtual.each(function (i, e) {
    const c = e.className.split(' ')[1];
    return clickHit = cards.push(c);
});
console.log(cards);

///* Array com as classes para comparar condicional
const arrayCards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor",
    "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

///* Variaveis de estado do game
let open = [];
let coincide = 0;
let moveCounter = 0;
let numStars = 3;

///* Número máximo de movimentos de estrela
let normal = 15;
let medium = 20;

///* Remove o último indice das estrelas
function removeStar() {
    $(".fa-star").last().attr("class", "fa fa-star-o");
    numStars--;
    $(".stars").text(String(numStars));
}
;

///* Restaura os ícones da estrelas para 3 stars
function resetStars() {
    $(".fa-star-o").attr("class", "fa fa-star");
    numStars = 3;
    $(".stars").text(String(numStars));
}
;

///* Atualiza número de movimentos na <tag>
function updateMoveCounter() {
    $(".moves").text(moveCounter);

    if (moveCounter === normal || moveCounter === medium) {
        removeStar();
    }
}
;

///* Verifica se o cartão é um movimento válido
function isValid(card) {
    return !(card.hasClass("open") || card.hasClass("match"));
}
;

///* Retorna se os cartões atualmente abertos estão certos ou não
function checkMatch() {
    if (open[0].children().attr("class") === open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
}
;

///* Retorna a condição de Hit
function hasWon() {
    if (coincide === 16) {
        return true;
    } else {
        return false;
    }
}
;

///* Verifica cards abertos no momento e qual o estado de jogo deles, verifica a condição de hit
let setMatch = function () {
    open.forEach(function (card) {
        card.addClass("match");
    });
    open = [];
    coincide += 2;
};

///* Define cards abertos no momento e volta els ao estado padrão
let resetOpen = function () {
    open.forEach(function (card) {
        card.toggleClass("open");
        card.toggleClass("show");
        card.toggleClass("bounce");
    });
    open = [];
};
///* Resetando a pagina HTML
let resetGame = function () {
    open = [];
    coincide = 0;
    moveCounter = 0;
    updateMoveCounter();
    $(".card").attr("class", "card");
    updateCards();
    resetStars();
};

///* Logica do click para o game
let onClick = function () {
    if (isValid($(this))) {

        if (open.length === 0) {
            openCard($(this));

        } else if (open.length === 1) {
            openCard($(this));
            moveCounter++;
            updateMoveCounter();
        }
    }
};

///* Inicializar ouvintes de eventos
$(".card").click(onClick);
$(".restart").click(resetGame);
