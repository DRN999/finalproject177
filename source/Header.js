//header
var VSHADER_SOURCE = document.getElementById("vertex-shader").text;// Vertex Shader
var FSHADER_SOURCE = document.getElementById("fragment-shader").text;// Fragment Shader
var VSHADER_SOURCE_TEXTURE = document.getElementById("vertex-shader-texture").text;// Vertex Shader
var FSHADER_SOURCE_TEXTURE = document.getElementById("fragment-shader-texture").text;// Fragment Shader
var canvas = document.getElementById('webgl'); // canvas
var gl = WebGLUtils.setupWebGL(canvas,{preserveDrawingBuffer: true}, {premultipliedAlpha: false},{alpha: false});
var image_track = new Array();
var default_program;
var tex_program;
var CANVAS_HEIGHT = 720;
var CANVAS_WIDTH = 1280;
var scene1 = new Scene(); // default screen
var image_index = 0;


var ITEM_KEY =
{// object for taking care of the array number
	FOOT: 0,
	FOOTHAIR: 1,
	PLAYER1: 2,
	PLAYER2: 3,
	CREAM: 4
};

var DRAW_KEY = new Map();
DRAW_KEY.set("POINTS", gl.POINTS);
DRAW_KEY.set("LINE_STRIP", gl.LINE_STRIP);
DRAW_KEY.set("TRIANGLES", gl.TRIANGLES);
