class Executive {
	constructor(rows, cols) {
		this.rows = rows;
		this.cols = cols;
		
		// Which player's turn it is (players are false and true, aka 0 and 1)
		this.turn = false; 
		
		this.board0 = new Board(rows, cols);
		this.board1 = new Board(rows, cols);
		
		this.renderBoards();
	}
	
	renderBoards() {
		this.board0.render(document.getElementById("board0"), !this.turn);
		this.board1.render(document.getElementById("board1"), this.turn);
	}
	
	switchTurns() {
	}
	
	clickSpace(board, x, y) {
	}
}