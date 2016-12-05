
function main()
{// main function
	
	initShaders();
	gl.useProgram(default_program);
	gl.program = default_program;
	if(!gl)
	{
		console.log("failed to load context");
		return -1;
	}
	
	initTemp();
	initInputMouse();
	initInputKey();
	
	console.log(image_track_0);
	var start = function()
	{
		if(check_loaded(image_track_0))
		{
			console.log("called");
			drawStuff();
			updateMouseInfoMenu();
		}
		if(!press_start)
			requestAnimationFrame(start, canvas);
	}
	start();
	
	scenes[0].drawing = false;
	scenes[1].drawing = true;
	
	var tick = function()
	{// animation tick
		if(check_loaded(image_track))
		{
			drawStuff();
			updateKeyInfo();
			updateMouseInfo();
		}
		else
		{
			console.log("loading");
		}
		requestAnimationFrame(tick, canvas);					
	}// End tick()
	tick();
	
}// End main

function check_loaded(tracker)
{
	for(var i = 0; i < tracker.length; i++)
	{
		if(!tracker[i].loaded)
			return false;
	}
	return true;
}

function initShaders()
{
	default_program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	tex_program = createProgram(gl, VSHADER_SOURCE_TEXTURE, FSHADER_SOURCE_TEXTURE);
}

function updateKeyInfo()
{// updates the keyboard inputs
	if (Key.isDown(Key.w)||Key.isDown(Key.W))
	{
		scenes[1].objects[ITEM_KEY.PLAYER2].shift_character(0, 10);
		scenes[1].objects[ITEM_KEY.CREAM].shift_character(0,10);
	}
		
	if (Key.isDown(Key.a)||Key.isDown(Key.A)) 
	{
		scenes[1].objects[ITEM_KEY.PLAYER2].shift_character(-10, 0);
		scenes[1].objects[ITEM_KEY.CREAM].shift_character(-10, 0);
	}
		
	if (Key.isDown(Key.s)||Key.isDown(Key.S)) 
	{
		scenes[1].objects[ITEM_KEY.PLAYER2].shift_character(0, -10);
		scenes[1].objects[ITEM_KEY.CREAM].shift_character(0, -10);
	}
		
	if (Key.isDown(Key.d)||Key.isDown(Key.D)) 
	{
		scenes[1].objects[ITEM_KEY.PLAYER2].shift_character(10, 0);
		scenes[1].objects[ITEM_KEY.CREAM].shift_character(10, 0);
	}
	
	if (Key.isDown(Key.SPACE))
	{		
		scenes[1].objects[ITEM_KEY.CREAM].shapes[0].draw = true;
		checkCollisionSpray();
	}
	else
	{
		scenes[1].objects[ITEM_KEY.CREAM].shapes[0].draw = false;
	}
	
	scenes[1].objects[ITEM_KEY.PLAYER2].updateVertices();
	scenes[1].objects[ITEM_KEY.CREAM].updateVertices();
}// End updateKeyInfo

function checkCollisionSpray()
{// check if the spray collides with the hair
	for(var j = 0; j < scenes[1].objects.length; j++)
	{
		if( scenes[1].objects[j].name == 'hair')
		{
			var checkX = scenes[1].objects[j].x_orig;
			var checkY = scenes[1].objects[j].y_orig;
			var player = scenes[1].objects[ITEM_KEY.PLAYER2];
			if
			(
				checkX <= player.x_orig + 350 &&
				checkX >= player.x_orig + 25  &&
				checkY <= player.y_orig + 0 &&
				checkY >= player.y_orig - 50
			){
				scenes[1].objects[j].shapes[0].changeImage("Cream 2.png");
				scenes[1].objects[j].name = "spray-hair";
			}
		}
	}
}// End checkCollisionSpray

function updateMouseInfo()
{// updates the mouse input
	scenes[1].objects[ITEM_KEY.PLAYER1].change_character(Mouse.x, Mouse.y);
	scenes[1].objects[ITEM_KEY.PLAYER1].updateVertices();
	if(Mouse.isDown(Mouse.LEFT))
	{
		checkSprayedHair();
	}
	if(Mouse.isDown(Mouse.RIGHT))
	{
		if(scenes[1].objects[ITEM_KEY.FOOTHAIR].shapes.length == 0){}
			//initHair(scenes[1].objects[ITEM_KEY.FOOTHAIR]);
	}
}// End updateMouseInfo

