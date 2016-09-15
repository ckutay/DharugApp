/*learner.js
*/

var groups;
var dataWords;

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
var startArray = new Array(98);

function loadDataBase() {
  AppMobi.display.useViewport(320, 520);
    $("#contactsContentDIV").scroller({});  
    $("#contactsContentDIV").alphatable($("#contactsContentDIV").scroller(),{listCssClass:"tableListContainer",prefix:"itm_anchor_"});

   
    

    //to load database
    loadData("bodyparts");
 
       this.dataWords=getWords();
  };


function getSoundsUrls(startArray){
    var names=new Array(98);
    for (i=0; i<startArray.length;i++){
        name=startArray[i].replace('_', ');
        this.dataWords.forEach(function(word) {
                              
            if (word.english==nme){
                    names[i]=word.dharug;
                    break;
                               
            }
        
    }
    return names;
    
}

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
                     
                     content += '<div style="background-color:#B49715;" id="itm_anchor_' + currentGroup + '">' + currentGroup + 
                     '</div>';
                     }
                            
                     	if(word.iflink==1)
                     	  content += '<li>' +word.english+': <a href="'+word.link+'">'+ word.dharug + '</a></li>';
                           
                           else
                           content += '<li>' +word.english+': '+word.dharug;
                     	
                     		   console.log(word.linksound);
                     		return;
                     
                     
                     
                   
                           
            }
            
                     });
    
    
    content += "<br/><br/><br/><br/>";
   
    document.getElementById("contactsContentDIV").innerHTML = content;
}



   
 

    function success(results) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(results,"text/xml");
        resultWords=xmlDoc.getElementsByTagName("table");
        var datas=[];
        
        
        for (i=0;i< resultWords.length;i++){
            column=resultWords[i].getElementsByTagName("column");
            
            //console.log(node);
            
            //console.log(data[0]);
            
            
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
            //console.log(column);
            //console.log("Dharug:"+ columns[dharug].childNodes[0].nodeValue);
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
    
}

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
                         // document.getElementsByTagName("body")[0].innerHTML += returnedEvent.response;
                              //console.log(document.getElementsByTagName(//"body")[0].innerHTML);
                              }
                              else
                              { console.log("remote load: " +  returnedEvent.success) }
                              
                            //  aUX_Load();
                              
                              }
                              }, false);
	
	AppMobi.device.getRemoteDataExt(paramsObj);
   

}
function getAllImagesUrls(){
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
                               names=getSoundUrls(startArray);
                               console.log(names);
                               baseArray = new Array(98);
                               baseLen = startArray.length;
                               for(i=0; i<=baseLen; i++){
                               baseArray[i] = baseUrl + startArray[i]+".gif";
                               }
                               return baseArray, names;
}



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
}



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


