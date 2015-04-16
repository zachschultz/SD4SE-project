var app = app || {};

app.newLocationSearch = function(place) {

  if ($('ul#resultsUl').children().length > 0) {
    $('ul#resultsUl').children().remove();
    // do something
  }

  console.log('IN NEWLOCATINOSEARCH');
  console.log(place);
  var service = new google.maps.places.PlacesService(map);

  var lat = place.geometry.location.k;
  var lng = place.geometry.location.D;
  var latlng = new google.maps.LatLng(lat, lng);

  var request = {
    location: latlng,
    radius: '50000',
    types: ['amusement_park', 'campground', 'church', 'park', 'stadium'],
  };

  var placeName = '';
  if (place.name === undefined)
    placeName = place.formatted_address;
  else
    placeName = place.name;

  service.nearbySearch(request, tcallback);

  function tcallback(results, status) {
    $resultsDiv = $('div.partyTest');
    $newPlaceResults = $('<div></div>');
    $newPlaceResultsHeading = $('<h2>' + placeName + '</h2>');
    $resultsDiv.append($newPlaceResultsHeading);

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // display place in `nearbyAttractionsUl`
        $nameSpan = $('<span class="attraction-name">' + place.name + '</span>');
        $newPlaceResults.append($nameSpan);
      }
    }
    console.log($newPlaceResults);
    $resultsDiv.append($newPlaceResults);
  }
};