class Executive {
    constructor() {
            let numbShips = 0;
            document.getElementById("ship-slider").addEventListener("input", e => {
                numbShips = e.target.value
                document.getElementById("num-ships").innerHTML = numbShips;
            });

            //setting up the event for a click to change the menu for the board
            document.getElementById("complete").addEventListener("click", () => { 
                document.getElementById("firstPlayer").value = document.getElementById("Player1").value;
                document.getElementById("secondPlayer").value = document.getElementById("Player2").value;
                document.getElementById("menu").style.display = "none";
                document.getElementById("both_boards").style.display = "block";
                window.game = new Gameplay(9, 9, numbShips);
                // For testing
                game.placeSampleShips();
                game.renderBoards();
            })
        
    }
}