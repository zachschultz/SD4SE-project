$(function(){

  app = app || {};

  // Run initialization code to get user's location
  app.initialize();

  $destForm = $('#dest_form');
  $destForm.hide();
  $travelModeContainer = $('div#travel-mode-container');
  $travelModeContainer.hide();

  $destFormSubmit = $('#submit');

  // Hide "Were you looking for..." initially
  var $destResultsDiv = $('#destResultsDiv');
  $destResultsDiv.hide();



  $destFormSubmit.on('click', function(e) {
    e.preventDefault();
    var dest_str = $destForm.find('input[type=text]').val();
    app.getDestSearch(dest_str);
  });




});