function testRetrieve() {
  $.get( "https://api.yelp.com/v2/search?term=food&location=San+Francisco", function( data ) {
  $( ".result" ).html( data );
  alert( "Load was performed." );
});
}

