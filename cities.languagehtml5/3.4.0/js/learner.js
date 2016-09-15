/*learner.js
 */

var groups;
var dataWords;
var dataGame;
var paramsObj;
var category=1;
var english=2;
var dharug=3;
var exSent=4;
var exTrans=5;
var derived=6;
var related=7;
var image=8;
var sound=9;
var existsSound= 10;
var loadedPath="http://localhost:58888/";
var cardNumbers=74;
var startArray=new Array(cardNumbers);
var text=new Array(cardNumbers);


function loadDataBase() {
    AppMobi.display.useViewport(320, 520);
    $("#contactsContentDIV").scroller({});
    $("#contactsContentDIV").alphatable($("#contactsContentDIV").scroller(),{listCssClass:"tableListContainer",prefix:"itm_anchor_"});
    
    
    
    
    //to load database
    loadData("bodyparts");
    
    this.dataWords=getWords();
    
    
};



function displayWords(categoryName){
    
    // contacts = contacts.slice(0, 10);
    
    document.addEventListener("appMobi.player.sound.error",loadSoundError,false);
    function loadSoundError(err){
        console.log(err.message);
    }
    
    // Sort contacts by last name
    this.dataWords.sort(function(a, b) {
                        a = a.english;
                        b = b.english;
                        
                        if (a > b)
                        return 1;
                        else if (a < b)
                        return -1;
                        else
                        return 0;
                        });
    var currentGroup = null;
    var content      = '';
    
    this.dataWords.forEach(function(word) {
                           // Create a group if needed
                           if (word.category==categoryName){
                           
                           
                           var group = word.english;
                           if (group.length <= 0) return;
                           group = group[0].toUpperCase();
                           
                           if (group !== currentGroup) {
                           currentGroup = group;
                           
                           content += '<div style="background-color:#B47615;" id="itm_anchor_' + currentGroup + '">' + currentGroup +
                           '</div>';
                           }
                           
                           if(word.iflink==1)
                           content += '<li>' +word.english+': <a href="'+word.link+'">'+ word.dharug + '</a></li>';
                           
                           else
                           content += '<li>' +word.english+': '+word.dharug;
                           
                           
                           return;
                           
                           
                           }
                           
                           });
    
    
    content += "<br/><br/><br/><br/>";
    
    document.getElementById("contactsContentDIV").innerHTML = content;
};





function success(results) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(results,"text/xml");
    resultWords=xmlDoc.getElementsByTagName("table");
    var datas=[];
    
    
    for (i=0;i< resultWords.length;i++){
        column=resultWords[i].getElementsByTagName("column");
  
        if (column[sound].childNodes[0]){
            exSound=column[sound].childNodes[0].nodeValue;
        }
        else{
            
            exSound=column[dharug].childNodes[0].nodeValue+'.mp3';
        }
        exSound='sounds/'+exSound;
        if (column[existsSound].childNodes[0]){
            existSound=column[existsSound].childNodes[0].nodeValue;
        }
        else{
            
            existSound=0;
        }
        if (column[image].childNodes[0]){
            exImage=column[image].childNodes[0].nodeValue;
        }
        else{
            
            exImage=column[dharug].childNodes[0].nodeValue+'.jpeg';
        }
        exImage='images/'+exImage;
        if (column[exSent].childNodes[0]){
            exSentence=column[exSent].childNodes[0].nodeValue;
        }
        else{
            
            exSentence='';
        }
        if (column[exTrans].childNodes[0]){
            exTranslation=column[exTrans].childNodes[0].nodeValue;
        }
        else{
            
            exTranslation='';
        }
        if (column[derived].childNodes[0]){
            exDerived=column[derived].childNodes[0].nodeValue;
        }
        else{
            
            exDerived='';
        }
        if (column[related].childNodes[0]){
            exRelated=column[related].childNodes[0].nodeValue;
        }
        else{
            
            exRelated='';
        }
        if(existSound==1)linkEx="javascript:AppMobi.player.stopAudio(); AppMobi.player.startAudio('"+exSound+"');";
        else linkEx="javascript:AppMobi.player.stopAudio();";
       dataWord={
        category:column[category].childNodes[0].nodeValue,
        english:column[english].childNodes[0].nodeValue,
        dharug:column[dharug].childNodes[0].nodeValue,
        exSent:exSentence,
        exTrans:exTranslation,
        derived:exDerived,
        related:exRelated,
        image:exImage,
        linksound: exSound,
        iflink: existSound,
        link:linkEx,
        };
        
        datas.push(dataWord);
        
    }
    this.dataWords= datas;
    return datas;
    
    
    
}

function error(data){
    console.log(data.message);
}

