var updateMobi=function(){
	return{
		init:function(check){
			try{
				AppMobi.device.appmobiversion;
			}catch(e){
				return false;
			}
			
			if(check=='undefined' || check=='' || check==null){
				check=false;
			}
			
			document.addEventListener("appMobi.device.update.available",updateMobi.updateAvailable,false); 
					
			if(check){
				if (AppMobi.updateAvailable==true){
					if(AppMobi.updateMessage!='undefined' && AppMobi.updateMessage!='' && AppMobi.updateMessage!=null){
						if (confirm(AppMobi.updateMessage)==true) {
						  AppMobi.device.installUpdate();
						}
					}else{
						AppMobi.device.installUpdate();
					}
				}
			}
		},
			
		updateAvailable:function(evt){
			if (evt.type == "appMobi.device.update.available") {
				if(evt.updateMessage!='undefined' && evt.updateMessage!='' && evt.updateMessage!=null){
					if (confirm(evt.updateMessage)==true) {
						AppMobi.device.installUpdate();
					}
				}else{
					AppMobi.device.installUpdate();
				}
			}
		}
	
	}
}();