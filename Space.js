/**
* @class
* @description Represents a single space on a board
* @member row The row the space is in on its board
* @member col The column the space is in on its board
* @member hasShip Whether any ship contains this space
* @member isHit Whether this space has been attacked (regardless of if it has a ship)
*/
class Space {
	/**
	* @description Creates a Space object, defaulting to no ship and not hit
	* @param row The row the space is in on its board
	* @param col The column the space is in on its board
	**/
	constructor(row, col) {
		this.row = row;
		this.col = col;
		this.hasShip = false;
		this.isHit = false;
	}
}