function getWords(){
    
	
    AppMobi.device.getRemoteData(
                                 
                                 requestUrl= AppMobi.webRoot+"Dharug.xml",
                                 requestMethod= "GET",
                                 requestBody="",
                                 successCallback="success",
                                 errorCallback="error");
    
};
function displayGame(){
    baseUrl = "./wordimages/";
      
   
    this.startArray[1]="deep_water";
   
    
    this.startArray[2]="arms";
   
    this.startArray[5]="blowfly";
    
    this.startArray[8]="burn";
  
    this.startArray[10]="cave";
    this.startArray[11]="child";
    this.startArray[12]="climb";
    this.startArray[13]="black_cockatoo";
    this.startArray[14]="white_cockatoo";
   
    this.startArray[16]="dance";
    this.startArray[17]="deep water";
    this.startArray[18]="dig";
    this.startArray[19]= "dingo";
    this.startArray[20]="dive";
    this.startArray[21]="dry";
    this.startArray[22]="eagle";
    this.startArray[23]="ear";
    this.startArray[24]="eat";
    this.startArray[25]="egg";
 
    this.startArray[27]="female_emu";
    this.startArray[28]="eye";
    this.startArray[29]="eyebrow";
    this.startArray[30]="father";

    this.startArray[32]="fingers";
    this.startArray[33]="fish";
      this.startArray[36]="fly";
    this.startArray[37]="food";
    this.startArray[38]="friend";
    this.startArray[39]="frog";
  
    this.startArray[41]="good_morning";
    this.startArray[43]="grass_tree";
    this.startArray[44]="grass";
    this.startArray[45]="grasshopper";
    this.startArray[46]="grub";
    
    this.startArray[48]="hands";
    this.startArray[49]="head";
    this.startArray[50]="heart";

    this.startArray[52]="hut";
    this.startArray[53]="jump";
    this.startArray[54]="eastern_grey_kangaroo";
    this.startArray[55]="male_kangaroo";
    
    this.startArray[57]= "kingfisher";
    this.startArray[58]="knee";
   
    this.startArray[60]="leg";
    this.startArray[61]="lightning";
    this.startArray[62]="rock_lily";

    this.startArray[64]="lips";
    
    this.startArray[65]="lizard";
    this.startArray[66]="man";
    this.startArray[67]="march_fly";
    this.startArray[68]="mother";
    this.startArray[69]="mouth";
    this.startArray[70]="nose";
    this.startArray[51]="male_goanna";
    this.startArray[72]="parrakeet";
    this.startArray[73]="pine_tree";
    this.startArray[0]="rain";
    this.startArray[4]="rainbow_lorikeet";
   
    this.startArray[59]="sea_eagle";
    this.startArray[40]="sea_gull";
    this.startArray[35]="shoulder";
    this.startArray[26]="show";
    this.startArray[31]="sit_and_look";
    this.startArray[34]="skin";

    this.startArray[56]="smell";
    this.startArray[63]="snake";
    this.startArray[6]="hair";
    this.startArray[71]="spear_no_barb";
   
   
  
    this.startArray[47]="throwing_spear";
    this.startArray[42]="toad_fish";
    this.startArray[15]="toe";
    
    this.startArray[9]="tree";
    this.startArray[7]="urinate";
   
    this.startArray[3]="wash";
    this.startArray[74]="wash";

    
    
    return this.startArray;
    
}
function updateArrays(){
    baseArray = this.startArray.slice(0);
    baseLen = this.startArray.length;
    for(i=0; i<=baseLen; i++){
        baseArray[i] = baseUrl + this.startArray[i]+".gif";
    }
    
    var names=this.startArray.slice(0);
    
    var name;
    

    for (i=0; i<baseLen;i++){
        name=new String(names[i]);
        //need to do for each slot
        name=name.replace('_',' ');
        name=name.replace('_',' ');
        name=name.replace('_',' ');
        this.dataWords.forEach
        (
         
         function(word) {
           
           
            var word;
            try{
                wordName=word.english.valueOf();
      
                if  (wordName==name.valueOf()){
                    if (word.iflink){
                        names[i]= word.linksound.valueOf();
                        text[i]=false;
                    }else{
                        names[i]=word.dharug.valueOf();
                        text[i]=true;
                    }
                return;
            }
         }
            catch(err){  names[i]= null; }
         });
        if (names[i]===undefined){
            
            console.log(i);
        }
        
        
    }
   
    this._imageArray=baseArray;
    this._soundArray=names;
   
    
};


