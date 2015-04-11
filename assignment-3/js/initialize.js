var app = app || {};

app.initialize = function() {

  var geocoder;
  var user_addr;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }

  //Get the latitude and the longitude;
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

  function displayInfo(addr) {
    $userLocSpan = $('#user_loc');
    $userLocSpan.text(addr);
  }

  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        console.log(results)

        user_addr = results[0].formatted_address;
        console.log(user_addr);
        if (results[1]) {
        //formatted address
        // alert(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
        // alert(city.short_name + " " + city.long_name)

        displayInfo(user_addr);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }

    });
  }
};