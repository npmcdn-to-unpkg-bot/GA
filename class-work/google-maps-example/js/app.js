$(document).ready(function() {

   var map;

   function initMap () {
    map = new Google.maps.Map(domRef, mapOptions)

   }
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7127, lng: -74.0059},
          zoom: 12
        });

      var marker = new google.maps.Marker({
        position: {lat: 40.7127, lng: -74.0059},
        map: map,
        title: 'New York, NY'
  });

      }

initMap();

})


