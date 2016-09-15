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

function loadDataBase() {
    $("#contactsContentDIV").scroller({});  
    $("#contactsContentDIV").alphatable($("#contactsContentDIV").scroller(),{listCssClass:"tableListContainer",prefix:"itm_anchor_"});

    AppMobi.display.useViewport(320, 480);
    

    //to load database
    loadData("bodyparts");
       this.dataWords=getWords();
    //loadData('wordList');
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
                              //console.log(document.getElementsByTagName("body")[0].innerHTML);
                              }
                              else
                              { console.log("remote load: " +  returnedEvent.success) }
                              
                            //  aUX_Load();
                              
                              }
                              }, false);
	
	AppMobi.device.getRemoteDataExt(paramsObj);
   

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


