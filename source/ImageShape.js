
function ImageShape(x, y, w, h, url, index)
{
	Square.call(this, x, y, w, h);
	this.url = url;
	this.texture = gl.createTexture();
	this.image = new Image();
	this.loaded = false;
	this.index = index;
	this.image.crossOrigin = "";
	this.image.src = url;
	
	this.image.onload = function()
	{
		this.loaded = true;
		handleTextureLoaded(this.image, this.texture);
		gl.activeTexture(gl.TEXTURE0 + this.index);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.useProgram(tex_program);
		gl.program = tex_program;
		var u_Texture = gl.getUniformLocation(gl.program, "u_Texture");
		gl.uniform1i(u_Texture, 0);
	}
	this.tex_coord = 
	[
		0, 0,
		0, 1,
		1, 0,
		1, 1	
	];
	this.name = "image";
	console.log(this.image);
}

ImageShape.prototype = Object.create(Square.prototype);

ImageShape.prototype.constructor = ImageShape;

function isPowerOf2(value) 
{
	return (value & (value - 1)) == 0;
}

function handleTextureLoaded(image, texture)
{
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	console.log(image);
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