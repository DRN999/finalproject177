
function initInputMouse()
{
	canvas.oncontextmenu = function()
	{// prevents menu from appearing when rightclick is pressed
		
	}// end canvas.oncontextmenu

	canvas.onmousedown = function(e)
	{// initialize mousedown
		
	}// End onmousedown
	
	canvas.onmouseup = function(e)
	{// set down values when the mouse is released
		
	}// End onmouseup

	canvas.onmousemove = function(e)
	{// initialize mousemove
		var rect = canvas.getBoundingClientRect(); 
		var xPos = e.clientX - rect.left;
		var yPos = e.clientY - rect.top;
		xPos = xPos - CANVAS_WIDTH/2;
		yPos = (yPos - CANVAS_HEIGHT/2)*-1;
		scene1.objects[PLAYER1].change_character(xPos, yPos);
		scene1.objects[PLAYER1].updateVertices();
	}// End onmousemove
}

function initInputKey()
{
	document.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	document.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
}