/**
* @class
* @description Represents a single ship on a board
* @member {number} length How many spaces long the ship should be
* @member {number} row The row coordinate of the top end of the ship
* @member {number} col The col coordinate of the left end of the ship
* @member {boolean} isVertical Direction of ship (false = horizontal)
**/
class Ship {
	/**
	* @description Creates a Ship object at the given size, location, and direction
	* @param {number} length How many spaces long the ship should be
	* @param {number} row The row coordinate of the top end of the ship
	* @param {number} col The col coordinate of the left end of the ship
	* @param {boolean} isVertical Direction of ship (false = horizontal)
	**/
	constructor(length, row, col, isVertical) {
		this.length = length;
		this.row = row;
		this.col = col;
		this.isVertical = isVertical;
	}

	/**
	* @return Whether the given row, col coordinates intersect the ship
	**/
	/*isIntersecting(coords) {
		for (let i =0; i<coords.length; i++)
		{
			
		}
		return (false);
	}*/

	/**
	* @return An array of (row, col) pairs of coordinates
	**/
	listIntersecting() {
		let coords = [];
		if (this.isVertical) {
			for (let i = 0; i < this.length; i++) {
				coords.push([this.row+i, this.col]);
			}
		} else { // Horizontal
			for (let i = 0; i < this.length; i++) {
				coords.push([this.row, this.col+i]);
			}
		}
		return coords; //Returns an array of all the coordinates the ship is currently occupying.
	}
}
