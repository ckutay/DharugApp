// New touch forwarding is built into DC, so no need to send touches down via divs anymore, just use the code below and reference nX and nY as your touches.

var nX;
var nY;

    	Canvas.addEventListener('touchstart', function(event){
                     
                     nX=event.touches[0].pageX;
                     nY=event.touches[0].pageY;
                     _.firstPoint = true;
                     showPos(nX,nY);
                  }, false);


    	Canvas.addEventListener('touchmove', function(event){
					var nX = event.touches[0].pageX ;
					var nY = event.touches[0].pageY;
					
					showPos(nX,nY);
					
				}, false);
		



// Here are global variables for the DiretCanvas instance
// You need these declared so you can pass down new values from the webview layer 
var _ = {};
_.selColor="#07a0e4";
_.drawTool="pencil";
_.firstPoint = true;
_.ctx = AppMobi.canvas.getContext("2d");

function setMouseCoords(webX, webY) {
	showPos(webX, webY);
}
		
//wrap in try/catch because XDK does not currently support this property
try {
	_.ctx.HTML5CompatibilityMode = true;
} catch(e){}

//Set canvas dimensions 		
_.ctx.width=480;
_.ctx.height=320;
 
function drawLine(x, y)
{
	if(_.firstPoint == true)
	{	
		//Set color to selected
		_.ctx.strokeStyle = _.selColor;
		if(_.drawTool!="rectangle"){_.ctx.beginPath();}
		_.ctx.moveTo(x, y);
		_.firstPoint = false;
	}
	else
	{	
		switch(_.drawTool){
			//Set tool to selected
			case "array":
				_.ctx.strokeStyle = _.selColor;
				_.ctx.lineTo(x, y);
				_.ctx.stroke();
				_.ctx.closePath();
				break;
			case "pencil":
				_.ctx.strokeStyle = _.selColor;
				_.ctx.lineTo(x, y);
				_.ctx.stroke();
				_.ctx.moveTo(x, y);//hack for Ejecta Path
				break;
			case "rectangle":
				_.ctx.fillStyle = _.selColor;
				_.ctx.fillRect(x-50, y-50, 100, 100);
				
				break;
			case "clear":
				_.ctx.clearRect ( x-50 , y-50 , 100 , 100 );
				break;
			default:
				_.ctx.strokeStyle = _.selColor;
				_.ctx.lineTo(x, y);
				_.ctx.stroke();
		}
	}
	
}
function clear(){
	_.ctx.clearRect ( 0 , 0 , 1024 , 764 );
}
function showPos(x, y) {
	drawLine(x, y);
	_.ctx.present();
}
