/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board;
let turn = 'X';
let win;

/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        /*Pour modifier le score*/
        if (winner === "X" || winner === "O"){
            ScoreUpdate(winner);
        }

        return winner ? winner : board.includes('') ? null : 'T';
}

function handleTurn() {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });

    /* Ajouter "if" Pour éviter le remplacement de X ou O déja présent && Arreter quand quelqu'un gagne*/   
    if(board[idx] === "" && win != "X" && win != "O"){
        board[idx] = turn;
        turn = turn === 'X' ? 'O' : 'X';
        win = getWinner();
        render();
    }
};

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    win = getWinner(); /* ajouter pour pouvoir recomencer a mettre des X et O après une partie*/
    render();
};

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `Égalité!` : win ? `${win} à gagner!` : `C'est le tour à ${turn}`;
    };

init();

/* Fonction Pour Compter le score */

localStorage.setItem("ScoreX", 0) /* Initialise les variable Pour le score*/
localStorage.setItem("ScoreO", 0) /*                ///                   */

function ScoreUpdate(winner) {
    if (winner === 'X') { /* Regarde si X à gagné */
        let textScoreX = document.getElementById('Victoire-X'); /* Associe avec HTML */
        let scoreX = localStorage.getItem("ScoreX"); /* Associe avec Storage Local */
        let winJoueurX = parseInt(scoreX); /* Transforme la valeur du stockage local en int */
        winJoueurX += 1; /* Ajoute un au score de X */
        localStorage.setItem("ScoreX", winJoueurX); /* Met la variable dans le stockage local */
        textScoreX.textContent = winJoueurX; /* Affiche le score sur le site Web */

    } else if (winner === 'O') { /* Regarde si O à gagné */

        let textScoreO = document.getElementById('Victoire-O'); /* Associe avec HTML */
        let scoreO = localStorage.getItem("ScoreO"); /* Associe avec Storage Local */
        let winJoueurO = parseInt(scoreO); /* Transforme la valeur du stockage local en int */
        winJoueurO += 1; /* Ajoute un au score de X */
        localStorage.setItem("ScoreO", winJoueurO); /* Met la variable dans le stockage local */
        textScoreO.textContent = winJoueurO; /* Affiche le score sur le site Web */
    }
}
