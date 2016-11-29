//header
var VSHADER_SOURCE = document.getElementById("vertex-shader").text;// Vertex Shader
var FSHADER_SOURCE = document.getElementById("fragment-shader").text;// Fragment Shader
var canvas = document.getElementById('webgl'); // canvas
var gl = WebGLUtils.setupWebGL(canvas,{preserveDrawingBuffer: true}, {premultipliedAlpha: false});
var CANVAS_HEIGHT = 720;
var CANVAS_WIDTH = 1280;
var scene1 = new Scene(); // default screen

var ITEM_KEY =
{// object for taking care of the array number
	PLAYER1: 1,
	PLAYER2: 0,
	FOOTHAIR: 2,
	FOOT: 3
};
