
function Scene(obj)
{
	if(!obj instanceof Array)
	{
		console.log("incorrect format");
		return -1;
	}
	this.objects = obj;
}

Scene.prototype.addObject = function(obj)
{
	if(!obj instanceof Shape)
	{
		console.log("incorrect format: input is not instance of Object");
		return -1;
	}
	this.objects.push(obj);
	return 1;
}

Scene.prototype.objects = function()
{
	return this.objects;
}