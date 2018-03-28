// Mixtape Logic
// Wait for the page to finish loading

// Begin Firebase integration
// ==================================================================
$(document).ready(function() {

  var config = {
    apikey: "AIzaSyDKWABfmD5z9i_HHVeWAbSxukH1yZqeoAE",
    authDomain: "susangt2018.firebaseapp.com",
    databaseURL: "https://susangt2018.firebaseio.com",
    projectId: "susangt2018",
    storageBucket: "susangt2018.appspot.com",
    messagingSenderId: "271189265430"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
// ==================================================================



// Youtube API
// ==================================================================
// Need to get the trackname and artist passed from music match
  var trackName; 
  var artist;
  var searchString = 'dare you to move';
  var ytKey = 'AIzaSyC2Ztkch3B2cHJIwLRpZpwzCw4IM6UqwlU';

  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+searchString+'&type=video&maxResults=10&key='+ytKey

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(queryURL);
    console.log(response);
  });

// ==================================================================

});