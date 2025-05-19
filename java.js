const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");
const turnDisplay = document.getElementById("turn");
let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  isXTurn = true;
  turnDisplay.textContent = "Giliran Pemain X";
  cells.forEach((cell) => {
    cell.classList.remove("x", "o");
    cell.textContent = "";
    cell.style.cursor = "pointer";
    cell.addEventListener("click", handleClick, { once: true });
  });
  restartButton.disabled = true;
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? "x" : "o";

  cell.textContent = currentClass.toUpperCase();
  cell.classList.add(currentClass);
  cell.style.cursor = "default";

  if (checkWin(currentClass)) {
    turnDisplay.textContent = `Pemain ${currentClass.toUpperCase()} Menang!`;
    endGame();
  } else if (isDraw()) {
    turnDisplay.textContent = "Permainan Seri!";
    endGame();
  } else {
    isXTurn = !isXTurn;
    turnDisplay.textContent = `Giliran Pemain ${isXTurn ? "X" : "O"}`;
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) =>
    combination.every((index) => cells[index].classList.contains(currentClass))
  );
}

function isDraw() {
  return [...cells].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("o")
  );
}

function endGame() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.style.cursor = "default";
  });
  restartButton.disabled = false;
}

restartButton.addEventListener("click", startGame);

startGame();
