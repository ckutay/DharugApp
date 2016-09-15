var statMobi=function(){
	return{
		paramData:'',
		
		param : function(k,v){
			if(k=='' || k==null){ return false; }
			if(v=='' || v==null){ return false; }
			
			k=encodeURIComponent(k);
			v=encodeURIComponent(v);
					
			if(this.paramData.length>0){
				this.paramData+='&'+k+'='+v;
			}else{
				this.paramData=k+'='+v;
			}
			
		},
				
		record : function(params){
		
			try{
				AppMobi.device.appmobiversion;
			}catch(e){
				return false;
			}
									
			try{
				if(params.appevent=='undefined' || params.appevent=='' || params.appevent==null){
					return this.error('App Event parameter is blank.');
				}
				if(params.query!='undefined' && params.query!='' && params.query!=null){
					this.paramData=params.query;
				}
				if(params.method=='undefined' || params.method=='' || params.method==null){
					params.method='GET';
				}				
				if(params.status=='undefined' || params.status=='' || params.status==null){
					params.status=200;
				}
				if(params.referrer=='undefined' || params.referrer=='' || params.referrer==null){
					params.referrer='';
				}
						
				AppMobi.analytics.logPageEvent("/application/" + params.appevent + ".event", this.paramData, params.status, params.method, 0, params.referrer);
					
			}catch(e) {
				//console.log(e);
			}
		},
		error:function(msg){
			alert(msg);
			return false;
		}
	}
}();