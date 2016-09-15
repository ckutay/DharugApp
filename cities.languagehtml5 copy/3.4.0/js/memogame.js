function getAllImagesUrlsold(){
	baseUrl = "./wordimages/";
    names=new Array(98);
	startArray=new Array(98);
    startArray[0]="air";

    startArray[1]="airplane";
    startArray[2]="arm";
    startArray[4]="bag";
    startArray[5]="blowfly";
    startArray[6]="bottlebrush";
    startArray[7]="boy";
    startArray[8]="burn";
    startArray[9]="cap";
    startArray[10]="cave";
    startArray[11]="child";
    startArray[12]="climb";
    startArray[13]="black_cockatoo";
    startArray[14]="whit_cockatoo";
    startArray[15]="cucumber";
    startArray[16]="dance";
    startArray[17]="deep water";
    startArray[18]="dig";
    startArray[19]= "dingo";
    startArray[20]="dive";
    startArray[21]="dry";
    startArray[22]="eagle";
    startArray[23]="ear";
    startArray[24]="eat";
    startArray[25]="egg";
    startArray[26]="eggplant";
    startArray[27]="emu";
    startArray[28]="eye";
    startArray[29]="eyebrow";
    startArray[30]="father";
    startArray[31]="fence";
    startArray[32]="finger";
    startArray[33]="fish";
    startArray[34]="fishhook";
    startArray[35]="lower";
    startArray[36]="fly";
    startArray[37]="food";
    startArray[38]="friend";
    startArray[39]="frog";
    startArray[40]="glass";
    startArray[41]="good_morning";
    startArray[42]="good_night";
    startArray[43]="grass_tree";
    startArray[44]="grass";
    startArray[45]="grasshopper";
    startArray[46]="grub";
    startArray[47]="hair";
    startArray[48]="hand";
    startArray[49]="head";
    startArray[50]="heart";
    startArray[51]="horse";
    startArray[52]="hut";
    startArray[53]="jump";
    startArray[54]="eastern_gray_kangaroo";
    startArray[55]="kangaroo";
    startArray[56]="kettle";
   startArray[57]= "kingfisher";
    startArray[58]="knee";
    startArray[59]="ladder";
    startArray[60]="leg";
    startArray[61]="lightning";
    startArray[62]="rock_lily";
    startArray[63]="lily";
    startArray[64]="lips";
 
    startArray[65]="lizard";
   startArray[66]="man";
    startArray[67]="march_fly";
    startArray[68]="mother";
    startArray[69]="mouth";
    startArray[70]="nose";
    startArray[71]="oyster";
    startArray[72]="parrakeet";
    startArray[73]="pine_tree";
    startArray[74]="rain";
    startArray[75]="rainbow_lorikeett";
    startArray[76]="road";
    startArray[77]="sea_eagle";
    startArray[78]="sea_gull";
    startArray[79]="shoulder";
    startArray[80]="show";
    startArray[81]="sit";
    startArray[82]="skin";
    startArray[83]="skull";
    startArray[84]="smell";
    startArray[84]="snake";
    startArray[86]="spear_no_barb";
    startArray[87]="starfish";
    startArray[88]="stars";
    startArray[89]="talk";
    startArray[90]="throwing_spear";
    startArray[91]="toad_fish";
    startArray[92]="toe";
 
    startArray[93]="tree";
    startArray[94]="urinate";
    startArray[95]="waratah";
    startArray[96]="wash";
    startArray[97]="watch";
    startArray[98]="water";
    startArray[3]="willie_wagtail";
    this.names=getSoundUrls(startArray);
    console.log(this.names);
    baseArray = new Array(98);
	baseLen = startArray.length;
	for(i=0; i<=baseLen; i++){
		baseArray[i] = baseUrl + startArray[i]+".gif";
	}
      		return baseArray;
}

function shuffleArrayInPlace ( myArray, myArray2 ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
      var tempk = myArray2[i];
      var templ = myArray2[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
      myArray2[i]= templ;
     myArray2[j]=tempk;
      
   }
}

function MemoryGame(tbodyElement, clicksSpan, timerSpan){
	this._tbodyElement = tbodyElement;
	
	this._cardState = 0; // 1 for 1 card up, 2 for 2 cards up
	
	this._cardsTable = null;
	
	this._showingCard1 = null;
	this._showingCard2 = null;

	this._numClicks = 0;
    
	this._cardsUrls = getAllImagesUrls();
    this._cardSounds = getSoundsUrls();
	this._timerMinutes = 0;
	this._timerSeconds = 0;

	this._clicksSpan = clicksSpan;
	this._timerSpan = timerSpan;
	this._timer = null;
}

MemoryGame.fn = MemoryGame.prototype;

MemoryGame.fn.recreateTable = function(width, height){
	var html = [];
	
	this._w = width;
	this._h = height;
	var maxBoardSize = this._cardsUrls.length * 2;

	if(width * height > maxBoardSize){
		alert("Not enough images to support this board size (" + width*height + ", max of "+maxBoardSize+")");
		return;
	}
	
	this.genCardsTable();
	
	for(var i=0; i<height; i++){
		var line = "<tr>";
		
		for(var j=0; j<width; j++){
			line += "<td><div id='card_"+
				(i*this._w+j)
				+"' onclick='cardClickHandler(\"" + (i*this._w+j) + "\");'>"
				//+this._cardsTable[i*this._w+j]
				+"</div></td>";
		}
		line += "</tr>";
		
		html.push(line);
	}
	
	$(this._tbodyElement).html(html.join(""));
}

