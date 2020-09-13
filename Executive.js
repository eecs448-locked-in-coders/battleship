/**
* @class
* @description Sets up the game with the user selected number of ships
**/
class Executive {
    constructor() {
		let numShips = 0;
		document.getElementById("ship-slider").addEventListener("input", e => {
			numShips = e.target.value
			document.getElementById("num-ships").innerHTML = numShips;
		});

		// Setting up the event for a click to change the menu for the board
		document.getElementById("complete").addEventListener("click", () => {
			document.getElementById("firstPlayer").value = document.getElementById("Player1").value;
			document.getElementById("firstPlayer").disabled = true;
			document.getElementById("secondPlayer").value = document.getElementById("Player2").value;
			document.getElementById("secondPlayer").disabled = true;
			document.getElementById("menu").style.display = "none";
			document.getElementById("controls").style.display = "";
			document.getElementById("both_boards").style.display = "";
			document.getElementById("switch-turn").style.display = "none";
			this.game = new Gameplay(9, 9, numShips);
			// For testing
			this.game.placeSampleShips();
			this.game.renderBoards();
		});
    }
}
