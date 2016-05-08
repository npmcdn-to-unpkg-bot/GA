

var win = $(window);
var map;
var infowindow;
var geocoder;
var markers = [];

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

function geocodeAddress(geocoder, resultsMap) {

  var address = document.getElementById('input_value').value;

  geocoder.geocode(
    {'address': address},
    function(results, status) {

    //console.log("//results are:");
    //console.log(results);

    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      //console.log("//service before nearbySearch:");
      //console.log(service);
      service.nearbySearch({
          location: results[0].geometry.location,
          radius: 1000,
          type: ['restaurant'],
          keyword: 'vegetarian'
        }, showLocations);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    };
  });
};

function showLocations(results, status) {

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      //console.log(results[i]);
      createMarker(results[i]);
    }
  }

};

function createMarker(place) {

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'img/map_icon.png'
  });

  markers.push(marker);

  google.maps.event.addListener(marker, 'click', function() {

    for (var i = 0; i < markers.length; i++) {
      markers[i].setIcon('img/map_icon.png');
    }

    marker.setIcon('img/map_icon_selected.png');
    populateDetailBox(null, place.name, place.vicinity, place.rating);
  });
};





function populateDetailBox(image, title, address, rating) {
  $('#detailBox .title').html(title);
  $('#detailBox .address').html(address);
  $('#detailBox .rating').html(rating);
}


$(document).ready(function() {
  //var map_win_height = win.height();

  //setMapWinHeight(map_win_height)
  initMap();

  //console.log("//geocoder within the global is:")
  //console.log(geocoder);

  $('#address_form').on('submit', function(e){
    e.preventDefault();
    //console.log("//geocoder within on submit is:")
    //console.log(geocoder);
    geocodeAddress(geocoder, map);
  });

});//closing tag.

