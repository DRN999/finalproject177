// Character object
// contains single to multiple shapes that will stick as one character

function Character(x, y)
{
	this.x_orig = x;
	this.y_orig = y;
	this.shapes = new Array();
	this.isPlayer = false;
	this.playerNum = 0;
	this.drawFormat = "";
	this.drawProgram = 0;
	this.drawObject = true;
	this.name = "character";
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

Character.prototype.change_all_color = function(r,g,b,a)
{
	for(var i in this.shapes)
	{
		this.shapes[i].change_color(r,g,b,a);
	}
}

Character.prototype.remove = function(index)
{
	this.shapes.splice(index, 1);
}

Character.prototype.concat_vertices = function()
{
	var temp = new Array();
	for(var i = 0; i < this.shapes.length; i++)
	{
		if(this.shapes[i].draw)
			temp = temp.concat(this.shapes[i].vertices);
	}
	return temp;
}

Character.prototype.concat_indices = function()
{
	var temp = new Array();
	for(var i = 0; i < this.shapes.length; i++)
	{
		if(this.shapes[i].draw)
		{
			if(i == 0)
				temp = temp.concat(this.shapes[i].indices);
			else
				temp = temp.concat(this.shapes[i].added_indices((this.shapes[i-1].indices_max + 1) * (i)));
		}
	}
	return temp;
}

Character.prototype.concat_colors = function()
{
	var temp = new Array();
	for(var i = 0; i < this.shapes.length; i++)
	{
		if(this.shapes[i].draw)
			temp = temp.concat(this.shapes[i].colors);
	}
	return temp;
}

Character.prototype.get_tex = function()
{
	var temp = new Array();
	for(var i = 0; i < this.shapes.length; i++)
	{
		if(this.shapes[i].draw)
			temp = temp.concat(this.shapes[i].tex_coord);
	}
	return temp;
}