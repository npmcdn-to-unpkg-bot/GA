$(document).ready(function() {
var win = $(window);
var map;
var infowindow;
var geocoder;
var map_win_height = win.height();
setMapWinHeight(map_win_height)
initMap();
console.log("//geocoder within the global is:")
console.log(geocoder);

$('#address_form').on('submit', function(e){
  e.preventDefault();
  console.log("//geocoder within on submit is:")
  console.log(geocoder);
  geocodeAddress(geocoder, map);
});

$("#mapScroll").click(function() {
    $('html, body').animate({
        scrollTop: $("#map_wrapper").offset().top
    }, 2000);
});

// $('.smooth').on('click', function() {
//     $.smoothScroll({
//         scrollElement: $('body'),
//         scrollTarget: '#' + this.id
//     });
//     return false;
// });
function setMapWinHeight (setHeight){
  var heightString = setHeight.toString()
  $('#section2').css('height', heightString );
};
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('input_value').value;
  geocoder.geocode({'address': address}, function(results, status) {// geocode makes a http request and returns the values. The values are passed as arguments through a "call back" function.
    console.log("//results are:");
    console.log(results);
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      //////////////////////////////////////////
      //              optional                //
      //////////////////////////////////////////
      // var marker = new google.maps.Marker({
      //   map: resultsMap,
      //   position: results[0].geometry.location
      // });
      console.log("//service before nearbySearch:");
      console.log(service);
service.nearbySearch({
    location: results[0].geometry.location,
    radius: 1000,
    type: ['restaurant'],
    keyword: 'vegetarian'
  }, callback);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    };
  });
};
function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      createMarker(results[i]);
    }
  }
};
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    if (place.rating.length){}else{
    var windowStyle = "" + place.name + "<br>" + place.vicinity + "<br>" + place.rating + "";
    var infowindow = new google.maps.InfoWindow();
    console.log("//infowindow before setContent:");
    console.log(infowindow);
    infowindow.setContent(windowStyle);
    infowindow.open(map, this);
    }
  });
};
function initMap() {
  geocoder = new google.maps.Geocoder;
  var location = {lat: 40.7127 , lng: -74.0059};
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
    scrollwheel: false
  });
  service = new google.maps.places.PlacesService(map);
};

});//closing tag.