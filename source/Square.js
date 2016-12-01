//Square object
//extends off Shape and contains more in-depth information

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
	
	this.indices_max = 3;
	
	this.colors = 
	[
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1,
		1, 0, 0, 1
	]
	
	this.name = "square";
}

Square.prototype = Object.create(Shape.prototype);

Square.prototype.constructor = Square;

Square.prototype.ret_Area = function()
{
	return this.width * this.height;
}

Square.prototype.change_color = function(r, g, b, a)
{
	this.colors = [
		r, g, b, a,
		r, g, b, a,
		r, g, b, a,
		r, g, b, a
	]
}

Square.prototype.updateVertices = function(x, y)
{
	this.vertices =
	[
		x + this.locX - this.width/2, y + this.locY + this.height/2, 0,
		x + this.locX - this.width/2, y + this.locY - this.height/2, 0,
		x + this.locX + this.width/2, y + this.locY + this.height/2, 0,
		x + this.locX + this.width/2, y + this.locY - this.height/2, 0
	];
}
