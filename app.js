const cells = document.querySelectorAll(".cell");
const resetButton = document.querySelector(".reset");
const gameStatus = document.querySelector(".status");
var scoreX = document.getElementById("x");
var scoreT = document.getElementById("t");
var scoreY = document.getElementById("y");
const winCond = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var xWin = 0,
  yWin = 0,
  tie = 0;
let player = "X";
let running = true;

//game events
cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    //prevent overwrite
    if (cell.innerText !== "" || !running) return;
    //mark cell
    cell.innerText = player;
    //check winner
    checkWinner();
    //change player
    if (running) switchPlayer();
  });
});

//reset
resetButton.addEventListener("click", reset);

function switchPlayer() {
  player = player == "X" ? "O" : "X";
  gameStatus.innerHTML = `${player}'S TURN`;
}

function reset() {
  cells.forEach((cell) => {
    cell.innerText = "";
  });
  running = true;
  switchPlayer();
  gameStatus.innerHTML = `${player}'S TURN`;
}

function checkWinner() {
  winCond.forEach((cond) => {
    if (
      cells[cond[0]].innerText === player &&
      cells[cond[1]].innerText === player &&
      cells[cond[2]].innerText === player
    ) {
      gameStatus.innerHTML = `${player} WINS !!`;
      if (player === "X") {
        xWin++;
        scoreX.innerText = `X: ${xWin}`;
        running = false;
      } else if (player === "O") {
        yWin++;
        scoreY.innerText = `Y: ${yWin}`;
        running = false;
      }
    } else if (
      Array.from(cells).every((cell) => cell.innerText !== "") &&
      running
    ) {
      tie++;
      gameStatus.innerHTML = "TIE!";
      running = false;
    }
  });
}
