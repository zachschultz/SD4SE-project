$(function(){

  app = app || {};

  gAPIKey = 'AIzaSyAMl9VXe8AasNNM32-wcPs0ZXkgWJFxcek';
  nearbyReq = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+gAPIKey+'&';

  // Run initialization code to get user's location
  app.initialize();

  $destForm = $('#dest_form');
  $destFormSubmit = $('#submit');

  $destFormSubmit.on('click', function(e) {
    e.preventDefault();
    var dest_str = $destForm.find('input[type=text]').val();
    app.getDestSearch(dest_str);
  });


});