/**
* @class
* @description Manages the boards and user interaction during gameplay (ship placement and attacking)
* @member rows {number} The number of rows the boards have
* @member cols {number} The number of columns the boards have
* @member numShips {number} The number of ships each player has
* @member turn {boolean} Which player's turn it is - false is board0 (left) and true is board1 (right)
* @member isSetup {boolean} Whether the ship placement phase of gameplay has been completed
* @member board0 {Board} Player false's board
* @member board1 {Board} Player true's board
**/
class Gameplay {
	/**
	* @description Creates each player's board and begins the ship placement phase of gameplay
	* @param rows {number} The number of rows the boards have
	* @param cols {number} The number of columns the boards have
	* @param numShips {number} The number of ships each player will place
	**/
	constructor(rows, cols, numShip) {
		this.rows = rows;
		this.cols = cols;
		this.numShips = numShip;

		this.turn = false;
		this.isSetup = false;
		this.placedshipcount = 1;

		this.board0 = new Board(rows, cols, this.numShips);
		this.board1 = new Board(rows, cols, this.numShips);
		this.renderBoards(false);

		document.getElementById("switch-turn").addEventListener("click", e => {
			if (this.isSetup) {
				this.blankBoards();
				let modal = document.getElementById("modal");
				modal.style.display = "block";
				let time = 5;
				document.getElementById("modal-text").innerText = "Next turn in " + time + " seconds!";
				this.turnTimer = setInterval(() => {
					time--;
					document.getElementById("modal-text").innerText = "Next turn in " + time + " seconds!";
					if (time <= 0) this.switchTurns();
				}, 1000);
			}
			else { // Switch to second player placing their ships
				this.placedshipcount = 1;
				this.turn = true;
				document.getElementById("switch-turn").style.display = "none";
				this.renderBoards(false);
			}
		});
		
		document.getElementById("switch-now").addEventListener("click", e => this.switchTurns());
	}

	/**
	* @description Sets up the next player's turn by hiding the turn switch modal and displaying their ships
	**/
	switchTurns() {
		modal.style.display = "none";
		this.turn = !this.turn;
		this.renderBoards(false);
		clearInterval(this.turnTimer);
	}

	/**
	* @description Render the boards, hides the ships on both boards, for use during turn switching
	**/
	blankBoards() {
		this.board0.render(document.getElementById("board0"), this, false, true);
		this.board1.render(document.getElementById("board1"), this, false, true);
	}

	/**
	* @description Render the boards, only showing ships on the current player's board
	* @parameter {boolean} preventClicking Whether to not setup the clickSpace listener on each cell
	**/
	renderBoards(preventClicking) {
		this.board0.render(document.getElementById("board0"), this, !this.turn, preventClicking);
		this.board1.render(document.getElementById("board1"), this, this.turn, preventClicking);
	}

	/**
	* @description Render the boards, showing ships on both boards, and display a victory message
	**/
	gameEnd() {
		this.msg("YOU WIN!!!");
		this.board0.render(document.getElementById("board0"), this, true, true);
		this.board1.render(document.getElementById("board1"), this, true, true);
		document.getElementById("switch-turn").style.display = "";
	}
	
	/**
	* @description Handles a space being clicked on either board
	* @param {Space} cell The Space object that was clicked
	* @param {boolean} isCurrentPlayer Whether the board that was clicked belongs to the player whose turn it currently is
	* @param {boolean} isVertical Whether the ship is vertical or horizontal during ship placement
	**/
	clickSpace(cell, isCurrentPlayer, isVertical) {
		if (this.isSetup) {
			if (!isCurrentPlayer && !cell.isHit) {
				cell.isHit = true;
				if (cell.hasShip) {
					let board = this.turn ? this.board0 : this.board1;
					this.msg("Hit!");
					board.shipSpaces--;
					if (board.checkWin()){
						this.gameEnd();
					} 
					else {
						this.renderBoards(true);
						document.getElementById("switch-turn").style.display = "";
					}
				}
				else {
					this.renderBoards(true);
					document.getElementById("switch-turn").style.display = "";
					this.msg("Miss.")
				}
			}
		}
		else if (isCurrentPlayer) { // During setup phase, you click your own board
			this.newShip(cell, isVertical);
		}
	}

	/**
	* @description Places a new ship on the current player's board
	* @param cell {Space} The space the user clicked on, which will be the top/left end of the new ship
	* @param {boolean} isVertical Whether the ship is vertical or horizontal
	**/
	newShip(cell, isVertical) {
		let board = this.turn ? this.board1 : this.board0;
		let placedShip = board.placeShip(this.placedshipcount, cell.row, cell.col, isVertical);
		if (placedShip !== true) { // Failed to place ship in a valid location
			this.msg(placedShip);
			this.renderBoards(false);
		}
		else if (this.placedshipcount < this.numShips) { // Placed successfully and still more ships to place
			this.placedshipcount++;
			this.renderBoards(false);
		}
		else { // Last ship placed
			this.renderBoards(true);
			document.getElementById("switch-turn").style.display = "";
			if (this.board0.ships.length == this.board1.ships.length) { // Both players have placed their ships
				this.isSetup = true;
			}
		}
	}

	/**
	* @description Display a message to the current player
	**/
	msg(message) {
		document.getElementById("message").innerHTML = message;
	}
}
