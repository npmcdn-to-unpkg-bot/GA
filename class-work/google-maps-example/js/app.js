$(document).ready(function() {

   var map;

   function initMap () {
    map = new Google.maps.Map(domRef, mapOptions)

   }
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.730610, lng: -73.935242},
          zoom: 12
        });
      }

initMap();

})


