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

window.onload = function() {
    updateCards();
};

///* Reload pagina
let reload = $('.restart');
reload.on('click', function() {
    location.reload();
});

///* Var para obter os cards abertos
let opened = $('.open');

///* Var para conter numnber de movimentos
let palpites = 0;

///* Var para registar os cards combinados
let isCombined = false;

let stars = false;

let deck = $('.deck');

let modal = $("#myModal1");


//--------------init logic game-------------------

///* contando os movimentos

const view = {
    displayMove: function(move) {
        //Metodo atualiza o number de moves
        let moves = $('.moves');
        move++;
        moves.text(move);
    },
    displayHitStars: function(star) {
        //Metodo remove as stars
        let stars = $('ul').children();
        stars.remove('li');
    },
    displayMiss: function(location) {
        let card = $('.card');
        card.addClass('open', 'show');
    }
};


// Vars do game
let open = [];
//var palpites = 0;
let moveCounter = 0;
let numStars = 3;

// Difficulty settings (max number of moves for each star)
let hard = 15;
let medium = 20;

// Randomizes cards on board and updates card HTML
function updateCards() {
    deck = shuffle(deck);
    var index = 0;
    $.each($(".card i"), function() {
        $(this).find().attr("class", "fa " + deck[index]);
        index++;
    });
};

// Toggles win modal on
function showModal() {
    $('#myModal1').modal('show');
    setTimeout(function() {
        $('#myModal1').modal('hide')
    }, 3000);
};

// Remove stars
function removeStar() {
    $(".stars").last().attr("class", "fa fa-star-o");
    numStars--;
    $("li").text(String(numStars));
};

// Restaura as stars
function resetStars() {
    $("stars").attr("class", "fa fa-star");
    numStars = 3;
    $("li").text(String(numStars));
};

// Aqui os movimentos são exibidos 
function updateMoveCounter() {
    $(".moves").text(moveCounter);

    if (moveCounter === hard || moveCounter === medium) {
        removeStar();
    }
};

// Verifica se o cartão é um movimento válido (se não estiver atualmente combinado ou aberto)
function isValid(card) {
    return !(card.hasClass("open") || card.hasClass("bounce") || card.hasClass("match"));
};

// Retorna se os cartões atualmente abertos correspondem ou não
function checkMatch() {
    if (open[0].children().attr("class") === open[1].children().attr("class")) {
        return true;
    } else {
        return false;
    }
};

// Retorna se teve acerto
function hasWon() {
    if (palpites === 16) {
        return true;
    } else {
        return false;
    }
};

// Aqui se os cards estão abertos e se teve acerto
const setMatch = function() {
    open.forEach(function(card) {
        card.addClass("match");
    });
    open = [];
    palpites += 2;
    if (hasWon()) {
        showModal();
        resetGame();
    }
};

// Volta os cards ao estado padrão
const resetOpen = function() {
    open.forEach(function(card) {
        card.toggleClass("open");
        card.toggleClass("show");
        card.toggleClass("flipInY");
    });
    open = [];
};

// Definição de cards abertos
function openCard(card) {
    if (!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        card.addClass("flipInY");
        open.push(card);
    }
};


// Reseta o game
const resetGame = function() {
    open = [];
    palpites = 0;
    moveCounter = 0;
    updateMoveCounter();
    $(".card").attr("class", "card");
    updateCards();
    resetStars();
};

// aqui resolve a logica do game
const onClick = function() {
    if (isValid($(this))) {

        if (open.length === 0) {
            openCard($(this));

        } else if (open.length === 1) {
            openCard($(this));
            moveCounter++;
            updateMoveCounter();
            if (checkMatch()) {
                setTimeout(setMatch, 300);
            } else {
                setTimeout(resetOpen, 700);

            }
        }
    }
};

// Redefine o estado do game
const playAgain = function() {
    resetGame();
    modal.css("display", "none");
};


/*
 * Lista de event
 */

$(".card").click(onClick);
$(".restart").click(resetGame);
$(".play-again").click(playAgain);