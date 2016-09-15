var iDirection = 0;
var FPS = 30;
var iPauseMS = 1000/FPS;
var iClock;
var iSpriteCount = 0;
var calculatedFPS = 9999;
function dcDraw() {
	try {
		clearCanvas();
		
		//Full-screen background images are expensive in terms of proccessing power!
		//backgroundImage.draw();
		for (var s=0;s<sprites.length;s++)
		{
			sprites[s].animate(iDirection);
		}

		if (inDirectCanvas() == true) { ctx.present(); } 

		//calcluate the FPS
		var iDiff = new Date() - iClock;
		calculatedFPS = Math.round(1000/iDiff);
		if (calculatedFPS > FPS) { calculatedFPS = FPS; }
		if (inDirectCanvas() == true) {
			AppMobi.webview.execute("document.getElementById('divInfo').innerHTML = 'FPS: " + calculatedFPS + "<br/>SPRITES: " + iSpriteCount + "';");
		} else {
			document.getElementById('divInfo').innerHTML = 'FPS: ' + calculatedFPS + '<br/>SPRITES: ' + iSpriteCount ;
		}
		iClock = new Date();
		
		var nextFrame = Math.round(iPauseMS - iDiff);
		if (nextFrame < 0) 
		{ dcDraw(); }
		else
		{
			iTimeout = setTimeout("dcDraw();",nextFrame);
		}
		
	} catch(e) { dcDebug(e.message); }
}

var sprites = new Array();
var boolAccelerometerStarted = false;

function startAnimation(x,y) {
	sprites[sprites.length] = new objSprite('images/walkSprite.png',8,x,y,76,136);
	iSpriteCount = iSpriteCount + 1;
	if (boolAccelerometerStarted == false) {
		boolAccelerometerStarted = true;
		if (inDirectCanvas() == true) {
			AppMobi.webview.execute("startAccelerometer();");
		} else { startAccelerometer(); }
	}
	if (boolGameLoopStarted = false) { startGameLoop(); }
}

var iTimeout;
var boolGameLoopStarted = false;
function startGameLoop() {
	boolGameLoopStarted = true;
	iTimeout = setTimeout("dcDraw();",iPauseMS);
	iClock = new Date();
}

function stopGameLoop() {
	clearTimeout(iTimeout);
	boolGameLoopStarted = false;
}

//var backgroundImage = new objImage("images/dojo.jpg",0,0,WIDTH,HEIGHT);
startGameLoop();

