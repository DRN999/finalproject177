//Shape object
// basic shape container

function Shape(x, y)
{
	this.locX = x;
	this.locY = y;
	this.vertices = new Array();
	this.indices = new Array();
	this.colors = new Array();
	this.indices_max = 0;
	this.draw = true;
}

Shape.prototype.retX = function()
{
	return this.locX;
}

Shape.prototype.retY = function()
{
	return this.locY;
}

Shape.prototype.change_location = function(x,y)
{
	this.locX = x;
	this.locY = y;
}

Shape.prototype.shift_location = function(x,y)
{
	this.locX += x;
	this.locY += y;
}


Shape.prototype.added_indices = function(num)
{
	var temp = new Array();
	for(var i = 0; i < this.indices.length; i++)
	{
		temp.push(this.indices[i] + num);
	}
	return temp;
}
