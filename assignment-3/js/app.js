$(function(){

  app = app || {};

  // Loading text animation!
  loadingText();

  app.removeLoadingSpan = function($parent) {
    $parent.find('span#loading').remove();
  };

  // Run initialization code to get user's location
  //  Then, with user's info, get nearby attractions
  app.initialize(app.getNearbyAttractions);

  // Cache destination form elements, hide it initially
  $destForm = $('#dest_form');
  $destFormSubmit = $('#submit');
  $destForm.hide();
  // Cache travelModeContainer element, hit it initially
  $travelModeContainer = $('div#travel-mode-container');
  $travelModeContainer.hide();
  // Cache destResultsDiv ("Were you looking for...") and hide it initially
  var $destResultsDiv = $('#destResultsDiv');
  $destResultsDiv.hide();

  // Start destination search function on destForm submission
  $destFormSubmit.on('click', function(e) {
    if ($('div.partyTest').children().length > 0) {
      console.log('party test yall!');
      $('div.partyTest').children().remove();
    }
    e.preventDefault();
    var dest_str = $destForm.find('input[type=text]').val();
    app.getDestSearch(dest_str);
  });


  function loadingText() {
    var count = 0;
    setInterval(function(){
      count++;
      $('span#loading').text("loading." + new Array(count % 4).join('.'));
    }, 500);
  }



});