function updateMouseInfoMenu()
{
	if
	(
		Mouse.x > -300 && Mouse.x < 300 &&
		Mouse.y > -100 && Mouse.y < 100 
	){
		scenes[0].objects[0].drawObject = false;
		scenes[1].objects[1].drawObject = true;
		if(Mouse.isDown(Mouse.LEFT))
			press_start = true;
	}
	else
	{
		scenes[0].objects[0].drawObject = true;
		scenes[1].objects[1].drawObject = false;
	}
}

function checkSprayedHair()
{// see if razor gets any sprayed hair
	for(var j = 0; j < scenes[1].objects.length; j++)
	{
		if(scenes[1].objects[j].name == "spray-hair" && scenes[1].objects[j].drawObject)
		{
			var checkX = scenes[1].objects[j].x_orig + scenes[1].objects[j].shapes[0].locX;
			var checkY = scenes[1].objects[j].y_orig + scenes[1].objects[j].shapes[0].locY;
			var player = scenes[1].objects[ITEM_KEY.PLAYER1];
			if
			(
				checkX <= player.x_orig + 40 &&
				checkX >= player.x_orig - 90 &&
				checkY <= player.y_orig + 30 &&
				checkY >= player.y_orig + 5
			){
				scenes[1].objects[j].remove(0);
				scenes[1].objects[j].drawObject = false;
			}
		}
	}
}// End checkSprayedHair

function initTemp()
{// initializes the shapes
	scenes[0].drawing = true;
	scenes[1].drawing = false;
	
	var neg = ITEM_KEY.PLAYER1 == 0 ? 1 : -1;
	Mouse.x = neg == -1 ? 300 : 0;
	
	
	var c = new Character(0, 0);
	var lel = new ImageShape(0, 0, 600, 200, "Play.png", 0);
	image_track_0.push(lel);
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scenes[0].addObject(c); 
	
	c = new Character(0, 0);
	var lel = new ImageShape(0, 0, 600, 200, "Play_select.png", 1);
	image_track_0.push(lel);
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.drawObject = false;
	c.addShape(lel);
	scenes[0].addObject(c); 
	
	
	//extra
	/*
	c = new Character(300, 0);
	lel = new Square(0, 50, 200, 35);
	c.addShape(lel);
	lel = new Square(100, 0, 50, 75);
	c.addShape(lel);
	lel = new Square(0, 0, 200, 25);
	c.addShape(lel);
	lel = new Square(0, -50, 200, 35);
	c.addShape(lel);
	lel = new Square(-100, 0, 50, 75);
	c.addShape(lel);
	c.drawFormat = "TRIANGLES";
	c.change_all_color(0, 0, 1, 1);
	scenes[1].addObject(c);
	*/
	
	// leg
	/*
	c = new Character(0, 0);
	lel = new Square(0, 0, 100, 350);
	lel.change_color(1, 0.5, 0, 1);
	c.addShape(lel);
	lel = new Square(0, -200, 150, 75);
	lel.change_color(1, 0.5, 0, 1);
	c.addShape(lel);
	c.drawFormat = "TRIANGLES";
	scenes[1].addObject(c);
	*/
	
	var c = new Character(0, 0);
	var lel = new ImageShape(0, 0, 450, 720, "Leg.png", image_index++);
	image_track.push(lel);
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scenes[1].addObject(c);
	ITEM_KEY.FOOT = image_index - 1;
	
	
	//hair
	initHair();
	
	//p2
	c = new Character(300 * neg, 0);
	lel = new ImageShape(0, 0, 300, 600, "Razor Pink in claws.png", image_index++);
	image_track.push(lel);
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scenes[1].addObject(c);
	ITEM_KEY.PLAYER1 = image_index - 1;
	
	//p1
	c = new Character(300 * neg, 0);
	lel = new ImageShape(0, 0, 300, 600, "Shaving Cream in claws.png", image_index++);
	lel.flipTextureHori();
	image_track.push(lel);
	
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scenes[1].addObject(c);
	ITEM_KEY.PLAYER2 = image_index - 1;
	
	//cream
	c = new Character(300 * neg + 250, 58);
	lel = new ImageShape(0, 0, 600, 300, "Cream 1.png", image_index++);
	image_track.push(lel);
	lel.draw = false;
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scenes[1].addObject(c);
	ITEM_KEY.CREAM = image_index - 1;
	
	/*
	var c = new Character(300 * neg, 0);
	var lel = new Square(25, 50, 100, 25);
	c.addShape(lel);
	lel = new Square(0, 0, 100, 200);
	c.addShape(lel);
	lel = new Square(0, 100, 50, 25);
	c.addShape(lel);
	lel = new Square(150, 50, 150, 75);
	lel.change_color(1, 1, 1, 1);
	lel.draw = false;
	c.addShape(lel);
	c.drawFormat = "TRIANGLES";
	scenes[1].addObject(c);
	*/
	
	
}// End initTemp

