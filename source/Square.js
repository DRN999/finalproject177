


function Square(x, y, w, h)
{
	Shape.call(this, x, y);
	this.width = w;
	this.height = h;
    this.vertices = 
	[
		x - w/2, y + h/2, 0,
		x - w/2, y - h/2, 0,
		x + w/2, y + h/2, 0,
		x + w/2, y - h/2, 0
	]
	
	this.indices = 
	[
		0, 1, 2, 1, 3, 2
	]
	
	this.colors = 
	[
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0
	]
}

Square.prototype = Object.create(Shape.prototype);

Square.prototype.constructor = Square;

Square.prototype.ret_Area = function()
{
	return this.width * this.height;
}

Square.prototype.change_color = function(r, g, b)
{
	this.colors = [
		r, g, b,
		r, g, b,
		r, g, b,
		r, g, b
	]
}