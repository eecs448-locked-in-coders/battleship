/**
 * @class
 */
class Space {
/**
* @description Represents a single space on a board. Creates a Space object, defaulting to no ship and not hit
* @param {number} row The row the space is in on its board
* @param {number} col The column the space is in on its board
*/
	constructor(row, col) {
		/**
		* @member hasShip Whether any ship contains this space
		* @member isHit Whether this space has been attacked (regardless of if it has a ship)
		*/
		this.row = row;
		this.col = col;
		this.hasShip = false;
		this.isHit = false;
	}
}
