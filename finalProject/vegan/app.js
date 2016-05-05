
$('.smooth').on('click', function() {
    $.smoothScroll({
        scrollElement: $('body'),
        scrollTarget: '#' + this.id
    });

    return false;
});


$(document).ready(function() {

var map;
var infowindow;
var search_results = [];

$('#address_form').on('submit', function(e){
  e.preventDefault();
  var input_value = $('#input_value').val();

})

function initMap() {
  var location = {lat: 40.7127 , lng: -74.0059};
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
    scrollwheel: false
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  $('#address_form').on('submit', function(e){
    e.preventDefault();
    geocodeAddress(geocoder, map);

  });


  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: location,
    radius: 1000,
    type: ['restaurant'],
    keyword: 'vegetarian'
  }, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      console.log(results[i]);
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;



  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    var placeRating = place.rating;
    var windowStyle = "" + place.name + "<br>" + place.vicinity + "<br>" + placeRating + "";
    infowindow.setContent(windowStyle);
    infowindow.open(map, this);
  });
}
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('input_value').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}




initMap();

})




