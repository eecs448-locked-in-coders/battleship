const ROWS = 10;
const COLS = 10;

// Initialize board
window.addEventListener("DOMContentLoaded", () => {
	let board = document.getElementById("board");
	for (let row = ROWS; row >= 1; row--) {
		let tr = document.createElement("tr");
		for (let col = 1; col <= COLS; col++) {
			let td = document.createElement("td");
			td.innerText = "O"; // TODO: Create a space object here
			tr.appendChild(td);
		}
		board.appendChild(tr);
	}
});