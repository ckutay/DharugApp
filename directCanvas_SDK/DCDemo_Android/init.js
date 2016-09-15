// Initial directCanvas JavaScript library

//get the context if it isn't already available
if (ctx == null) {
	var ctx = AppMobi.canvas.getContext("2d");
}

if(inXDK() == true)
{
	var WIDTH = 1024;
	var HEIGHT = 768;
}
else
{
	if (ctx.width == undefined || ctx.height == undefined)
	{
		var WIDTH = 1024;
		var HEIGHT = 768;
	}
	else
	{
		var WIDTH = ctx.width;
		var HEIGHT = ctx.height;
	}
}


//wrap in try/catch because XDK does not currently support this property
try {
	ctx.HTML5CompatibilityMode = true;
} catch(e){}


//use this to get debug messages from the directCanvas context
var debugTimeout;
var debugTimeoutPeriod = 6000;
function dcDebug(txt) {
	
	if (inXDK() == true) {
		console.log(txt);
	}
	else
	{
		if (inDirectCanvas() == true) {
			clearTimeout(debugTimeout);
			AppMobi.webview.execute("document.getElementById('divInfo').innerHTML+='<br/>" + txt + "';");
			debugTimeout = setTimeout(function(){
				AppMobi.webview.execute("document.getElementById('divInfo').innerHTML = '';");
			}, debugTimeoutPeriod);
		}
		else
		{
			clearTimeout(debugTimeout);
			document.getElementById('divInfo').innerHTML+='<br/>' + txt;
			debugTimeout = setTimeout(function(){
				document.getElementById('divInfo').innerHTML = '';	}, debugTimeoutPeriod);
		}
	}


	
}

function inXDK() {
	if (AppMobi.isxdk == true)
	{
		return true;
	} else { return false; }
}

function inDirectCanvas() {
	if (AppMobi.context == undefined) {
		return false;
	} else { return true; }
}


function convertDegreesToRadians (degrees) {
	return degrees * 0.0174532925;
}


function convertRadiansToDegrees (radians) {
	return Math.round(radians * 57.2957795);
}

function clearCanvas() {

	if (inXDK() == false && inDirectCanvas() == true) {
		
		ctx.clear();
	}
	else {
		ctx.clearRect(0,0,WIDTH,HEIGHT);
	}
}






function objImage(imageURL,x,y,width,height) {
	this.imgCanvas = new Image();
	this.imageURL = imageURL;
	this.loaded = false;
	this.x = x;
	this.y = y;
	this.height = height;
	this.width = width;
	
	this.draw = function() {
		
		//if (this.width == null || this.height == null)
		//{
			ctx.drawImage(this.imgCanvas,this.x,this.y); 
		//}
		//else
		//{
			//ctx.drawImage(this.imgCanvas,this.x,this.y,this.width,this.height); 		
		//}
	}
	
	this.load = function() {
		this.loaded = true;
		this.draw();
	}
		
	this.imgCanvas.onload = (function (obj) { 
		return function () {
		  obj.load()
		}
	  })(this)
	
	if (this.loaded == false) {
		this.imgCanvas.src=this.imageURL;
	}
}

function objSprite(imageURL,frameCount,x,y,frameWidth,frameHeight) {
	this.imgSprite = new Image();
	this.imageURL = imageURL;
	this.loaded = false;
	this.frame = 0;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.x = x;
	this.y = y;
	
	this.animate = function(deltaFrame) {
		
		this.frame = this.frame + deltaFrame;

		if (this.frame < 0) {this.frame = frameCount - 1; }
		if (this.frame >= frameCount) { this.frame = 0; }
		
		if (ctx.drawImageTile) {
			ctx.drawImageTile(this.imgSprite,this.x,this.y,this.frame,this.frameWidth,this.frameHeight,false,false,1);
		}
		else
		{
			//in the XDK, there is no drawImageTile command
			var sx = this.frame * this.frameWidth;
			try {
			ctx.drawImage(this.imgSprite,sx,0,this.frameWidth,this.frameHeight,this.x,this.y,this.frameWidth,this.frameHeight);
			} catch(e) {}
		}
	}
	
	
	//load sprite image
	this.load = function() {
		this.loaded = true;
		this.animate(0);
	}
		
	this.imgSprite.onload = (function (obj) { 
		return function () {
		  obj.load()
		}
	  })(this)
	
	this.imgSprite.src=this.imageURL;
}

