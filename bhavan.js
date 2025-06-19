const board = document.getElementById("board");
const statusText = document.getElementById("status");
let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");
function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => 
{
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = index;
  cell.addEventListener("click", handleCellClick);
  board.appendChild(cell);
});
}
function handleCellClick(e) 
{
const index = e.target.dataset.index;
if (cells[index] !== "" || !gameActive) return;
  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (checkWinner()) {
  statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
  gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  cells = Array(9).fill("");
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}
createBoard();
