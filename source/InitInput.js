
var Mouse = 
{
	pressed: {},
	
	x: 0,
	y: 0,
	LEFT: 1,
	MIDDLE: 2,
	RIGHT: 3,	
	
	isDown: function(which)
	{
		return this.pressed[which];
	},
	
	onMouseDown: function(event)
	{
		this.pressed[event.which] = true;
	},
	
	onMouseUp: function(event)
	{
		delete this.pressed[event.which];
	},
	
	onMouseMove: function(event)
	{
		var rect = canvas.getBoundingClientRect(); 
		this.x = event.clientX - rect.left;
		this.y = event.clientY - rect.top;
		this.x = this.x - CANVAS_WIDTH/2;
		this.y = (this.y - CANVAS_HEIGHT/2)*-1;
	}
}

var Key = 
{
	pressed: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	w: 119,
	a: 97,
	s: 115,
	d: 100,
	W: 87,
	A: 65,
	S: 83,
	D: 68,
	
	isDown: function(keyCode) 
	{
		return this.pressed[keyCode];
	},
	  
	onKeydown: function(event) 
	{
		this.pressed[event.keyCode] = true;
	},
	  
	onKeyup: function(event) 
	{
		delete this.pressed[event.keyCode];
	}
};

function initInputMouse()
{
	canvas.addEventListener('mousedown', function(event){Mouse.onMouseDown(event);}, false);
	canvas.addEventListener('mouseup', function(event){Mouse.onMouseUp(event);}, false);
	canvas.addEventListener('mousemove', function(event){Mouse.onMouseMove(event);}, false);
}

function initInputKey()
{
	document.addEventListener('keyup', function(event){Key.onKeyup(event);}, false);
	document.addEventListener('keydown', function(event){Key.onKeydown(event);}, false);
}