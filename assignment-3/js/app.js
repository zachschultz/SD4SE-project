$(function(){

  app = app || {};

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