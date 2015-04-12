var app = app || {};

app.loadDestOnMap = function($this) {

  directionsDisplay = undefined;
  var directionsService = new google.maps.DirectionsService();

  var $panelTitle = $this.find('h3#result')[0];
  var dest_lat = $panelTitle.dataset.lat;
  var dest_lng = $panelTitle.dataset.long;
  console.log();

  // get lat/long of dest, make a LatLng objject
  var destLatLng = new google.maps.LatLng(dest_lat, dest_lng);
  // make marker, add it to map
  var destMarker = new google.maps.Marker({
    position: destLatLng,
    map: map,
    title:$panelTitle.innerText,
  });


  markers.push(destMarker);
  console.log('adding marker' +destMarker.title+' to markers array: ');
  console.log('[0] is '+markers[0].title);
  console.log('[1] is '+markers[1].title);

  $travelMode = $('select#travel-mode');
  $travelModeContainer.show();
  console.log($travelMode);

  calcRoute();

  var dest_infowindow = new google.maps.InfoWindow({
    content: $panelTitle.innerText,
  });

  google.maps.event.addListener(destMarker, 'click', function() {

    dest_infowindow.open(destMarker.get('map'), destMarker);
    map.setCenter(destMarker.getPosition());
  });

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directions-panel'));

  $travelMode.on('change', calcRoute);

  function calcRoute() {
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
      }
    });
  }
};