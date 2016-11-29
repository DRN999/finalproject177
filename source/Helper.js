// Helper.js
// Noriaki Nakano
// contains the small helper functions and calculation functions

function init_array_buffer(buffer, vert, name, buffer_element, program)
{// init array buttons  **does not work for element array buffer

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, buffer_element, gl.STATIC_DRAW);
	var attribute = gl.getAttribLocation(program, name);
	if(attribute < 0)
	{
		console.log("failed to load attribute");
		return -1;
	}
	gl.vertexAttribPointer(attribute, vert, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(attribute);

}// End init_array_buffer

function min(number, min)
{ // return the number if larger than min, otherwise return min

	if(number < min)
		return min;
	return number;
	
}// End min

function max(number, max)
{// returns the number if smaller than max, otherwise return max

	if(number > max)
		return max;
	return number;
	
}// End max

function numeric_lock(e)
{ // used algorithm: http://stackoverflow.com/a/3404022 :prevents non-numerical input from user

	return (e.ctrlKey || e.altKey || (47<e.keyCode && e.keyCode<58 && e.shiftKey==false) 
			|| (95<e.keyCode && e.keyCode<106)|| (e.keyCode==8) || (e.keyCode==9) || (e.keyCode>34 && e.keyCode<40) 
			|| (e.keyCode==46));
			
}// End numeric_lock

function pushCurrentCoord()
{// pushes the current coordinate into the array

	orig_vertices.push(xPos, yPos, zPos);

}// End pushCurrentCoord

function matrixRotateX(x,y,z,angle)
{// input array with x,y,and z coordinate and rotate the point about the x-axis and return the rotated point
	var rotationMatrix =
	[
		1, 0, 0,
		0, Math.cos(angle * Math.PI / 180.0), Math.sin(angle * Math.PI/180.0) * -1,
		0, Math.sin(angle * Math.PI / 180.0), Math.cos(angle * Math.PI/180.0)
	];
	return applyTransformationMatrix(x, y, z, rotationMatrix);
}// End matrixRotateX

function matrixRotateY(x,y,z,angle)
{// input array with x,y,and z coordinate and rotate the point about the y-axis and return the rotated point
	var rotationMatrix = 
	[// rotation matrix about y axis
		Math.cos(angle * Math.PI / 180.0), 0.0, Math.sin(angle * Math.PI / 180.0),
		0.0, 1.0, 0.0, 
		Math.sin(angle * Math.PI / 180.0) * -1.0, 0.0, Math.cos(angle * Math.PI / 180.0)
	];
	return applyTransformationMatrix(x, y, z, rotationMatrix);
}// End matrixRotateY

function matrixRotateZ(x,y,z,angle)
{// input array with x,y,and z coordinate and rotate the point about the z-axis and return the rotated point
	var rotationMatrix = 
	[// rotation matrix about y axis
		Math.cos(angle * Math.PI / 180.0), Math.sin(angle * Math.PI / 180.0) * -1, 0,
		Math.sin(angle * Math.PI / 180.0), Math.cos(angle * Math.PI / 180.0), 0.0,
		0.0, 0.0, 1.0
	];
	return applyTransformationMatrix(x, y, z, rotationMatrix);
}// End matrixRotateZ

function matrixScale(x,y,z,factor)
{// input x, y, and z and scale factor to scale the point
	var scaleMatrix =
	[
		factor, 0, 0,
		0, factor, 0,
		0, 0, factor
	];
	return applyTransformationMatrix(x, y, z, scaleMatrix);
}// End matrixScale

function matrixTranslate(x, y, z, tx, ty, tz)
{// input x, y, z, tx, ty, and tz to translate the point
	return [x + tx, y + ty, z + tz];
}// End matrixTranslate

function applyTransformationMatrix(x, y, z, matrix)
{// multplies that matrix to the coordinates
	return	[
				x * matrix[0] + y * matrix[1] + z * matrix[2],
				x * matrix[3] + y * matrix[4] + z * matrix[5],
				x * matrix[6] + y * matrix[7] + z * matrix[8]
			];
}// End applyTransformationMatrix