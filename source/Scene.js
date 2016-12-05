// Scene object(container)
// contains the characters that are in the scene

function Scene(obj)
{
	this.objects = new Array();
	if(obj instanceof Array)
	{
		this.objects = obj;
	}
	this.count = this.objects.length;
	this.drawing = false;
}

Scene.prototype.addObject = function(obj)
{
	if(!obj instanceof Character)
	{
		console.log("incorrect format: input is not instance of Object");
		return -1;
	}
	this.objects.push(obj);
	return 1;
}

Scene.prototype.pop = function()
{
	return this.objects.pop();
}

Scene.prototype.objects = function()
{
	return this.objects;
}

Scene.prototype.remove = function(index)
{
	this.objects.splice(index, 1);
}