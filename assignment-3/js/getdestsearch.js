var app = app || {};

app.getDestSearch = function(dest_str) {
  var map;
  map = new google.maps.Map(document.getElementById('map-canvas'));
  service = google.maps.places.PlacesService(map);

  geocoder = new google.maps.Geocoder();

  // callback function for each result list item
  function makeCallback(i) {
    return function() {
      console.log(i);
    };
  }

  geocoder.geocode({'address': dest_str}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

        var i;
        var $destResultsDiv = $('#destResultsDiv');
        $destResultsDiv.show(700);
        var $ul = $destResultsDiv.find('ul');

        // clear out ul if it has existing lis
        $ul.empty();

        for (i = 0; i < results.length; i += 1) {
          var resultData = results[i];
          var addr = resultData.formatted_address;
          var lat = resultData.geometry.location.k;
          var long = resultData.geometry.location.D;
          var $res = $('<li id="result" data-id="'+i+'" data-lat="'+lat+'" data-long="'+long+'"><span>'+addr+' - <strong>'+i+'</strong></span>');

          $ul.append($res);
          $res.on('click', makeCallback(i));
        }

        console.log($ul);

        if (results[0]) {

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

        } else {
          console.log("No results found");
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }

    });
};