class Gameplay {
	constructor(rows, cols, numbShip) {
		this.rows = rows;
		this.cols = cols;

		// Which player's turn it is (players are false and true, aka 0 and 1)
		this.turn = false;
		this.numbShips = numbShip;
		this.board0 = new Board(rows, cols, this.numbShips);
		this.board1 = new Board(rows, cols, this.numbShips);
		this.isSetup= false; //If false then we are in the ship placement phase (pre gameplay).
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
	}

	switchTurns(isVisible) {
		if (isVisible) {
			document.getElementById("switch-turn").style.display = "block";
		} else {
			document.getElementById("switch-turn").style.display = "none";
		}
	}

	blankBoards() {
		this.board0.render(document.getElementById("board0"), this, false, false);
		this.board1.render(document.getElementById("board1"), this,false, false);
		this.switchTurns(false);
	}
	renderBoards(final) {
		this.board0.render(document.getElementById("board0"), this, !this.turn, final);
		this.board1.render(document.getElementById("board1"), this,this.turn, final);
	}

	//FIX: doesn't show both boards
	TheEnd() {
		this.board0.render(document.getElementById("board0"), this, true, true);
		this.board1.render(document.getElementById("board1"), this, true, true);
	}


	clickSpace(cell, isCurrentPlayer) {
		let x = this.board1;
		if (this.isSetup)
		{
			if (!isCurrentPlayer && !cell.isHit) {
				cell.isHit = true;
				if (cell.hasShip)
				{
					if (this.turn){
						x = this.board0;
					}
					x.shipSpaces--;
					if (x.checkWin()){
						this.TheEnd();
					}
				}
				this.renderBoards(true);
				this.switchTurns(true);
			}
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
		this.isSetup=true;
	}
}


/*TODO:
	fix TheEnd
	finish ship placement
	Validate coordinates are within bounds of board
	restrict a cell to be clicked only once
*/
