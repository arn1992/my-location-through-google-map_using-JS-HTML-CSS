var ourCoords={
latitude:23.734477599999998 ,
longitude:90.4343995
};

window.onload=getMyLocation;
function getMyLocation(){
if (navigator.geolocation)
{

       var options={enableHighAccuracy:true};
         
navigator.geolocation.getCurrentPosition(displayLocation/*,options/*,displayError*/);
}
else{
alert("oops, no geolocation support");
}
}


function displayLocation(position){
var latitude= position.coords.latitude;
var longitude=position.coords.longitude;
var div =document.getElementById("location");
div.innerHTML="you are at Latitude: " + latitude + " , Longitude: "+longitude;

var km=computeDistanc(position.coords,ourCoords);
var distance=document.getElementById("distance");
distance.innerHTML="you are "+km +" km from us";

showMap(position.coords);
}

/*function displayError(error){
var errorTypes={
0: "Unknown error",
1: "Permission denied by user",
2: "Position is not available",
3: "Request timed out"
}; 
var errorMessage=errorTypes[error.code];
if (error.code=0|| error.code=2)
{
errorMessage=errorMessage+" "+error.message;
}
var div=document.getElementById("location");
div.innerHTML=errorMessage;
}*/
function computeDistanc(startCoords,destCoords){
var startLatRads=degreesToRadians(startCoords.latitude);
var startLongRads=degreesToRadians(startCoords.longitude);
var destLatRads= degreesToRadians(destCoords.latitude);
var destLongRads=degreesToRadians(destCoords.longitude);

var Radius=6371;//radius of the earth in km
var distance=Math.acos(Math.sin(startLatRads)*Math.sin(destLatRads)+
             Math.cos(startLatRads)*Math.cos(destLatRads)*Math.cos(startLongRads-destLongRads ))*Radius;
return distance;
}

function degreesToRadians(degrees)
{
var radians=(degrees*Math.PI)/180;
return radians;
}	

var googleLatAndLong= new google.maps.LatLng(latitude,longitude);		 

var mapOptions={
zoom:10,
center:googleLatAndLong,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map;

function showMap(coords){
var googleLatAndLong= new google.maps.LatLng(coords.latitude,coords.longitude);

var mapOptions={
zoom: 10,
center: googleLatAndLong,
mapTypeId:google.maps.MapTypeId.ROADMAP
};

var mapDiv=document.getElementById("map");
map=new google.maps.Map(mapDiv,mapOptions);


var title="Your Location ";
var content="you are here: "+coords.latitude+ " ,"+coords.longitude;

addMarker(map,googleLatAndLong,title,content);
}

function addMarker(map, latlong,title,content){
var markerOptions={
position: latlong,
map:map,
title:title,
clickable:true
};

var marker=new google.maps.Marker(markerOptions);

var infoWindowOptions={
content:content,
position:latlong
};
var infoWindow=new google.maps.InfoWindow(infoWindowOptions);
google.maps.event.addListener(marker,"click",function(){
infoWindow.open(map);
});

}

