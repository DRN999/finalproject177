function main()
{
	
	var shader = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if(!gl || !shader)
	{
		console.log("failed to load context");
		return -1;
	}
	initInput();
	drawStuff();
}

function drawStuff()
{//text function
	var n = initVertexBuffers(gl);
	gl.drawElements(gl.TRIANGLES, n , gl.UNSIGNED_SHORT, 0);
}

function initVertexBuffers(gl)
{// buffers the light objects
	var f_vertices;
	var f_colors;
	var u_indices;
	var mvpMatrix = new Matrix4();
	var vertex_buffer = gl.createBuffer();
	var index_buffer = gl.createBuffer();
	var color_buffer = gl.createBuffer();
	var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	
	mvpMatrix.setOrtho
	(
		-640, 640,
		-360, 360,
		-600, 600
	);
	
	if(!vertex_buffer || ! index_buffer || !color_buffer)
	{// check if both buffer created succesfully 
		console.log("failed to create buffer");
		return -1;
	}
	
	var lel = new Square(100, 100, 200, 200);
	lel.set_pick_color(currentOBJ);
	currentOBJ++;
	console.log(lel.pick_color);
	console.log(lel.retX() + ", " + lel.retY());
						
	f_vertices = new Float32Array(lel.vertices);
	f_colors = new Float32Array(lel.colors);
	u_indices = new Uint16Array(lel.indices);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

	init_array_buffer(vertex_buffer, 3, "a_Position", f_vertices, gl.program);
	init_array_buffer(color_buffer, 3, "a_Colors", f_colors, gl.program);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, u_indices, gl.STATIC_DRAW);
	
	return u_indices.length;
	
}// End initVertexBuffersLight