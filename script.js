const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsComputerButton = document.getElementById('playerVsComputer');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameMode = 'playerVsPlayer';

function checkWinner(board) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function isBoardFull(board) {
    return board.every(cell => cell);
}

function makeMove(index, player) {
    if (!board[index]) {
        board[index] = player;
        cells[index].textContent = player;
        const winner = checkWinner(board);
        if (winner) {
            setTimeout(() => alert(`${winner} wins!`), 100);
            return true;
        } else if (isBoardFull(board)) {
            setTimeout(() => alert(`It's a draw!`), 100);
            return true;
        }
        return false;
    }
    return false;
}

function computerMove() {
    let availableMoves = [];
    board.forEach((cell, index) => {
        if (!cell) availableMoves.push(index);
    });
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove, 'O');
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!makeMove(index, currentPlayer)) {
        if (gameMode === 'playerVsComputer') {
            currentPlayer = 'O';
            setTimeout(() => {
                computerMove();
                currentPlayer = 'X';
            }, 500);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function setGameMode(mode) {
    gameMode = mode;
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', () => setGameMode('playerVsPlayer'));
playerVsComputerButton.addEventListener('click', () => setGameMode('playerVsComputer'));
