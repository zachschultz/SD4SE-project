var app = app || {};

app.loadDestOnMap = function($this) {

  // Google Maps API variables
  var directionsService = new google.maps.DirectionsService();

  var $panelTitle = $this.find('h3#result')[0];
  var dest_lat = $panelTitle.dataset.lat;
  var dest_lng = $panelTitle.dataset.long;

  // Make a LatLng object for Google Maps
  var destLatLng = new google.maps.LatLng(dest_lat, dest_lng);
  // Create a dest. marker, add it to map
  var destMarker = new google.maps.Marker({
    position: destLatLng,
    map: map,
    title:$panelTitle.innerText,
  });

  markers.push(destMarker);

  // Make an infowindow for the destination marker
  var dest_infowindow = new google.maps.InfoWindow({
    content: $panelTitle.innerText,
  });
  google.maps.event.addListener(destMarker, 'click', function() {
    dest_infowindow.open(destMarker.get('map'), destMarker);
    map.setCenter(destMarker.getPosition());
  });

  // Make a direction panel to give readable directions
  // directionsDisplay = new google.maps.DirectionsRenderer();
  // directionsDisplay.setMap(map);
  // directionsDisplay.setPanel(document.getElementById('directions-panel'));



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
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode[selectedMode],
      // [travelMode]
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        alert('Sorry, I couldn\'t find any routes for that method of travel.');
      }

    });
  }
};