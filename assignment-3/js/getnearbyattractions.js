var app = app || {};

app.getNearbyAttractions = function(user_latlng) {

  var $nearbyAttractionsUl = $('ul#nearbyAttractionsUl');

  var service = new google.maps.places.PlacesService(map);

  var request = {
    location: user_latlng,
    radius: '500',
    types: ['store'],
  };

  service.nearbySearch(request, callback);

  function callback(results, status) {
    app.removeLoadingSpan($('span#nearby-attractions'));
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(place);
        // display place in `nearbyAttractionsUl`
        $placeLi = $('<li id="place'+i+'">'+place.name+'</li>');
        $nearbyAttractionsUl.append($placeLi);
      }
    }
  }
};