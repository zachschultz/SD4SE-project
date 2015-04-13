var app = app || {};

console.log(app);

app.getNearbyAttractions = function(user_latlng) {

  app.nearbyAttractionPlaces = [];

  var $nearbyAttractionsUl = $('ul#nearbyAttractionsUl');

  var service = new google.maps.places.PlacesService(map);

  var request = {
    location: user_latlng,
    radius: '500',
    types: ['amusement_park','campground','church','park','stadium'],
  };

  // Callback functions to show extra info on nearby attractions
  function showPlaceExtraInfo($pExtraInfo) {
    return function() {
      $pExtraInfo.slideDown("slow");
    };
  }
  function hidePlaceExtraInfo($pExtraInfo) {
    return function() {
      $pExtraInfo.slideUp("slow");
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

        $placeLi = $('<li class="attraction" id="place-'+i+'" data-place-id="'+place.id+'"></li>');
        $placeLi.append($nameSpan);

        var plural = (place.types.length == 1) ? 'Category' : 'Categories';

        var types = "";

        for (var type in place.types) {
          if (type == place.types.length - 1) {
            types += place.types[type];
          } else {
            types += place.types[type]+", ";
          }
        }

        $placeExtraInfo = $('<ul class="placeExtraInfo"><li>'+plural+': '+types +'</li><li>Neighborhood: '+place.vicinity+'</li></ul>');
        $placeExtraInfo.hide();

        $placeLi.append($placeExtraInfo);
        $nameSpan.on('mouseover', showPlaceExtraInfo($placeExtraInfo)).on('mouseout', hidePlaceExtraInfo($placeExtraInfo));

        $placeLi.on('click', app.addToMapAndGetDirections(place));
        $nearbyAttractionsUl.append($placeLi);
      }
    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
      alert('Sorry, we couldn\'t find any attractions near you!');
    }
  }
};