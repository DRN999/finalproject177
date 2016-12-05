
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
		
	var tick = function()
	{// animation tick
		if(check_loaded())
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

function check_loaded()
{
	for(var i = 0; i < image_track.length; i++)
	{
		if(!image_track[i].loaded)
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
		scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, 10);
		scene1.objects[ITEM_KEY.CREAM].shift_character(0,10);
	}
		
	if (Key.isDown(Key.a)||Key.isDown(Key.A)) 
	{
		scene1.objects[ITEM_KEY.PLAYER2].shift_character(-10, 0);
		scene1.objects[ITEM_KEY.CREAM].shift_character(-10, 0);
	}
		
	if (Key.isDown(Key.s)||Key.isDown(Key.S)) 
	{
		scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, -10);
		scene1.objects[ITEM_KEY.CREAM].shift_character(0, -10);
	}
		
	if (Key.isDown(Key.d)||Key.isDown(Key.D)) 
	{
		scene1.objects[ITEM_KEY.PLAYER2].shift_character(10, 0);
		scene1.objects[ITEM_KEY.CREAM].shift_character(10, 0);
	}
	
	if (Key.isDown(Key.SPACE))
	{		
		scene1.objects[ITEM_KEY.CREAM].shapes[0].draw = true;
		checkCollisionSpray();
	}
	else
	{
		scene1.objects[ITEM_KEY.CREAM].shapes[0].draw = false;
	}
	
	scene1.objects[ITEM_KEY.PLAYER2].updateVertices();
	scene1.objects[ITEM_KEY.CREAM].updateVertices();
}// End updateKeyInfo

function checkCollisionSpray()
{// check if the spray collides with the hair
	for(var j = 0; j < scene1.objects.length; j++)
	{
		if( scene1.objects[j].name == 'hair')
		{
			var checkX = scene1.objects[j].x_orig;
			var checkY = scene1.objects[j].y_orig;
			var player = scene1.objects[ITEM_KEY.PLAYER2];
			if
			(
				checkX <= player.x_orig + 350 &&
				checkX >= player.x_orig + 25  &&
				checkY <= player.y_orig + 0 &&
				checkY >= player.y_orig - 50
			){
				scene1.objects[j].shapes[0].changeImage("Cream 2.png");
				scene1.objects[j].name = "spray-hair";
			}
		}
	}
}// End checkCollisionSpray

function updateMouseInfo()
{// updates the mouse input
	scene1.objects[ITEM_KEY.PLAYER1].change_character(Mouse.x, Mouse.y);
	scene1.objects[ITEM_KEY.PLAYER1].updateVertices();
	if(Mouse.isDown(Mouse.LEFT))
	{
		checkSprayedHair();
	}
	if(Mouse.isDown(Mouse.RIGHT))
	{
		if(scene1.objects[ITEM_KEY.FOOTHAIR].shapes.length == 0){}
			//initHair(scene1.objects[ITEM_KEY.FOOTHAIR]);
	}
}// End updateMouseInfo

function checkSprayedHair()
{// see if razor gets any sprayed hair
	for(var j = 0; j < scene1.objects.length; j++)
	{
		if(scene1.objects[j].name == "spray-hair" && scene1.objects[j].drawObject)
		{
			var checkX = scene1.objects[j].x_orig + scene1.objects[j].shapes[0].locX;
			var checkY = scene1.objects[j].y_orig + scene1.objects[j].shapes[0].locY;
			var player = scene1.objects[ITEM_KEY.PLAYER1];
			if
			(
				checkX <= player.x_orig + 40 &&
				checkX >= player.x_orig - 90 &&
				checkY <= player.y_orig + 30 &&
				checkY >= player.y_orig + 5
			){
				scene1.objects[j].remove(0);
				scene1.objects[j].drawObject = false;
			}
		}
	}
}// End checkSprayedHair

function initTemp()
{// initializes the shapes
	var neg = ITEM_KEY.PLAYER1 == 0 ? 1 : -1;
	Mouse.x = neg == -1 ? 300 : 0;
	
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
	scene1.addObject(c);
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
	scene1.addObject(c);
	*/
	
	var c = new Character(0, 0);
	var lel = new ImageShape(0, 0, 450, 720, "Leg.png", image_index++);
	image_track.push(lel);
	
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scene1.addObject(c);
	
	//hair
	initHair();
	
	//p2
	c = new Character(300 * neg, 0);
	lel = new ImageShape(0, 0, 300, 600, "Razor Pink in claws.png", image_index++);
	image_track.push(lel);
	
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scene1.addObject(c);
	ITEM_KEY.PLAYER1 = image_index - 1;
	
	//p1
	c = new Character(300 * neg, 0);
	lel = new ImageShape(0, 0, 300, 600, "Shaving Cream in claws.png", image_index++);
	lel.flipTextureHori();
	image_track.push(lel);
	
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scene1.addObject(c);
	ITEM_KEY.PLAYER2 = image_index - 1;
	
	//cream
	c = new Character(300 * neg + 250, 58);
	lel = new ImageShape(0, 0, 600, 300, "Cream 1.png", image_index++);
	image_track.push(lel);
	lel.draw = false;
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	c.addShape(lel);
	scene1.addObject(c);
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
	scene1.addObject(c);
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
		scene1.addObject(c);
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
	var n = 0;
	for(var i = 0; i < scene1.objects.length; i++)
	{
		if(scene1.objects[i].drawObject)
		{
			if(scene1.objects[i].drawProgram == 0)
			{
				vertices = scene1.objects[i].concat_vertices();
				indices = scene1.objects[i].concat_indices();
				colors  = scene1.objects[i].concat_colors();
				n = initVertexBuffers(gl, vertices, indices, colors);
			}
			else
			{
				vertices = scene1.objects[i].concat_vertices();
				indices = scene1.objects[i].concat_indices();
				tex = scene1.objects[i].get_tex();
				n = initVertexBuffersTexture(gl, vertices, tex, indices, scene1.objects[i].shapes[0].texture, scene1.objects[i].shapes[0].index);
			}
			gl.drawElements(DRAW_KEY.get(scene1.objects[i].drawFormat), n , gl.UNSIGNED_SHORT, 0); 
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