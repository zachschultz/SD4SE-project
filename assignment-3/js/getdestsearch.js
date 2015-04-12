var app = app || {};

app.getDestSearch = function(dest_str) {

  service = google.maps.places.PlacesService(map);

  geocoder = new google.maps.Geocoder();

  // Callback function for each result list item
  function resultsCallback(i) {
    return function() {
      if (markers.length == 2) {
        var userMarker = markers[0];
        // remove second marker
        for (var i = 0; i < markers.length; i++) {
          console.log('setting '+markers[i].title+' map to null');
          markers[i].setMap(null);
          markers[i] = null;
        }
        markers = []
        markers[0] = userMarker;
        markers[0].setMap(map);


        // remove directions
        console.log(typeof directionsDisplay);
        // If we have directions already, remove it from the map
        // also, remove the existing directions panel div
        if (typeof directionsDisplay !== 'undefined') {
          console.log("we have directions already");
          directionsDisplay.setMap(null);
          directionsDisplay = null;
          $('#directions-panel').empty();
        }

      }
      app.loadDestOnMap($(this));
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
          var $res = $('<li><div class="panel panel-default"><div class="panel-heading"><h3 id="result" data-id="'+i+'" data-lat="'+lat+'" data-long="'+long+'" class="panel-title">'+addr+'</h3></div></div></li>');

          $ul.append($res);
          $res.on('click', resultsCallback(i));

          // Lighten up result panel on user mouseover
          $res.find('div.panel-heading').on('mouseover', function() {
            $(this).addClass('lightenPanel');
          }).on('mouseout', function() {
            $(this).removeClass('lightenPanel');
          });
        }
      } else {
        console.log("Geocoder failed due to: " + status);
      }
    });
};