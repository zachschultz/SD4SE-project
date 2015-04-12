var app = app || {};

app.initialize = function() {

  map = '';
  markers = [];

  var geocoder;
  var user_addr;
  var latlng;

  google.maps.event.addDomListener(window, 'load');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }


  // Initialization data for Google Map
  function initGoogleMap() {
    console.log("initializing map");
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: latlng,
      zoom: 15
    });
    var marker = new google.maps.Marker({
      position: map.getCenter(),
      map: map,
      title: 'You!'
    });
    markers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      content: 'You!'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(marker.get('map'), marker);
      map.setCenter(marker.getPosition());
    });

  }

  //Get the user's latitude and the longitude
  function successFunction(position) {
    var user_lat = position.coords.latitude;
    var user_lng = position.coords.longitude;
    // initialize our Geocoder object
    geocoder = new google.maps.Geocoder();
    codeLatLng(user_lat, user_lng, displayInfo);
  }

  function errorFunction(){
    alert("Geocoder failed");
  }

  // Display user's location to the browser
  function displayInfo(addr) {
    $userLocSpan = $('#user_loc');
    $userLocSpan.text(addr);
    $destForm.show();
    $destFormSubmit.on('click', function(e) {
      e.preventDefault();
      var dest_str = $destForm.find('input[type=text]').val();
      app.getDestSearch(dest_str);
    });

  }



  function codeLatLng(lat, lng) {

    latlng = new google.maps.LatLng(lat, lng);
    initGoogleMap();
    geocoder.geocode({'latLng': latlng}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        user_addr = results[0].formatted_address;

        if (results[1]) {
          displayInfo(user_addr);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }

    });
  }

  google.maps.event.addDomListener(window, 'load');
};