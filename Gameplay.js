/**
* @class
* @description Manages the boards and user interaction during gameplay (ship placement and attacking)
* @member rows The number of rows the boards have
* @member cols The number of columns the boards have
* @member numShips The number of ships each player has.
* @member turn Which player's turn it is (players are false and true, when it is the LHS player's turn, turn=0, when it's the RHS player's turn, turn=1).
* @member isSetup Whether the ship placement phase of gameply has been completed
**/
class Gameplay {
	constructor(rows, cols, numShip) {
		this.rows = rows;
		this.cols = cols;

		this.turn = false;
		this.isSetup = false;
		this.placedshipcount = 1;

		
		this.numShips = (numShip);
		this.board0 = new Board(rows, cols, this.numShips);
		this.board1 = new Board(rows, cols, this.numShips);
		this.focusedboard = this.board0;
		this.renderBoards(false);

		document.getElementById("switch-turn").addEventListener("click", e => {
			if (this.isSetup)
			{
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
			else
			{
				this.placedshipcount=1;
				this.focusedboard = this.board1;
				if (this.turn == false)
				{
					this.turn = true;
				}
				document.getElementById("switch-turn").style.display = "none";
				this.renderBoards(false);
			}
		});
	}
	
	switchTurns() {
		modal.style.display = "none";
		this.turn = !this.turn;
		this.renderBoards(false);
		clearInterval(this.turnTimer);
	}

	blankBoards() {
		this.board0.render(document.getElementById("board0"), this, false, false);
		this.board1.render(document.getElementById("board1"), this, false, false);
		document.getElementById("switch-turn").style.display = "none";
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
				document.getElementById("switch-turn").style.display = "";
			}
		}
		else
		{
			//this.placeSampleShips();
			this.newShip(cell);

		}
	}

	newShip(cell)
	{
		
		if (this.placedshipcount<this.numShips)
		{
			this.focusedboard.placeShip(this.placedshipcount,cell.row, cell.col, false);
			this.renderBoards(false);
			this.placedshipcount = this.placedshipcount+1;
		}
		else if (this.placedshipcount==(this.numShips))
		{
			this.focusedboard.placeShip(this.placedshipcount,cell.row, cell.col, false);
			this.renderBoards(true);
			document.getElementById("switch-turn").style.display = "";
			if (this.board0.ships.length == this.board1.ships.length)
			{
				this.isSetup=true;
			}
		}
		else
		{
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
