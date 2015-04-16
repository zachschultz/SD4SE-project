var app = app || {};

app.loadDestOnMap = function(resultData) {

  // This function clears the map of the markers so we don't
  //  get overlapping location markers and direction markers
  function clearMapOfMarkers() {
    var startMarker = markers[0];
    var endMarker = markers[1];

    for (var i = 0; i < markers.length; i++) {
      console.log('setting ' + markers[i].title + ' map to null');
      markers[i].setMap(null);
      markers[i] = null;
    }

    // Place back markers into markers array
    markers = [];
    markers.push(startMarker);
    markers.push(endMarker);
  }

  // Google Maps API variables
  var directionsService = new google.maps.DirectionsService();

  var dest_title = (resultData.name) ? resultData.name : resultData.formatted_address;
  var dest_lat = resultData.geometry.location.k;
  var dest_lng = resultData.geometry.location.D;

  // Make a LatLng object for Google Maps
  var destLatLng = new google.maps.LatLng(dest_lat, dest_lng);
  // Create a dest. marker, add it to map
  var destMarker = new google.maps.Marker({
    position: destLatLng,
    map: map,
    title: dest_title,
  });

  markers.push(destMarker);
  console.log("adding " + destMarker.title + " to markers: ");
  console.log(markers);

  // Make an infowindow for the destination marker
  var dest_infowindow = new google.maps.InfoWindow({
    content: dest_title
  });

  google.maps.event.addListener(destMarker, 'click', function() {
    dest_infowindow.open(destMarker.get('map'), destMarker);
    map.setCenter(destMarker.getPosition());
  });

  // Show travel mode options and get travel mode selector (initially `DRIVING`)
  $travelModeContainer.show();
  $travelMode = $('select#travel-mode');
  // Add event listener to recalculate route based on travel mode
  $travelMode.on('change', calcRoute);

  // Now that we have a destination with a marker, calculate the route
  calcRoute();

  function calcRoute() {
    if (typeof directionsDisplay !== 'undefined') {
      console.log('we already have directions!');
      directionsDisplay.setMap(null);
      directionsDisplay = undefined;
      $('#directions-panel').empty();
    }
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    var selectedMode = $travelMode[0].value;
    var start = markers[0].position;
    var end = markers[1].position;

    // Clear map of markers, fixes overlap of direction/location markers
    clearMapOfMarkers();

    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[selectedMode],
      // [travelMode]
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log("Directions reponse is: ");
        console.log(response);
        directionsDisplay.setDirections(response);
      } else {
        alert('Sorry, I couldn\'t find any routes for that method of travel.');
      }

    });
  }
};