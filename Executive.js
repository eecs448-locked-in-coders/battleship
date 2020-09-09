class Executive {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;

		// Which player's turn it is (players are false and true, aka 0 and 1)
		this.turn = false; 

		let numbShips = this.setNumShips(); //finish

		this.board0 = new Board(rows, cols, 5); //Fake number to test
		this.board1 = new Board(rows, cols, 5);
		
		this.renderBoards(false);

		document.getElementById("switch-turn").addEventListener("click", e => {
			this.blankBoards();
			let modal = document.getElementById("modal");
			modal.style.display = "block"
			let time = 5;
			let timer  = setInterval(() => {
				document.getElementById("modal-content").innerHTML = "Next turn in " + time + " seconds!"; // FIX: Displays 0
				time--;
				if (time<0) {
					modal.style.display = "none";
					this.turn = !this.turn;
					this.renderBoards(false);
					clearInterval(timer);
				}
				},1000);
				
		});
		
		document.getElementById("ship-slider").addEventListener("input", e => {
			document.getElementById("num-ships").innerHTML = e.target.value;
		});
	}

	blankBoards() {
		this.board0.render(document.getElementById("board0"), false, this, false);
		this.board1.render(document.getElementById("board1"), false, this, false);
	}	
	renderBoards(x) {
		this.board0.render(document.getElementById("board0"), !this.turn, this, x);
		this.board1.render(document.getElementById("board1"), this.turn, this, x);
	}

	//FIX
	renderBothBoards() {
		this.board0.render(document.getElementById("board0"), true, this, true);
		this.board1.render(document.getElementById("board1"), true, this, true);
	}
	
	//FINISH
	setNumShips() {
		//return();  like that
	}
	

	switchTurns() {
	}
	
	clickSpace(cell,blocked) {
		if (!blocked) {
			cell.isHit = true;
			// TODO: Check if a ship was there
			this.renderBoards(true);	
		}
	}

	/**
	* @description Used for testing gameplay before the ship placement feature is added
	**/
	placeSampleShips() {
		this.board0.placeShip(1, 1, 1, false);
		this.board0.placeShip(2, 4, 1, true);
		this.board0.placeShip(3, 5, 0, true);
		this.board0.placeShip(4, 2, 3, false);
		this.board0.placeShip(5, 7, 3, false);

		this.board1.placeShip(1, 1, 1, true);
		this.board1.placeShip(2, 1, 4, false);
		this.board1.placeShip(3, 0, 5, false);
		this.board1.placeShip(4, 3, 2, true);
		this.board1.placeShip(5, 3, 7, true);
	}
}
