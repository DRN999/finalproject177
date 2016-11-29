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
		scene1.objects[0].change_location(xPos, yPos);
		drawStuff();
	}// End onmousemove
}

function initInputKey()
{
	
	
}