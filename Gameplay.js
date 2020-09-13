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
		this.focusedboard = this.board0;
		this.renderBoards(false);

		document.getElementById("switch-turn").addEventListener("click", e => {
			if (this.isSetup) {
				this.blankBoards();
				let modal = document.getElementById("modal");
				modal.style.display = "block"
				let time = 5;
				this.turnTimer = setInterval(() => {
					// FIX: Displays 0
					// TODO: Implement this button in a much better way
					document.getElementById("modal-content").innerHTML = "Next turn in " + time + " seconds!<br><input type='button' value='Switch now' onclick='window.executive.game.switchTurns()'>";
					time--;
					if (time < 0) this.switchTurns();
				}, 1000);
			}
			else {
				this.placedshipcount = 1;
				this.focusedboard = this.board1;
				if (this.turn == false) {
					this.turn = true;
				}
				document.getElementById("switch-turn").style.display = "none";
				this.renderBoards(false);
			}
		});
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

	//FIX: doesn't show both boards
	/**
	* @description Render the boards, showing ships on both boards, and display a victory message
	**/
	gameEnd() {
		alert("You win!") //Improve: Say which player won and display it better
		this.board0.render(document.getElementById("board0"), this, true, true);
		this.board1.render(document.getElementById("board1"), this, true, true);
	}

	/**
	* @description Handles a space being clicked on either board
	* @param {Space} cell The Space object that was clicked
	* @param {boolean} isCurrentPlayer Whether the board that was clicked belongs to the player whose turn it currently is
	**/
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
				document.getElementById("switch-turn").style.display = "";
			}
		}
		else {
			this.newShip(cell);
		}
	}

	/**
	* @description Places a new ship on the current player's board
	* @param cell {Space} The space the user clicked on, which will be the top/left end of the new ship
	**/
	newShip(cell) {
		if (this.placedshipcount < this.numShips) {
			this.focusedboard.placeShip(this.placedshipcount, cell.row, cell.col, false);
			this.renderBoards(false);
			this.placedshipcount = this.placedshipcount + 1;
		}
		else if (this.placedshipcount == this.numShips) {
			this.focusedboard.placeShip(this.placedshipcount, cell.row, cell.col, false);
			this.renderBoards(true);
			document.getElementById("switch-turn").style.display = "";
			if (this.board0.ships.length == this.board1.ships.length) {
				this.isSetup = true;
			}
		}
		else {
			document.getElementById("switch-turn").style.display = "";
			this.renderBoards(true);
		}
	}

	/**
	* @description Used for testing gameplay before the ship placement feature is added
	**/
	placeSampleShips() {
		this.board0.placeShip(1, 1, 1, false);
		this.board0.placeShip(2, 4, 1, true);
		//this.board0.placeShip(3, 5, 0, true);
		//this.board0.placeShip(4, 2, 3, false);
		//this.board0.placeShip(5, 7, 3, false);

		this.board1.placeShip(1, 1, 1, true);
		this.board1.placeShip(2, 1, 4, false);
		//this.board1.placeShip(3, 0, 5, false);
		//this.board1.placeShip(4, 3, 2, true);
		//this.board1.placeShip(5, 3, 7, true);

		this.isSetup = true;
	}
}

/*TODO:
	fix TheEnd
	finish ship placement
	Validate coordinates are within bounds of board
	restrict a cell to be clicked only once
*/
