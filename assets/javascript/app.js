// Mixtape Logic
// Wait for the page to finish loading
var data = [];
var jsonPlaylist = []; //declare object

// ==================================================================
$(document).ready(function() {
  
// Begin Firebase integration ======================================

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

// Youtube API ======================================================
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

// =====Tape Selector ===============================================
  var tapeImageArray = []; 
  var tape1 = $('<img class="tapeImages" id="tape1" src="assets/images/tape1.jpg" style="width:100%">'); 
  var tape2 = $('<img class="tapeImages" id="tape2" src="assets/images/tape2.png" style="width:100%">'); 
  var tape3 = $('<img class="tapeImages" id="tape3" src="assets/images/tape3.png" style="width:100%">'); 
  var tape4 = $('<img class="tapeImages" id="tape4" src="assets/images/tape4.jpg" style="width:100%">'); 
  var tape5 = $('<img class="tapeImages" id="tape5" src="assets/images/tape5.png" style="width:100%">'); 
  var tape6 = $('<img class="tapeImages" id="tape6" src="assets/images/tape6.jpg" style="width:100%">'); 
  tapeImageArray.push(tape1, tape2, tape3, tape4, tape5, tape6); 
  console.log(tapeImageArray[0]); 
  var tape = 0
  $('.images').html(tapeImageArray[tape]); 

  $('.tapeBtns').on('click', function() {
    var btn = $(this).attr('id'); 
    // console.log(btn);
    if (btn === "arrowBtnL") {
      tape = tape - 1; 
      if (tape < 0) {
        tape = (tapeImageArray.length - 1); 
      }
    } else if (btn === "arrowBtnR") {
      tape = tape + 1; 
      if (tape > (tapeImageArray.length - 1)) {
        tape = 0
      }
    }
    $('.images').html(tapeImageArray[tape]); 
  }); //END 
// ==================================================================

// Modal =============================================================
  $(document).ready(function(){
    $('.modal-trigger').leanModal();
  });
// ==================================================================
  
// ===== Mixtape Info ===============================================
  // Mixtape info

  $('.mixtapeInfoSave').on('click', function() {
    var userTapeSelection = tapeImageArray[tape].attr('src'); 
    var mixtapeName = $('#mixtapeName').val(); 
    var userName = $('#userName').val(); 
    var userEmail = $('#userEmail').val();   
    var description = $('#description').val();   
    var playlistDiv = $('.playlistWIP'); 
    var mixtapeInfo = {
      mixtapeName: mixtapeName,
      userName: userName, 
      userEmail: userEmail,
      description: description,
      userTapeSelection: userTapeSelection, 
      playlist: jsonPlaylist,
      playlistDiv: playlistDiv
    }

    // count how many rows in the table 
    var trackCount = $('.playlistWIP').find('tr').length;
    console.log(trackCount); 

    var userPlaylist = {}; 
    var playlistTable = $('#playlistComplete'); 

    var table = document.getElementById("playlistComplete");

    function GetCellValues() {
      for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
          data.push(table.rows[r].cells[c].innerHTML);
        }
      }
  
      for (var i=0; i< data.length; i++) {
        var tmp_values = [];
        var tmp_key = []; 
        
        for (var i=0; i< data.length; i++) {
          // console.log(data[i]); 
          var artistInfo = data[i]; 
          var albumInfo = data[i +1]; 
          var trackNameInfo = data[i+2]; 
          var trackLengthInfo = data[i+3]; 
          i = i+3; 
      
          tmp_values.push({artist: artistInfo, album: albumInfo, trackName: trackNameInfo, trackLength: trackLengthInfo}); //label + value respectively 
        }
          
        jsonPlaylist.push({playlist: tmp_values}); //key
        i = i+3; 
      }
    }


    console.log(data); 
    console.log(jsonPlaylist); 
    console.log(mixtapeInfo);

    GetCellValues(); 
  })

// ==================================================================

// Final Playlist
  function genFinPlaylist () {
    $(document).ready(function(){
      $('.modal-trigger').leanModal();
      $('.finalPlaylist').empty(); //clears whatever was in the playlist before
    
      var tBody = $('.finalPlaylist');
      var tbl = $('<table>');
      var tblH = $('<tr><th>Album Cover</th><th>Artist</th><th>Album</th><th>Track Name</th><th>Track Length</th><th>Play</th><th>Youtube</th>')
      tbl.append(tblH);

      //for loop to loop through the object returned from firebase
      for (i = 0; i < 10; i++) {
        var tRow = $('<tr>'); 
        tRow.empty(); // clears the row after each loopthrough and each append
        tracks[i] = res.message.body.track_list[i].track.track_name
        artists[i] = res.message.body.track_list[i].track.artist_name
        trackLength[i] = Math.floor(parseInt(res.message.body.track_list[i].track.track_length)/60) + ':'+ parseInt(res.message.body.track_list[i].track.track_length) % 60;
        albumId[i] = res.message.body.track_list[i].track.album_id
        albumName[i] = res.message.body.track_list[i].track.album_name
          
          var artistTd = $('<td class="artist">').text(artists[i]);
          var trackTd = $('<td class="track">').text(tracks[i]);
          var albumTd = $('<td class="album">').text(albumName[i]);
          var trackLengthTd = $('<td class="length">').text(trackLength[i]);
          
          tRow.attr('album', albumId[i]);
          tRow.attr('albumName', albumName[i]);
          tRow.attr('track', tracks[i]);
          tRow.attr('artist', artists[i]);
          tRow.attr('length', trackLength[i]);
          tRow.addClass('trackSelect hoverable')
          tRow.append(artistTd, albumTd, trackTd, trackLengthTd);
          tbl.append(tRow);
      }

    // Adds the table to the html  
    tbl.addClass("table highlight");
    tBody.append(tbl);


    });
  }; // closes the final playlist generation
// ==================================================================
  

}); //END document.ready()

