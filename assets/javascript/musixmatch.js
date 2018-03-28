
var trackName; 
var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';

var queryURL = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + trackName + '&quorum_factor=1&apikey=' + apiKey;


$.ajax({
  url: queryURL,
  method: 'GET'
}).then(function(response) {
  console.log(queryURL);
  console.log(response);
});

function searchResults(){

  for (var = i)
}