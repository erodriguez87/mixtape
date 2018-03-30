// Mixtape Logic
// Wait for the page to finish loading

// ==================================================================
$(document).ready(function() {
  
  // Begin Firebase integration
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
  // Need to get the trackname and artist passed from music match. This section searches the youtube API for a mix of the track and artist and returns the top 10 results.

  // set variables for search and establish youtube key
  var trackName = 'dare you to move'; 
  var artist = 'switchfoot';
  var searchString = trackName + " " + artist;
  var ytKey = 'AIzaSyC2Ztkch3B2cHJIwLRpZpwzCw4IM6UqwlU';
  var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+searchString+'&type=video&maxResults=10&key='+ytKey

  // ajax call that returns the title of the first video, a high quality thumbnail, the url for the thumbnail and the video id. this video id is used for an embedded video player for the top result video
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(queryURL);
    var objectsRet = response.items;
    console.log(objectsRet);
    
    // object that holds all the video elements returned from the api call
    var youObj = {
      title : objectsRet[0].snippet.title, //video title
      thumbHigh : objectsRet[0].snippet.thumbnails.high.url, //video thumbnail
      embedId: objectsRet[0].id.videoId, //id of video for search iframe
      iframeUrl : "<iframe id='ytplayer' type='text/html' width='640' height='360' src='https://www.youtube.com/embed/'" + objectsRet[0].id.videoId + "frameborder='0'></iframe>",
      vidUrl: 'https://www.youtube.com/embed/' + objectsRet[0].id.videoId // iframe link
      // use ?autoplay=1& for autoplay
    };
    // console.log(youObj.iframeUrl);
    // console.log(youObj.vidUrl);
  });

// ==================================================================

// === Mixtape Info and Tape Selector ===============================
  // function saveMixtapeInfo () {

  // Tape Selector
  // var tapeImageArray = []; 
  // var tape1 = $('<img class="tapeImages" id="tape1" src="assets/images/tape1.jpg" style="width:100%">'); 
  // var tape2 = $('<img class="tapeImages" id="tape2" src="assets/images/tape2.png" style="width:100%">'); 
  // var tape3 = $('<img class="tapeImages" id="tape3" src="assets/images/tape3.png" style="width:100%">'); 
  // var tape4 = $('<img class="tapeImages" id="tape4" src="assets/images/tape4.jpg" style="width:100%">'); 
  // var tape5 = $('<img class="tapeImages" id="tape5" src="assets/images/tape5.png" style="width:100%">'); 
  // var tape6 = $('<img class="tapeImages" id="tape6" src="assets/images/tape6.jpg" style="width:100%">'); 
  // tapeImageArray.push(tape1, tape2, tape3, tape4, tape5, tape6); 
  // console.log(tapeImageArray[0]); 
  // var tape = 0
  // $('.tapeSelection').append(tapeImageArray[tape]); 

  // $('.arrowBtnL').on('click', function() {
  //   tape = tape -1; 
  //   $('.tapeSelection').append(tapeImageArray[tape]); 
  // }); //END 

  // $('.arrowBtnR').on('click', function() {
  //   tape = tape +1; 
  //   $('.tapeSelection').append(tapeImageArray[tape]); 
  // }); //END 



    $('.mixtapeInfoSave').on('click', function() {
      var userTapeSelection = $('.tapeImages').attr('src'); 
      var mixtapeName = $('#mixtapeName').val().trim(); 
      var userName = $('#userName').val().trim(); 
      var userEmail = $('#userEmail').val().trim(); 
      var mixtapeInfo = {
        mixtapeName: mixtapeName,
        userName: userName, 
        userEmail: userEmail,
        userTapeSelection: userTapeSelection
      }

      console.log (mixtapeInfo); 


    })
    // saveMixtapeInfo(); 

  // }; // END saveMixtapeInfo

// ==================================================================

// Modal
  $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });
// ==================================================================
  
  
});