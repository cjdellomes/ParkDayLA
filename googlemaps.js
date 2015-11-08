var map;
var service;
var infowindow;
var markers;

function initialize() {
  var pyrmont = new google.maps.LatLng(34.024212,-118.496475);
  var geocoder = new google.maps.Geocoder();

  markers = [];
  $("#info").hide();


  map = new google.maps.Map(document.getElementById('googleMap'), {
      center : pyrmont,
      zoom : 15
    });

  document.getElementById('park-button').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function callback(results, status) {
  markers = [];
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      var marker = new google.maps.Marker({
        map : map,
        position : results[i].geometry.location,
        title : results[i].name
      });
      markers.push(marker);
    }
  }
  for (var j = 0; j < markers.length; j++){
    attachListener(markers[j], results[j]);
  }
}

function attachListener(marker, result) {
  marker.addListener('click', function() {
    map.setCenter(marker.getPosition());
    $("#parking-info").empty();
    $("#lat").text(result.geometry.location.lat);
    $("#long").text(result.geometry.location.lng);
    $("#info").show();
    $("#parking-info").append("<h4>" + result.name + "</h4>");
    $("#parking-info").append("<p>" + result.formatted_address + "</p>");
  });
}

function mainMarkerAttachListener(marker, result) {
  marker.addListener('click', function() {
    map.setCenter(marker.getPosition());
    $("#parking-info").empty();
    $("#lat").text(result.geometry.location.lat);
    $("#long").text(result.geometry.location.lng);
    $("#info").show();
    $("#parking-info").append("<p>" + result.formatted_address + "</p>");
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address' : address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var pinColor = "66CD00";
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
      var marker = new google.maps.Marker({
        map : resultsMap,
        position : results[0].geometry.location,
        icon : pinImage
      })
      mainMarkerAttachListener(marker, results[0]);
      var request = {
        location : results[0].geometry.location,
        radius : '500',
        query : 'parking'
      }
      var service = new google.maps.places.PlacesService(resultsMap);
      service.textSearch(request, callback);
    } 
    else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

initialize();