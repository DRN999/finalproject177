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