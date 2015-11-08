var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(34.024212,-118.496475);
  var geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById('googleMap'), {
      center: pyrmont,
      zoom: 15
    });

  document.getElementById('park-button').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

initialize();