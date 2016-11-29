//header
var VSHADER_SOURCE = document.getElementById("vertex-shader").text;// Vertex Shader
var FSHADER_SOURCE = document.getElementById("fragment-shader").text;// Fragment Shader
var canvas = document.getElementById('webgl'); // canvas
var gl = WebGLUtils.setupWebGL(canvas,{preserveDrawingBuffer: true});
var CANVAS_HEIGHT = 720;
var CANVAS_WIDTH = 1280;
var currentOBJ = 0;
var scene1 = new Scene();
var PROGRAM;
var PLAYER1 = 1;
var PLAYER2 = 0;

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