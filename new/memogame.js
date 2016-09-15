
// Fisher-Yates shuffling algorithm
// Taken at http://sedition.com/perl/javascript-fy.html
function shuffleArrayInPlace ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}

function MemoryGame(tbodyElement){
	this._tbodyElement = tbodyElement;
	
	this._cardState = 0; // 1 for 1 card up, 2 for 2 cards up
	
	this._cardsTable = null;
	
	this._showingCard1 = null;
	this._showingCard2 = null;
}

MemoryGame.fn = MemoryGame.prototype;

MemoryGame.fn.recreateTable = function(width, height){
	var html = [];
	
	this._w = width;
	this._h = height;
	
	this.genCardsTable();
	
	for(var i=0; i<height; i++){
		var line = "<tr>";
		
		for(var j=0; j<width; j++){
			line += "<td><div id='card_"+
				(i*this._w+j)
				+"' onclick='cardClickHandler(\"" + (i*this._w+j) + "\");'>"
				+this._cardsTable[i*this._w+j]
				+"</div></td>";
		}
		line += "</tr>";
		
		html.push(line);
	}
	
	$(this._tbodyElement).html(html.join(""));
}

MemoryGame.fn.genCardsTable = function(){
	var linearTable = [];
	
	for(var i=0; i<(this._h*this._w)/2; i++){
		linearTable[i*2] = linearTable[i*2+1] = i;
	}
	
	shuffleArrayInPlace(linearTable);
	
	this._cardsTable = linearTable;
}

MemoryGame.fn.cardClick = function(cardNum){
	var $cardDiv = $(this._tbodyElement).find('#card_'+cardNum);
	
	if($cardDiv.hasClass('showingCard') == true){
		return;
	}
	
	switch(this._cardState){
	case 0:
		$cardDiv.addClass('showingCard');
		this._cardState = 1;
		this._showingCard1 = cardNum;
		break;
	case 1:
		// check if match
		if(this._cardsTable[cardNum] == this._cardsTable[this._showingCard1]){
			// if yes -> add class "pairFound"
			$cardDiv.addClass("pairFound");
			$(this._tbodyElement).find('#card_'+this._showingCard1).addClass("pairFound");
			
			this._cardState = 0;
		}else{
			// if no -> just leave it showing
			$cardDiv.addClass("showingCard");
			this._showingCard2 = cardNum;
			this._cardState = 2;
		}
		
		break;
	case 2:
		// just close the two cards and go back to state = 1 card showing
		$(this._tbodyElement).find('#card_'+this._showingCard1).removeClass("showingCard");
		$(this._tbodyElement).find('#card_'+this._showingCard2).removeClass("showingCard");
		
		this._showingCard1 = this._showingCard2 = null;
		
		$cardDiv.addClass("showingCard");
		this._showingCard1 = cardNum;
		this._cardState = 1;
		break;
	}
}

function startOverCallback(){
	var game = $('#game_table tbody').data('gameobject');
	
	game.recreateTable($('#dim_w').val(), $('#dim_h').val());
}

function cardClickHandler(cardNum){
	$('#game_table tbody').data('gameobject').cardClick(cardNum);
}

$(function(){
	var game = new MemoryGame($('#game_table tbody'));
	
	game.recreateTable(5,4);
	
	$('#game_table tbody').data('gameobject', game);
});

