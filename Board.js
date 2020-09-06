class Board {
	constructor(rows, cols) {
		this.ships = [];
		this.cells = [];
		for (let row = 0; row < rows; row++) {
			this.cells[row] = [];
			for (let col = 0; col < cols; col++) {
				this.cells[row][col] = new Space(col, row);
			}
		}
	}
	
	/**
	* @param table The DOM element to render the board to
	* @param showShips Boolean for whether all ship locations should be visible
	* @param executive Object to use the clickSpace method of
	**/
	render(table, showShips, executive) {
		table.innerHTML = ""; // Remove any existing cells
		
		// Add letter row
		let letter = 'A';
		let tr = document.createElement("tr");
		let th = document.createElement("th");
		tr.appendChild(th);
		for (let cell of this.cells[0]) {
			let th = document.createElement("th");
			th.innerText = letter;
			tr.appendChild(th);
			letter = String.fromCharCode(letter.charCodeAt(0) + 1); // Increment letter
		}
		table.appendChild(tr);
		
		let num = 1;
		for (let row of this.cells) {
			let tr = document.createElement("tr");
			
			// Add number column
			let th = document.createElement("th");
			th.innerText = num;
			tr.appendChild(th);
			num++;
			
			for (let cell of row) {
				let td = document.createElement("td");
				if (cell.isHit) td.classList.add("hit");
				if ((cell.isHit || showShips) && cell.hasShip) td.classList.add("ship");
				td.addEventListener("click", e => executive.clickSpace(cell));
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
	}
	
	// TODO: Validate coordinates are within bounds of board
	placeShip(length, row, col, isVertical) {
		let ship = new Ship(length, row, col, isVertical);
		this.ships.push(ship);
		let coords = ship.listIntersecting();
		for (let coord of coords) {
			this.cells[coord[0]][coord[1]].hasShip = true;
		}
	}
	
	// Currently unused
	attack(row, col) {
		this.cells[row][col].isHit = true;
		this.checkWin();
	}
	
	checkWin() {
	}
}