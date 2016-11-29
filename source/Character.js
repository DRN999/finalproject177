
function Character(x, y)
{
	this.x_orig = x;
	this.y_orig = y;
	this.shapes = new Array();
	this.isPlayer = false;
	this.playerNum = 0;
}

Character.prototype.addShape = function(obj)
{
	if(!obj instanceof Shape)
	{
		console.log("incorrect format");
		return -1;
	}
	obj.updateVertices(this.x_orig, this.y_orig);
	this.shapes.push(obj);
	
}

Character.prototype.change_character = function(x,y)
{
	this.x_orig = x;
	this.y_orig = y;
	
}

Character.prototype.shift_character = function(x,y)
{
	this.x_orig += x;
	this.y_orig += y;
}

Character.prototype.updateVertices = function()
{
	for(var i in this.shapes)
	{
		this.shapes[i].updateVertices(this.x_orig, this.y_orig);
	}
}

Character.prototype.change_all_color = function(r,g,b)
{
	for(var i in this.shapes)
	{
		this.shapes[i].change_color(r,g,b);
	}
}
