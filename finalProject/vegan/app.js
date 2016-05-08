

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
          keyword: 'vegan'
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
  $('#detailBox .rating').html(generateRating(rating));
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

  $('#navAbout').click(initAbout);
  $('#navContact').click(initContact);


});//closing tag.

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

  var callback = function() {
    document.querySelector('.modal .button').addEventListener('click', function() {
      psModal.close();
    });
  };

  psModal.open(options, callback);
}

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
