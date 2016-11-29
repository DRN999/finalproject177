

function Shape(x, y)
{
	this.locX = x;
	this.locY = y;
}

Shape.prototype.retX = function()
{
	return this.locX;
}

Shape.prototype.retY = function()
{
	return this.locY;
}

Shape.prototype.set_pick_colors = function(rgb)
{// sets the picking color
	this.pick_colors = rgb/255;
}// End set_pick_colors

Shape.prototype.draw = function(gl)
{
	
}