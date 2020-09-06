class Ship {
	/**
	* @param length How long the ship is
	* @param row The row coordinate of the top end of the ship
	* @param col The col coordinate of the left end of the ship
	* @param isVertical Direction of ship (false = horizontal)
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
	isIntersecting(row, col) {
	
	}
	
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
		return coords;
	}
}