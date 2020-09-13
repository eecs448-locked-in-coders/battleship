/**
* @class
* @description Manages the boards and user interaction during gameplay (ship placement and attacking)
* @member rows The number of rows the boards have
* @member cols The number of columns the boards have
* @member numShips The number of ships each player will place
* @member turn Which player's turn it is (players are false and true, aka 0 and 1)
* @member isSetup Whether the ship placement phase of gameply has been completed
**/
class Gameplay {
	constructor(rows, cols, numShip) {
		this.rows = rows;
		this.cols = cols;

		this.turn = false;
		this.isSetup = false;
		
		this.numShips = numShip;
		this.board0 = new Board(rows, cols, this.numShips);
		this.board1 = new Board(rows, cols, this.numShips);
		
		this.renderBoards(false);

		document.getElementById("switch-turn").addEventListener("click", e => {
			this.blankBoards();
			let modal = document.getElementById("modal");
			modal.style.display = "block"
			let time = 5;
			let timer = setInterval(() => {
				document.getElementById("modal-content").innerHTML = "Next turn in " + time + " seconds!"; // FIX: Displays 0
				time--;
				if (time < 0) {
					modal.style.display = "none";
					this.turn = !this.turn;
					this.renderBoards(false);
					clearInterval(timer);
				}
			}, 1000);
		});
	}

	switchTurns(isVisible) {
		document.getElementById("switch-turn").style.display = isVisible ? "block": "none";
	}

	blankBoards() {
		this.board0.render(document.getElementById("board0"), this, false, false);
		this.board1.render(document.getElementById("board1"), this, false, false);
		this.switchTurns(false);
	}
	
	renderBoards(isFinal) {
		this.board0.render(document.getElementById("board0"), this, !this.turn, isFinal);
		this.board1.render(document.getElementById("board1"), this, this.turn, isFinal);
	}

	//FIX: doesn't show both boards
	gameEnd() {
		alert("You win!") //Improve: Say which player won and display it better
		this.board0.render(document.getElementById("board0"), this, true, true);
		this.board1.render(document.getElementById("board1"), this, true, true);
	}

	clickSpace(cell, isCurrentPlayer) {
		if (this.isSetup) {
			if (!isCurrentPlayer && !cell.isHit) {
				cell.isHit = true;
				if (cell.hasShip) {
					let board = this.turn ? this.board0 : this.board1;
					board.shipSpaces--;
					if (board.checkWin()){
						this.gameEnd();
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
		
		this.isSetup = true;
	}
}

/*TODO:
	fix TheEnd
	finish ship placement
	Validate coordinates are within bounds of board
	restrict a cell to be clicked only once
*/
