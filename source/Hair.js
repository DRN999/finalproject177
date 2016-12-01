
function Hair(x, y, s)
{
	Shape.call(this, x, y);
	this.name = "hair"
	this.size = s;
	this.color = [0, 0, 0, 1];
	this.vertices = [x, y, 0];
	this.indices = [0];
	this.indices_max= 1;
}

Hair.prototype = Object.create(Shape.prototype);

Hair.prototype.constructor = Hair;


