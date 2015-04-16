var app = app || {};

// Callback function for each result list item
app.addToMapAndGetDirections = function(resultData) {
  return function() {

    if ($('div.partyTest').children().length > 0) {
      console.log('party test yall!');
      $('div.partyTest').empty();
    }

    // Check if we already have a second marker on map, if so, remove it
    if (markers.length == 2) {
      var userMarker = markers[0];
      console.log("already have " + markers.length + " markers");
      // Erase all markers from map
      for (var i = 0; i < markers.length; i++) {
        console.log('setting ' + markers[i].title + ' map to null');
        markers[i].setMap(null);
        markers[i] = null;
      }
      // Reset markers array, push original marker
      markers = [];
      markers.push(userMarker);
      markers[0].setMap(map);
    }

    app.loadDestOnMap(resultData);
    app.newLocationSearch(resultData);
  };
};

// Callback to show more info on list item mouseover/mouseout
app.showMoreInfo = function($this, $extraInfoUl) {
  return function() {
    $this.addClass('lightenPanel');
    $extraInfoUl.show();
  };
};
app.hideMoreInfo = function($this, $extraInfoUl) {
  return function() {
    $this.removeClass('lightenPanel');
    $extraInfoUl.hide();
  };
};

app.getDestSearch = function(dest_str) {

  service = google.maps.places.PlacesService(map);

  geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': dest_str
  }, function(results, status) {
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
        var $res = $('<li><div class="panel panel-default"><div class="panel-heading"><h3 id="result" data-id="' + i + '" data-lat="' + lat + '" data-long="' + long + '" class="panel-title">' + addr + '</h3></div></div></li>');

        $ul.append($res);
        $res.on('click', app.addToMapAndGetDirections(resultData));

        var $divPanelHeading = $res.find('div.panel-heading');

        // Lighten up result panel on user mouseover
        $divPanelHeading.on('mouseover', function() {
          $(this).addClass('lightenPanel');
        }).on('mouseout', function() {
          $(this).removeClass('lightenPanel');
        });
      }
    } else {
      this
      console.log("Geocoder failed due to: " + status);
    }
  });
};