function initHair(c)
{
	
	var rand = Math.floor((Math.random() * 30) + 15);
	for(var i = 0; i < rand; i++)
	{
		var c = new Character((Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 100) + 0)), 
			(Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 200) + 0)));
		var lel = new ImageShape
		(
			-100, 100,
			200, 200, 
			"Hair " + Math.floor((Math.random() * 6) + 1) + ".png", 
			image_index++
		);
		image_track.push(lel);
		
		c.addShape(lel);
		c.drawProgram = 1;
		c.name = "hair";
		c.drawFormat = "TRIANGLES";
		scenes[1].addObject(c);
	}
	
}


function drawStuff()
{//draws the shapes
	
	gl.clearColor(1, 1, 1, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	gl.enable(gl.BLEND);
	//gl.enable(gl.DEPTH_TEST);
	var vertices = new Array();
	var indices = new Array();
	var colors = new Array();
	var tex = new Array();
	var num = 0;
	for(var n = 0; n < scenes.length; n++)
	{
		if(scenes[n].drawing)
		{
			for(var i = 0; i < scenes[n].objects.length; i++)
			{
				if(scenes[n].objects[i].drawObject)
				{
					if(scenes[n].objects[i].drawProgram == 0)
					{
						vertices = scenes[n].objects[i].concat_vertices();
						indices = scenes[n].objects[i].concat_indices();
						colors  = scenes[n].objects[i].concat_colors();
						num = initVertexBuffers(gl, vertices, indices, colors);
					}
					else
					{
						vertices = scenes[n].objects[i].concat_vertices();
						indices = scenes[n].objects[i].concat_indices();
						tex = scenes[n].objects[i].get_tex();
						num = initVertexBuffersTexture(gl, vertices, tex, indices, scenes[n].objects[i].shapes[0].texture, scenes[n].objects[i].shapes[0].index);
					}
					gl.drawElements(DRAW_KEY.get(scenes[n].objects[i].drawFormat), num , gl.UNSIGNED_SHORT, 0); 
				}		
				
			}
		}
	}
	//gl.clearColor(1, 1, 1, 1);
	//gl.colorMask(false, false, false, true);
	//gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
	
}// End drawStuff

function initVertexBuffers(gl, vertices, indices, colors)
{// buffers the light objects
	gl.useProgram(default_program);
	gl.program = default_program;
	var f_vertices = new Float32Array(vertices);
	var f_colors = new Float32Array(colors);
	var u_indices = new Uint16Array(indices);
	
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
				
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

	init_array_buffer(vertex_buffer, 3, "a_Position", f_vertices, gl.program);
	init_array_buffer(color_buffer, 4, "a_Colors", f_colors, gl.program);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, u_indices, gl.STATIC_DRAW);
	
	return u_indices.length;
	
}// End initVertexBuffers

function initVertexBuffersTexture(gl, vertices, tex_coord, indices, texture, index)
{
	
	gl.useProgram(tex_program);
	gl.program = tex_program;
	var f_vertices = new Float32Array(vertices);
	var f_tex_coord = new Float32Array(tex_coord);
	var u_indices = new Uint16Array(indices);
	
	var mvpMatrix = new Matrix4();
	var vertex_buffer = gl.createBuffer();
	var index_buffer = gl.createBuffer();
	var texture_buffer = gl.createBuffer();
	var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	mvpMatrix.setOrtho
	(
		-640, 640,
		-360, 360,
		-600, 600
	);
	
	if(!vertex_buffer || ! index_buffer || !texture_buffer)
	{// check if both buffer created succesfully 
		console.log("failed to create buffer");
		return -1;
	}
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	
	//gl.activeTexture(gl.TEXTURE0 + index);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	var u_Texture = gl.getUniformLocation(gl.program, "u_Texture");
	gl.uniform1i(u_Texture, 0);
	init_array_buffer(vertex_buffer, 3, "a_Position", f_vertices, gl.program);
	init_array_buffer(texture_buffer, 2, "a_Texcoord", f_tex_coord, gl.program);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, u_indices, gl.STATIC_DRAW);
	
	return u_indices.length;
	
}