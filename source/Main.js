
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
			updateKeyInfo();
			updateMouseInfo();
			drawStuff();
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
	if (Key.isDown(Key.w)||Key.isDown(Key.W)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, 10);
	if (Key.isDown(Key.a)||Key.isDown(Key.A)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(-10, 0);
	if (Key.isDown(Key.s)||Key.isDown(Key.S)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, -10);
	if (Key.isDown(Key.d)||Key.isDown(Key.D)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(10, 0);
	
	if (Key.isDown(Key.SPACE))
	{		
		scene1.objects[ITEM_KEY.PLAYER2].shapes[3].draw = true;
		checkCollisionSpray();
	}
	else scene1.objects[ITEM_KEY.PLAYER2].shapes[3].draw = false;
	
	scene1.objects[ITEM_KEY.PLAYER2].updateVertices();
}// End updateKeyInfo

function checkCollisionSpray()
{// check if the spray collides with the hair
	for(var j = 0; j < scene1.objects[ITEM_KEY.FOOTHAIR].shapes.length; j++)
	{
		if( scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name == 'hair')
		{
			var checkX = scene1.objects[ITEM_KEY.FOOTHAIR].x_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locX;
			var checkY = scene1.objects[ITEM_KEY.FOOTHAIR].y_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locY;
			var player = scene1.objects[ITEM_KEY.PLAYER2];
			if
			(
				checkX <= player.x_orig + player.shapes[3].locX + player.shapes[3].width/2 &&
				checkX >= player.x_orig + player.shapes[3].locX - player.shapes[3].width/2 &&
				checkY <= player.y_orig + player.shapes[3].locY + player.shapes[3].height/2 &&
				checkY >= player.y_orig + player.shapes[3].locY - player.shapes[3].height/2
			){
				scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].change_color(1, 1, 1, 1);
				scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name = "spray-hair";
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
		if(scene1.objects[ITEM_KEY.FOOTHAIR].shapes.length == 0)
			initHair(scene1.objects[ITEM_KEY.FOOTHAIR]);
	}
}// End updateMouseInfo

function checkSprayedHair()
{// see if razor gets any sprayed hair
	for(var j = 0; j < scene1.objects[ITEM_KEY.FOOTHAIR].shapes.length; j++)
	{
		if(scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name == "spray-hair")
		{
			var checkX = scene1.objects[ITEM_KEY.FOOTHAIR].x_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locX;
			var checkY = scene1.objects[ITEM_KEY.FOOTHAIR].y_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locY;
			var player = scene1.objects[ITEM_KEY.PLAYER1];
			if
			(
				checkX <= player.x_orig + 150 &&
				checkX >= player.x_orig - 150 &&
				checkY <= player.y_orig + 150 &&
				checkY >= player.y_orig - 150
			){
				scene1.objects[ITEM_KEY.FOOTHAIR].remove(j);
			}
		}
	}
}// End checkSprayedHair

function initTemp()
{// initializes the shapes
	var neg = ITEM_KEY.PLAYER1 == 0 ? 1 : -1;
	Mouse.x = neg == -1 ? 300 : 0;
	
	//extra
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
	
	
	// leg
	c = new Character(0, 0);
	lel = new Square(0, 0, 100, 350);
	lel.change_color(1, 0.5, 0, 1);
	c.addShape(lel);
	lel = new Square(0, -200, 150, 75);
	lel.change_color(1, 0.5, 0, 1);
	c.addShape(lel);
	c.drawFormat = "TRIANGLES";
	scene1.addObject(c);
	
	//hair
	c = new Character(0,0);
	initHair(c);
	c.drawFormat = "TRIANGLES";
	scene1.addObject(c);
	
	
	//p2
	c = new Character(300 * neg, 0);
	lel = new ImageShape(0, 0, 300, 300, "../resources/Razor Pink in claws.png", 0);
	image_track.push(lel);
	c.addShape(lel);
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	scene1.addObject(c);
	
	//p1
	c = new Character(300 * neg, 0);
	lel = new ImageShape(0, 0, 300, 300, "../resources/Shaving Cream in claws.png", 0);
	lel.flipTextureHori();
	image_track.push(lel);
	c.addShape(lel);
	c.drawFormat = "TRIANGLES";
	c.drawProgram = 1;
	scene1.addObject(c);
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
		var lel = new Square
		(
			(Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 45) + 0)), 
			(Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 150) + 0)), 
			10, 10
		);
		lel.name = "hair";
		c.addShape(lel);
	}
	c.change_all_color(0, 0, 0, 1);
	
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
			tex = scene1.objects[i].shapes[0].tex_coord;
			n = initVertexBuffersTexture(gl, vertices, tex, indices, scene1.objects[i].shapes[0].texture);
		}
		gl.drawElements(DRAW_KEY.get(scene1.objects[i].drawFormat), n , gl.UNSIGNED_SHORT, 0); 	
		
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

function initVertexBuffersTexture(gl, vertices, tex_coord, indices, texture)
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
	
	gl.bindTexture(gl.TEXTURE_2D, texture);
	init_array_buffer(vertex_buffer, 3, "a_Position", f_vertices, gl.program);
	init_array_buffer(texture_buffer, 2, "a_Texcoord", f_tex_coord, gl.program);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, u_indices, gl.STATIC_DRAW);
	
	return u_indices.length;
	
}