function loadData(filename)
{
	//Import HTML data
	paramsObj = new AppMobi.Device.RemoteDataParameters();
	paramsObj.url=AppMobi.webRoot+filename + ".html";
	paramsObj.id="LoadingData";
	paramsObj.method="GET";
	
	document.addEventListener("appMobi.device.remote.data", function(returnedEvent){
                              
                              if (returnedEvent.id=="LoadingData")
                              {
                              
                              if (returnedEvent.success==true)
                              {
                              // console.log(returnedEvent.response);
                              document.getElementById(filename).innerHTML=returnedEvent.response;
                             
                              }
                              else
                              { console.log("remote load: " +  returnedEvent.success) }
                              
                              //  aUX_Load();
                              
                              }
                              }, false);
	
	AppMobi.device.getRemoteDataExt(paramsObj);
    
    
};

function loadAsyncScript(src, callback) {
    
	src = AppMobi.webRoot+src;
	var xhrObj = new XMLHttpRequest();
	xhrObj.onreadystatechange = function() { if (xhrObj.readyState != 4) { return; }
		var myStr=xhrObj.responseText;
		//console.log(myStr);
     	try{ eval(myStr); }
		
		catch(loadError){ alert("Error loading script "+src+"  "+loadError); }
		if (callback) callback();
		//console.log("exit");
	};
	xhrObj.open('GET', src, true);
	xhrObj.send('');
};



//Global Variables
var deviceUUID ="";
var didcheckuser=null;
var rssObject;

var admob_vars = {
pubid: 'a1499f014240b72', // publisher id
bgcolor: 'FFFFFF', // background color (hex)
text: '000000', // font-color (hex)
ama: false, // set to true and retain comma for the AdMob Adaptive Ad Unit, a special ad type designed for PC sites accessed from the iPhone.  More info: http://developer.admob.com/wiki/IPhone#Web_Integration
test: true // test mode, set to false to receive live ads
};



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

function MemoryGame(tbodyElement, clicksSpan, timerSpan){
	this._tbodyElement = tbodyElement;
	
	this._cardState = 0; // 1 for 1 card up, 2 for 2 cards up
	
	this._cardsTable = null;
	
	this._showingCard1 = null;
	this._showingCard2 = null;
    
	this._numClicks = 0;
    //set up basic variables
    
    baseUrls=displayGame();
    
	this._cardsUrls = baseUrls;//getAllImagesUrls();
    this._imageArray=new Array();
    this._soundArray= new Array();
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
	var size = (this._w * this._h)/2;
   this._start = Math.floor( Math.random() * ( cardNumbers-size));
 

	for(var i=0; i<height; i++){
		var line = "<tr>";
		
		for(var j=0; j<width; j++){
			line += "<td><div id='card_"+
            (i*this._w+j)
            +"' onclick='cardClickHandler(\"" + (i*this._w+j) + "\");'>"
         
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

MemoryGame.fn.genCardsTable = function(){
	var linearTable = [];
    var size = (this._w * this._h)/2;
 
	for(var i=0; i<size; i++){
		linearTable[i*2] = linearTable[i*2+1] = i;
	}
	
	shuffleArrayInPlace(linearTable);
	
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
	cardImageNum = this._start+this._cardsTable[cardNum];
	if($cardDiv.hasClass('showingCard') == true){
		// card already showing; nothing to do
         AppMobi.player.startAudio(this._soundArray[cardImageNum],false);
		return;
	}
    
	if(this._numClicks == 0){
		this.startTimer()
	}

   
	switch(this._cardState){
        case 0:
            // card not showing
            $cardDiv.addClass('showingCard');
          
           // url = this._cardsUrls[cardImageNum]
           
            url=this._imageArray[cardImageNum];
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
            //url = this._cardsUrls[cardImageNum]
          
            if (text[cardImageNum]!=false){
                $cardDiv.text(this._text[cardImageNum].valueOf());
              
            } else{
                AppMobi.player.startAudio(this._soundArray[cardImageNum],false);
                 url='./wordimages/tongue.gif';
                $cardDiv.css('background-image', 'url(' + url + ')')
                
            }
                      
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
            card2.text("");
            this._showingCard1 = this._showingCard2 = null;
            
            this._cardState = 0;
            break;
	}
    
	this._clicksSpan.html(this._numClicks);
    
}

// taken at http://www.peterbe.com/plog/isint-function
function isInt(x) {
	var y=parseInt(x);
	if (isNaN(y)) return false;
	return x==y && x.toString()==y.toString();
} 

function startOverCallback(){
   
	w = 4;
	h = 4;
    
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
     updateArrays();
    game._imageArray=this._imageArray;
    game._soundArray=this._soundArray;
     
}


function cardClickHandler(cardNum){
	$('#game_table tbody').data('gameobject').cardClick(cardNum);
}

$(function(){
  
 var game = new MemoryGame($('#game_table tbody'), $('#num_clicks'), $('#timer'));
  
  game.recreateTable(4,4);
  
  $('#game_table tbody').data('gameobject', game);
  });


