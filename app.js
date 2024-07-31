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
    cell.style.boxShadow =
      player === "X" ? "3px 8px 10px #7b0101" : "3px 8px 10px #e2ed00";
    cell.style.color = player === "X" ? "#7b0101" : "#e2ed00";
    //check winner
    checkWinner();
    //change player
    if (running) switchPlayer();
  });
  //hover
  cell.addEventListener("mouseover", (e) => {
    if (cell.innerText === "" && running) {
      cell.classList.add(`hover-${player}`);
    }
  });

  cell.addEventListener("mouseout", (e) => {
    cell.classList.remove(`hover-${player}`);
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
  cells.forEach((cell) => {
    cell.classList.remove("hover-X", "hover-O");
  });
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
      } else {
        yWin++;
        scoreY.innerText = `Y: ${yWin}`;
      }
      running = false;
      return;
    }
  });
  if (running && Array.from(cells).every((cell) => cell.innerText !== "")) {
    tie++;
    scoreT.innerText = `TIE: ${tie}`;
    gameStatus.innerHTML = "TIE!";
    running = false;
  }
}
