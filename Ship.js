class Ship {
	/**
	* @param length How long the ship is
	* @param x The x coordinate of the left end of the ship
	* @param y The y coordinate of the top end of the ship
	* @param isVertical Direction of ship (false = horizontal)
	**/
	constructor(length, x, y, isVertical) {
		this.length = length;
		this.x = x;
		this.y = y;
		this.isVertical = isVertical;
	}
	
	/**
	* @return Whether the given x, y coordinates intersect the ship
	**/
	isIntersecting(x, y) {
	
	}
}