MemoryGame.fn.resetGame = function(){
	this.resetTimer();
	this._numClicks = 0;
	this._clicksSpan.html("0");
}

MemoryGame.fn.genCardsTablenew = function(){
	var linearTable = [];
	var namesTable=[];
	for(var i=0; i<(this._h*this._w)/4; i++){
		linearTable[i*2] = namesTable[i*2] = i;
	}
	
	shuffleArrayInPlace(linearTable, namesTable);
	
	this._cardsTable = linearTable+namesTable;
}
MemoryGame.fn.genCardsTable = function(){
	var linearTable = [];
	var namesTable=[];
	for(var i=0; i<(this._h*this._w)/2; i++){
		linearTable[i*2] = linearTable[i*2+1] = i;
	}
	
	shuffleArrayInPlace(linearTable, namesTable);
	
	this._cardsTable = linearTable;
}

function padZero10(num){
	if(num < 10){
		return "0"+num;
	}else{
		return ""+num;
	}
}

function MemoryGameTimerUpdater(memogame){
	memogame._timerSeconds += 1;
	if(memogame._timerSeconds >= 60){
		memogame._timerSeconds = 0;
		memogame._timerMinutes += 1;
	}
	s = padZero10(memogame._timerMinutes) + ":" + padZero10(memogame._timerSeconds);
	memogame._timerSpan.html(s);
}

MemoryGame.fn.startTimer = function(){
	if(this._timer)
		return;

	code = "MemoryGameTimerUpdater($('#game_table tbody').data('gameobject'))";
	this._timer = setInterval(code, 1000);
}

MemoryGame.fn.resetTimer = function(){
	if(this._timer)
		clearInterval(this._timer);
	this._timerSpan.html("00:00");
	this._timer = null;
	this._timerSeconds = 0;
	this._timerMinutes = 0;
}

MemoryGame.fn.cardClick = function(cardNum){
	var $cardDiv = $(this._tbodyElement).find('#card_'+cardNum);
	
	if($cardDiv.hasClass('showingCard') == true){
		// card already showing; nothing to do
		return;
	}

	if(this._numClicks == 0){
		this.startTimer()
	}

	cardImageNum = this._cardsTable[cardNum];
	
	switch(this._cardState){
	case 0:
		// card not showing
		$cardDiv.addClass('showingCard');

		url = this._cardsUrls[cardImageNum]
            $cardDiv.css('background-image', 'url(' + url + ')')
        
                   
		this._numClicks += 1;
		this._cardState = 1;
		this._showingCard1 = cardNum;
		break;
	case 1:
		// 1 card showing

		// whether or not it's a match, we set this, otherwise we
		// get a bug when clicking twice on the second card of a match
		$cardDiv.addClass("showingCard");
         

		// check if match
		if(this._cardsTable[cardNum] == this._cardsTable[this._showingCard1]){
			// if yes -> add class "pairFound"
			$cardDiv.addClass("pairFound");
			
			$(this._tbodyElement).find('#card_'+this._showingCard1).addClass("pairFound");
			
			this._cardState = 0;
		}else{
			// if no -> just leave it showing
			
			this._showingCard2 = cardNum;
			this._cardState = 2;
		}

		this._numClicks += 1;

		// in either case, we show the image
		url = this._cardsUrls[cardImageNum]
		$cardDiv.css('background-image', 'url(' + url + ')')
	
		break;
	case 2:
		// 2 cards showing

		// just close the two cards and go back to state = 1 card showing
		card1 = $(this._tbodyElement).find('#card_'+this._showingCard1);
		card1.removeClass("showingCard");
		card1.css('background-image', '');

		card2 = $(this._tbodyElement).find('#card_'+this._showingCard2);
		card2.removeClass("showingCard");
		card2.css('background-image', '');
	
		this._showingCard1 = this._showingCard2 = null;
		
		this._cardState = 0;
		break;
	}

	this._clicksSpan.html(this._numClicks);

}


function isInt(x) {
	var y=parseInt(x);
	if (isNaN(y)) return false;
	return x==y && x.toString()==y.toString();
} 

function startOverCallback(myArray){
	w = 4;
	h = 4;
    baseArray=myArray;
	if(!isInt(w) || !isInt(h)){
		alert("Fields must contain integers");
		return;
	}

	w = parseInt(w);
	h = parseInt(h);

	if((w * h) % 2 == 1){
		alert("width * height must not be odd (we need pairs)");
		return;
	}

	var game = $('#game_table tbody').data('gameobject');
	
	game.resetGame();

	game.recreateTable(w, h);
}

function cardClickHandler(cardNum){
	$('#game_table tbody').data('gameobject').cardClick(cardNum);
}

$(function(){
	var game = new MemoryGame($('#game_table tbody'), $('#num_clicks'), $('#timer'));
	
	game.recreateTable(4,4);
	
	$('#game_table tbody').data('gameobject', game);
});

