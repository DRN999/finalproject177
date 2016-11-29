
function main()
{
	
	var shader = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if(!gl || !shader)
	{
		console.log("failed to load context");
		return -1;
	}
	initTemp();
	initInputMouse();
	initInputKey();
	var tick = function()
	{// animation tick
		updateKeyInfo();
		drawStuff();
		requestAnimationFrame(tick, canvas);					
	}// End tick()
	tick();
	
}

function updateKeyInfo()
{
	if (Key.isDown(Key.w)||Key.isDown(Key.W)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, 10);
	if (Key.isDown(Key.a)||Key.isDown(Key.A)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(-10, 0);
	if (Key.isDown(Key.s)||Key.isDown(Key.S)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, -10);
	if (Key.isDown(Key.d)||Key.isDown(Key.D)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(10, 0);
	scene1.objects[ITEM_KEY.PLAYER2].updateVertices();
}

function initTemp()
{
	var c = new Character(-300, 0);
	var lel = new Square(25, 50, 100, 25);
	c.addShape(lel);
	lel = new Square(0, 0, 100, 200);
	c.addShape(lel);
	lel = new Square(0, 100, 50, 25);
	c.addShape(lel);
	scene1.addObject(c);
	
	c = new Character(300, 0);
	lel = new Square(0, 50, 200, 35);
	c.addShape(lel);
	lel = new Square(75, 0, 50, 75);
	c.addShape(lel);
	lel = new Square(0, -50, 200, 35);
	c.addShape(lel);
	c.change_all_color(0, 0, 1);
	scene1.addObject(c);
	
	c = new Character(0, 0);
	lel = new Square(0, 0, 100, 350);
	c.addShape(lel);
	lel = new Square(0, -200, 150, 75);
	c.addShape(lel);
	c.change_all_color(1, 0.5, 0);
	lel = new Square(-25, 50, 50, 50);
	lel.change_color(0, 0, 0);
	c.addShape(lel);
	scene1.addObject(c);
	
	
	
}


function drawStuff()
{//text function
	gl.clearColor(1,1,1,1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	for(var i = 0; i < scene1.objects.length; i++)
	{
		for(var j = 0; j < scene1.objects[i].shapes.length; j++)
		{
			var n = initVertexBuffers(gl, i, j);
			gl.drawElements(gl.TRIANGLES, n , gl.UNSIGNED_SHORT, 0);
		}
	}
}

function initVertexBuffers(gl, index, index_s)
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
				
	f_vertices = new Float32Array(scene1.objects[index].shapes[index_s].vertices);
	f_colors = new Float32Array(scene1.objects[index].shapes[index_s].colors);
	u_indices = new Uint16Array(scene1.objects[index].shapes[index_s].indices);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

	init_array_buffer(vertex_buffer, 3, "a_Position", f_vertices, gl.program);
	init_array_buffer(color_buffer, 3, "a_Colors", f_colors, gl.program);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, u_indices, gl.STATIC_DRAW);
	
	return u_indices.length;
	
}// End initVertexBuffersLight