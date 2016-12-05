
function ImageShape(x, y, w, h, url, index)
{
	Shape.call(this, x, y);
	this.width = w;
	this.height = h;
	
    this.vertices = 
	[
		x - w/2, y + h/2, 0,
		x - w/2, y - h/2, 0,
		x + w/2, y + h/2, 0,
		x + w/2, y - h/2, 0
	]
	
	this.indices = 
	[
		0, 1, 2, 
		1, 3, 2
	]
	
	this.indices_max = 3;
	
	this.url = url;
	var tex = gl.createTexture();
	this.texture = tex;
	var img = new Image();
	this.image = img;
	this.loaded = false;
	this.index = index;
	this.image.onload = function()
	{
		handleTextureLoaded(img, tex);
		loadedImage(index);
	}
	this.image.crossOrigin = "";
	this.image.src = url;
	this.tex_coord = 
	[
		0, 0,
		0, 1,
		1, 0,
		1, 1
	];
}

ImageShape.prototype = Object.create(Shape.prototype);

ImageShape.prototype.constructor = ImageShape;

ImageShape.prototype.changeImage = function(url)
{
	this.url = url;
	var tex = gl.createTexture();
	this.texture = tex;
	var img = new Image();
	this.image = img;
	this.loaded = false;
	var index = this.index;
	this.image.onload = function()
	{
		handleTextureLoaded(img, tex);
		loadedImage(index);
	}
	this.image.crossOrigin = "";
	this.image.src = url;
}


ImageShape.prototype.flipTextureVert = function()
{
	var tex1 = [this.tex_coord[0],this.tex_coord[1]];
	var tex2 = [this.tex_coord[2],this.tex_coord[3]];
	var tex3 = [this.tex_coord[4],this.tex_coord[5]];
	var tex4 = [this.tex_coord[6],this.tex_coord[7]];
	this.tex_coord[0] = tex2[0];
	this.tex_coord[1] = tex2[1];
	this.tex_coord[2] = tex1[0];
	this.tex_coord[3] = tex1[1];
	this.tex_coord[4] = tex4[0];
	this.tex_coord[5] = tex4[1];
	this.tex_coord[6] = tex3[0];
	this.tex_coord[7] = tex3[1];
}

ImageShape.prototype.flipTextureHori = function()
{
	var tex1 = [this.tex_coord[0],this.tex_coord[1]];
	var tex2 = [this.tex_coord[2],this.tex_coord[3]];
	var tex3 = [this.tex_coord[4],this.tex_coord[5]];
	var tex4 = [this.tex_coord[6],this.tex_coord[7]];
	this.tex_coord[0] = tex3[0];
	this.tex_coord[1] = tex3[1];
	this.tex_coord[2] = tex4[0];
	this.tex_coord[3] = tex4[1];
	this.tex_coord[4] = tex1[0];
	this.tex_coord[5] = tex1[1];
	this.tex_coord[6] = tex2[0];
	this.tex_coord[7] = tex2[1];
}


function isPowerOf2(value) 
{
	return (value & (value - 1)) == 0;
}

function handleTextureLoaded(image, texture)
{
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
	if(isPowerOf2(image.width) && isPowerOf2(image.height))
	{
		gl.generateMipmap(gl.TEXTURE_2D);
	}
	else
	{
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
	}		
}

ImageShape.prototype.updateVertices = function(x, y)
{
	this.vertices =
	[
		x + this.locX - this.width/2, y + this.locY + this.height/2, 0,
		x + this.locX - this.width/2, y + this.locY - this.height/2, 0,
		x + this.locX + this.width/2, y + this.locY + this.height/2, 0,
		x + this.locX + this.width/2, y + this.locY - this.height/2, 0
	];
}

function loadedImage(index)
{
	image_track[index].loaded = true;
}