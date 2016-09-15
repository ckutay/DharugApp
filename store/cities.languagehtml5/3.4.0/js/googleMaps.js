var _map = null;
var _llbounds = null;

function drawMap()
{
	console.log("in drawMap");
	var latlng = new google.maps.LatLng(currentLatitude,currentLongitude);
	var mapOptions = {
		zoom: 12,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoomControl: true,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.SMALL,
		  position: google.maps.ControlPosition.LEFT_TOP
		},
	};

	_map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
}

//40.7655,-73.97204 = NYC
var currentLatitude = "40.713768";
var currentLongitude = "-73.016696";
var options = {
				 timeout: 10000,
				 maximumAge: 11000,
				 enableHighAccuracy: true
			  };

var suc = function(p){
	console.log("geolocation success");

	if( _map == null ) {
		currentLatitude = p.coords.latitude;
		currentLongitude = p.coords.longitude;
		drawMap();
	}

	
	var myLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
	var beachMarker = new google.maps.Marker({
	  position: myLatLng,
	  map: _map
	});

	if( _llbounds == null )
		_llbounds = new google.maps.LatLngBounds(new google.maps.LatLng(p.coords.latitude, p.coords.longitude));
	else
		_llbounds.extend(new google.maps.LatLng(p.coords.latitude, p.coords.longitude));
	_map.fitBounds(_llbounds);
	
	
	
};

var fail = function(){
	alert("Geolocation failed. \nPlease enable GPS in Settings.");
};

function mapCurrentLocation()
{
	console.log("in mapCurrentLocation");
	AppMobi.geolocation.getCurrentPosition(suc,fail);
}



