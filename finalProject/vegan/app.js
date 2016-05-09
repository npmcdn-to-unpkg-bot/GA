// Declare variables
var win = $(window);
var map;
var infowindow;
var geocoder;
var markers = [];
var service;

//creates a new static map. Centers the map on your location input. Scrollwheel false allows you to scroll over the map without changing the zoom/location. PlacesService allows for retreival of information about places from google maps.
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

//Turns address into a request object which turns it into a geometry value (latitude and longitude coordinates). Calls the updateMap function as a callback.
function geocodeAddress() {

  var address = $('#input_value').val();
  var request = {
    address: address
  };

  geocoder.geocode(request, updateMap);

}
//if status is ok then map is centered on geocoder geometry. PlacesService performs the nearby search function taking in the parameters set by request object and the showLocations function is called back.
function updateMap(results, status) {

  if (status === google.maps.GeocoderStatus.OK) {
    map.setCenter(results[0].geometry.location);

    var request = {
        location: results[0].geometry.location,
        radius: 1000,
        type: ['restaurant'],
        keyword: 'vegan' };

    service.nearbySearch(request, showLocations);

  } else {
    alert('Geocode was not successful for the following reason: ' + status);
  }

}
//if status is ok then we iterate through the places array and create marker for each place.
function showLocations(results, status) {

  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}
//create new google maps marker on the map. The marker icon will be the image specified.
function createMarker(place) {

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: 'img/map_icon.png'
  });
//There is an array of markers and places. This is saying push marker into the array of markers to keep track of for resetting markers at later point.
  markers.push(marker);

//add click listener to each marker to update details information.
  google.maps.event.addListener(marker, 'click', function() {
//For every click, iterate through the markers array and reset the icon to original green icon for every marker. This ensures only the last selected icon will be gray.
    for (var i = 0; i < markers.length; i++) {
      markers[i].setIcon('img/map_icon.png');
    }
//Set clicked marker to selected gray icon
    marker.setIcon('img/map_icon_selected.png');
//place.id is a specific location on the map. Not a generic geocode location.
    var request = {
      placeId: place.place_id
    }
//places service takes in request object containing place id and returns detailed information about that place, populateDetailBox is called back after information is retrieved.
    service.getDetails(request, populateDetailBox);

  });
};

//details function shows info about each place clicked on. Pulls in first image, or placeholder image if there is no restaurant image.
function populateDetailBox(place, status) {

  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var imageSrc = "img/restaurant.jpeg";

    if (place.photos !==undefined) {
      imageSrc=place.photos[0].getUrl( { maxWidth: 350 } );
    }

    $('#detailBox .image').attr('src', imageSrc);
//injects the place name/place vicinity into the #detailbox element and generates a rating.
    $('#detailBox .title').html(place.name);
    $('#detailBox .address').html(place.vicinity);
    $('#detailBox .rating').html(generateRating(place.rating));
  }
  else {
    alert('Request Unsuccessful. Status: '+ status);
  }
}
//generate rating function returns "no rating available" if no rating. For loop iterates through ratings. if less than integer increment (up to 5) return whole star. else if it is greater than .5 less than integer increment return half a star. otherwise return empty star.
function generateRating(rating) {
  if (rating===undefined) {
    return 'No Rating Available';
  }
  else {
    var output = '';

    for (var i=1; i < 6; i++) {
      if (rating >= i) {
        output+='<i class="fa fa-star"></i>';
      }
      else if (rating >= i-.5) {
        output+='<i class="fa fa-star-half-o"></i>';
      }
      else {
        output+='<i class="fa fa-star-o"></i>';
      }
    }
    output += ' ('+rating+')';
    return output;
  }
}
//Plugin that opens the about/contact windows.
function initAbout() {
  var options = psModal.getStandardOptions();

  options.header = false;
  options.closeModalBack = true;
  options.width = '55vw';

  options.content = '';
  options.content += '<div class="modal">';
  options.content += '  <div class="title">About</div>';
  options.content += '  <div class="content">Welcome to Basil! We are here to serve as your resource to vegan and vegetarian friendly restaurants wherever you are. The Basil community is full of people who are passionate about the vegan/vegetarian lifestyle as a healthy and environmentally sustainable way of living.</div>';
  options.content += '  <div class="content">Simply enter the address you are at and the map will show you vegan/vegetarian restaurants in your area. Yes, it\'s that simple.</div>';
  options.content += '  <div class="content"><div class="button">Close</div></div>';
  options.content += '</div>';

  var callback = function() {
    document.querySelector('.modal .button').addEventListener('click', function() {
      psModal.close();
    });
  };

  psModal.open(options, callback);
}
function initContact() {
  var options = psModal.getStandardOptions();

  options.header = false;
  options.closeModalBack = true;

  options.content = '';
  options.content += '<div class="modal">';
  options.content += '  <div class="title">Contact</div>';
  options.content += '  <div class="content">Feel free to check us out or drop me a line below:</div>';
  options.content += '  <div class="content"><a href="https://github.com/SusanSavariar"><i class="fa fa-github" aria-hidden="true"></i></a><a href="https://www.linkedin.com/in/susansavariar"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a><a href="https://www.instagram.com/ssavariar/"><i class="fa fa-instagram" aria-hidden="true"></i></a><a href="mailto:sasavariar@gmail.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a></div>';
  options.content += '  <div class="content"><div class="button">Close</div></div>';
  options.content += '</div>';
//click listener to close the modal box.
  var callback = function() {
    document.querySelector('.modal .button').addEventListener('click', function() {
      psModal.close();
    });
  };

  psModal.open(options, callback);
}

$(document).ready(function() {
//initializes map
  initMap();
//add click listener on submit/click
  $('#address_form').on('submit', function(e){
    e.preventDefault();
    geocodeAddress();
  });
//add click function on about and contact buttons in the nav.
  $('#navAbout').click(initAbout);
  $('#navContact').click(initContact);


});//closing tag.