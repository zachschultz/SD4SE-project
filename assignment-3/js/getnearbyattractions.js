var app = app || {};

console.log(app);

app.getNearbyAttractions = function(user_latlng) {

  app.nearbyAttractionPlaces = [];

  var $nearbyAttractionsUl = $('ul#nearbyAttractionsUl');

  var service = new google.maps.places.PlacesService(map);

  var request = {
    location: user_latlng,
    radius: '2000',
    types: ['amusement_park','campground','church','park','stadium'],
  };

  // Callback functions to show extra info on nearby attractions
  function showPlaceExtraInfo($panelContainer, $panel) {
    return function() {
      $panel.show();
      $panelContainer.show('slide', {direction:'left'},300);
    };
  }
  function hidePlaceExtraInfo($panelContainer, $panel) {
    return function() {
      $panel.hide();
      $panelContainer.hide();
    };
  }

  service.nearbySearch(request, callback);

  function callback(results, status) {
    app.removeLoadingSpan($('span#nearby-attractions'));

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        app.nearbyAttractionPlaces.push(place);

        // display place in `nearbyAttractionsUl`
        $nameSpan = $('<span class="attraction-name">'+place.name+'</span>');

        // `$placeLi` will store the clickable `<li>` with the attraction name
        $placeLi = $('<li class="attraction" id="place-'+i+'" data-place-id="'+place.id+'"></li>');
        $placeLi.append($nameSpan);

        var plural = (place.types.length == 1) ? 'Category' : 'Categories';

        // `types` is a string containing the tags associated with the attraction
        var types = "";
        for (var type in place.types) {
          if (type == place.types.length - 1) {
            types += place.types[type];
          } else {
            types += place.types[type]+", ";
          }
        }

        // Cache where we will insert the `$moreInfoPanel`
        $putMoreInfoPanelHere = $('div#putMoreInfoPanelHere');
        $putMoreInfoPanelHere.hide();

        // Build `$moreInfoPanel` and its components
        $moreInfoPanel = $('<div id="moreInfoPanel" class="panel panel-default"></div>');
        $moreInfoPanelHeading = $('<div class="panel-heading"><h3 class="panel-title">More Info about '+place.name+'</h3></div>');
        $moreInfoPanelBody = $('<div id="moreInfoPanelBody" class="panel-body"></div>');

        $moreInfoPanel.append($moreInfoPanelHeading);
        $moreInfoPanel.append($moreInfoPanelBody);
        $moreInfoPanel.hide();

        $placeExtraInfo = $('<ul class="placeExtraInfo"><li>'+plural+': '+types +'</li><li>Neighborhood: '+place.vicinity+'</li></ul>');
        $moreInfoPanelBody.append($placeExtraInfo);

        $putMoreInfoPanelHere.append($moreInfoPanel);

        $nameSpan.on('mouseover', showPlaceExtraInfo($putMoreInfoPanelHere, $moreInfoPanel)).on('mouseout', hidePlaceExtraInfo($putMoreInfoPanelHere, $moreInfoPanel));

        $placeLi.on('click', app.addToMapAndGetDirections(place));
        $nearbyAttractionsUl.append($placeLi);
      }

    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      alert('Sorry, we couldn\'t find any attractions near you!');
    }
  }
};