// Mixtape Logic
// Wait for the page to finish loading and establish global variables
  var data = [];
  var jsonPlaylist = []; //declare object
  var youObj =  {};
  var objectsRet = {};
  var iframeUrl;
  $(document).ready(function() {
// ==================================================================
  
// ==== Firebase integration ======================================

  var config = {
    apiKey: "AIzaSyAG5Hd-FWiTUqqHFLM6ag-eksuRF6BHVZ4",
    authDomain: "mxtp-68055.firebaseapp.com",
    databaseURL: "https://mxtp-68055.firebaseio.com",
    projectId: "mxtp-68055",
    storageBucket: "mxtp-68055.appspot.com",
    messagingSenderId: "560302073331"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  // ===== pull from DB most recent playlists ============

    database.ref().limitToLast(4).on('child_added', function(snapshot, prevChildKey) {
      
      var fbMixtapeName = snapshot.child('mixtapeInfo/mixtapeName').val();
      var fbPlaylist = snapshot.child('mixtapeInfo/playlist').val();
      var fbUserTapeSelection = snapshot.child('mixtapeInfo/userTapeSelection').val();
      // console.log(fbMixtapeName, fbPlaylist, fbUserTapeSelection);

      // console.log(fbPlaylist[0].values[0].trackName);
      var song1 = fbPlaylist[0].values[0].trackName + ' by ' + fbPlaylist[0].values[0].artist; 
      var song2 = fbPlaylist[0].values[1].trackName + ' by ' + fbPlaylist[0].values[1].artist; 
      var song3 = fbPlaylist[0].values[2].trackName + ' by ' + fbPlaylist[0].values[2].artist; 
      var song4 = fbPlaylist[0].values[3].trackName + ' by ' + fbPlaylist[0].values[3].artist; 
      var song5 = fbPlaylist[0].values[4].trackName + ' by ' + fbPlaylist[0].values[4].artist; 


      // === create new divs for recent playlists
      var tempDiv = $('<div class = "box recentPlaylist white center-align">');
      var tempCardDiv = $('<div class="card">'); 
      var tempImageDiv = $('<div class="card-image">'); 
        var tapeLabel = $('<div class ="mixtapeLabel">')
          // console.log(fbMixtapeName);
          tapeLabel.append('<h5>' + fbMixtapeName + '</h5>'); 
        var tapeImage = $('<img class="recentTapes">'); 
          tapeImage.attr('src', fbUserTapeSelection); 
          tempImageDiv.append(tapeImage, tapeLabel); 
      var tempPlaylistDiv = $('<div class="card-content">'); 
        var songs = $('<ul>'); 
        songs.append('<li>', song1);
        songs.append('<li>', song2);
        songs.append('<li>', song3);
        songs.append('<li>', song4);
        songs.append('<li>', song5);


        tempPlaylistDiv.html(songs); 

      $(tempCardDiv).append(tempImageDiv,tempPlaylistDiv);
      $(tempDiv).append(tempCardDiv); 
      $(tempDiv).insertAfter('.recentHeader'); 

    });


  // ====================================================

  
// ================================================================

// =====Tape Selector ===============================================

  var tapeImageArray = []; 
  var tape1 = $('<img class="tapeImages" id="tape1" src="assets/images/tape1.jpg" style="width:100%">'); 
  var tape2 = $('<img class="tapeImages" id="tape2" src="assets/images/tape2.png" style="width:100%">'); 
  var tape3 = $('<img class="tapeImages" id="tape3" src="assets/images/tape3.png" style="width:100%">'); 
  var tape4 = $('<img class="tapeImages" id="tape4" src="assets/images/tape4.jpg" style="width:100%">'); 
  var tape5 = $('<img class="tapeImages" id="tape5" src="assets/images/tape5.png" style="width:100%">'); 
  var tape6 = $('<img class="tapeImages" id="tape6" src="assets/images/tape6.jpg" style="width:100%">'); 
  tapeImageArray.push(tape1, tape2, tape3, tape4, tape5, tape6); 
  // console.log(tapeImageArray[0]); 
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

// // Modal =============================================================
    $(document).ready(function(){
      $('.modal-trigger').leanModal();
    });
// ==================================================================
  
// =====  Mixtape Info ===============================================
  // Mixtape info

  $('.mixtapeInfoSave').on('click', function() {
    // event.preventDefault();
    var userTapeSelection = tapeImageArray[tape].attr('src'); 
    var mixtapeName = $('#mixtapeName').val(); 
    var userName = $('#userName').val(); 
    var userEmail = $('#userEmail').val();   
    var description = $('#description').val();   
    // var playlistDiv = $('.playlistWIP'); 
    var mixtapeInfo = {
      // timeStamp: firebase.database.ServerValue.TIMESTAMP,
      mixtapeName: mixtapeName,
      userName: userName, 
      userEmail: userEmail,
      description: description,
      userTapeSelection: userTapeSelection, 
      playlist: jsonPlaylist,
      // playlistDiv: playlistDiv
    }

    // count how many rows in the table 
    var trackCount = $('.playlistWIP').find('tr').length;
    // console.log(trackCount); 

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
        var values = [];
        var tmp_key = []; 
        
        for (var i=0; i< data.length; i++) {
          // console.log(data[i]); 
          var artistInfo = data[i]; 
          var albumInfo = data[i +1]; 
          var trackNameInfo = data[i+2]; 
          var trackLengthInfo = data[i+3]; 
          i = i+3; 
      
          values.push({artist: artistInfo, album: albumInfo, trackName: trackNameInfo, trackLength: trackLengthInfo}); //label + value respectively 
        }
          
        jsonPlaylist.push({values}); //key?
        i = i+3; 
      }
      // genFinPlaylist(jsonPlaylist); 
    }

    // console.log(data); 
    // console.log(jsonPlaylist); 
    // console.log(mixtapeInfo);

    GetCellValues();
    // genFinPlaylist(jsonPlaylist); 

    database.ref().push({
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      mixtapeInfo: mixtapeInfo
    }); 

  })



// ==================================================================

// Final Playlist
  function genFinPlaylist () {
    console.log('in fin playlist');
      // $('.modal-trigger').leanModal();
      $('.finalPlaylist').empty(); //clears whatever was in the playlist before showing the new one

      //  set up variables for the table
      var tBody = $('.finalPlaylist');
      var tbl   = $('<table>');
      var tblH  = $('<tr><th>Album Cover</th><th>Artist</th><th>Album</th><th>Track Name</th><th>Track Length</th><th>Play</th><th>Youtube</th>')
      
      // set up table headers
      tbl.append(tblH);

      // ===== pull from DB to populate FINAL playlist=======
      database.ref().limitToLast(1).on('child_added', function(snapshot, prevChildKey) {
              
        var fbFinalMixtapeName = snapshot.child('mixtapeInfo/mixtapeName').val();
        var fbFinalUserTapeSelection = snapshot.child('mixtapeInfo/userTapeSelection').val();
        var fbFinalPlaylist = snapshot.child('mixtapeInfo/playlist').val();
        var fbFinalUserName = snapshot.child('mixtapeInfo/userName').val();
        var fbFinalTapeInfo = snapshot.child('mixtapeInfo/description').val();
        // console.log(fbMixtapeName, fbPlaylist, fbUserTapeSelection);
        // console.log('fbFinalPlaylist', fbFinalPlaylist[0]);


        var tapeLabel = $('<div class ="mixtapeLabel2">')
        console.log(fbFinalMixtapeName);
        tapeLabel.append('<h5>' + fbFinalMixtapeName + '</h5>'); 
          
        var tapeImage = $('<img class="finalMixtapeImage">'); 
          tapeImage.attr('src', fbFinalUserTapeSelection); 
          $('.mixtapeCover').prepend(tapeImage, tapeLabel); 
          
        $(".finalUserInfo").append ('<h5>' + 'A Mixtape By: ' + '<br>' + fbFinalUserName + '</h5>');
        $(".finalUserInfo").append ('<h5>' + 'About this Tape: ' + '<br>' + fbFinalTapeInfo + '</h5>')


        //for loop to loop through the object returned from firebase
        for (i = 0; i < fbFinalPlaylist[0].values.length; i++) {
          var artist = fbFinalPlaylist[0].values[i].artist; 
            // console.log(artist); 
          var album = fbFinalPlaylist[0].values[i].album; 
          var trackName = fbFinalPlaylist[0].values[i].trackName; 
          // console.log(trackName); 
          var albumArt; 
          var track = fbFinalPlaylist[0].values[i].trackName; 
          var trackLength = fbFinalPlaylist[0].values[i].trackLength; 
            // console.log(artist, album, track, trackLength); 

          

                  var tRow = $('<tr>'); 
                  var imgDisplay = $('<img>');
                  var ytDisp = $('<img>');
                  var playBtnLink = $('<a>');
                  var playBtn = $('<i>');
                  var modalBtn = $('<a>');
          
                  tRow.empty(); // clears the row after each loopthrough and each append
                  ytDisp.empty(); //clears the youtube icon display so it can be re-applied
                  playBtnLink.empty(); // clears the attached music link before
          
                  ytDisp.attr('src','assets/images/youtube.png');
                  ytDisp.attr('href','#modal2');
                  ytDisp.attr('height', '55px');
                  ytDisp.attr('width', '55px');
                  ytDisp.attr('artist', artist);
                  ytDisp.attr('track', track);
                  ytDisp.addClass('waves-effect waves-light modal-trigger youtube');
        
                  imgDisplay.attr('height', '55px'); //album art variable height
                  imgDisplay.attr('width', '55px'); //album art variable width
                  imgDisplay.attr('src', albumArt); //album art variable width
        
        
                  playBtn.addClass('material-icons playBtn');
                  playBtn.attr('artist',artist);
                  playBtn.attr('track',track);
                  playBtn.attr('album',album);
                  playBtn.text('send');
        
                  playBtnLink.addClass('btn-floating btn-medium waves-effect waves-light green playBtn');
                  // playBtnLink.attr('href','https://www.youtube.com/embed/DMilXF7ENps?rel=0');
                  playBtnLink.append(playBtn);
                  playBtnLink.attr('artist',artist);
                  playBtnLink.attr('track',track);
                  playBtnLink.attr('album',album);
        
                  modalBtn.addClass('waves-effect waves-light modal-trigger youtube');
                  modalBtn.attr('artist', artist);
                  modalBtn.attr('track', track);
                  modalBtn.attr('href','#modal2');
                  modalBtn.append(ytDisp);
               
                    // append all the table data elemnts to the rows and then row to the table
                    // var artistTd = $('<td class="artist">').text(jsonPlaylist.playlist.artist);
                    var albumCovTd = $('<td class="AlbumArt">').append(imgDisplay);
                    var artistTd = $('<td class="Artist">').text(artist);
                    var albumtTd = $('<td class="AlbumName">').text(album);
                    var trackTd = $('<td class="trackName">').text(track);
                    var trackLengthTd = $('<td class="tlength">').text(trackLength);
                    var playTd = $('<td class="playMusic">').append(playBtnLink);
                    var ytTd = $('<td class="youtube modal-trigger">').append(modalBtn);
          
                    tRow.addClass('finalTrackSelect hoverable')
                    tRow.append(albumCovTd,artistTd,albumtTd,trackTd,trackLengthTd,playTd,ytTd);
                    tbl.append(tRow);


        } // END for loop
      }); 

      // ====================================================

    // Adds the table to the html  
    tbl.addClass("table highlight");
    tBody.append(tbl);
  };
  genFinPlaylist(jsonPlaylist);
  
// ==================================================================

// On click to open modal and search youtube API
// ==================================================================
  $('.finalPlaylist').on('click', '.youtube', function() {
    var artist = $(this).attr('artist');
    var track = $(this).attr('track');
    
    console.log('artist and track click ' + artist + track);
      // Youtube API ======================================================
      // ==================================================================
      // Need to get the trackname and artist passed from music match. This section searches the youtube API for a mix of the track and artist and returns the top 10 results.
    
      function searchYoutube(trackPass,artistPass) {
        // set variables for search and establish youtube key
        var trackName = trackPass; 
        var artist = artistPass;
        var searchString = trackName + artist;
        var ytKey = 'AIzaSyC2Ztkch3B2cHJIwLRpZpwzCw4IM6UqwlU';
        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+searchString+'&type=video&maxResults=1&key='+ytKey
        console.log('search string ' + trackName + artist);
        console.log('youtube url ' + queryURL);
        // ajax call that returns the title of the first video, a high quality thumbnail, the url for the thumbnail and the video id. this video id is used for an embedded video player for the top result video
        $.ajax({
          url: queryURL,
          method: 'GET'
        }).then(function(response) {
          objectsRet = response.items;  
          baseURL = '<iframe id="ytplayer" type="text/html" width="640" height="360" src="' 
          vidUrl = 'https://www.youtube.com/embed/' + objectsRet[0].id.videoId
          iframeUrl = baseURL + vidUrl + '"frameborder="0">'+'</iframe>';
          console.log('video url ' + vidUrl);
          
          var ytModal = $('.modal-youtube');
          ytModal.empty();
          console.log('iframe ' + iframeUrl);
          ytModal.append(iframeUrl);
          
    
        }); 
      } 
      // ==================================================================
    searchYoutube(track,artist);
   // ==================================================================
  
  }); 

//LastFM

// ====LastFM API Call for Album Art=============
  var apiKey = '7b595b1c67e159509af67e6e4e94cbb4';
  var queryURL = 'http://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=' + apiKey + '&artist=' + artist + '&track=' + trackName + '&format=json'; 

  // http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=7b595b1c67e159509af67e6e4e94cbb4&artist=cher&track=believe&format=json

  $.ajax({
        url: queryURL,
        method: 'GET',
      }).then(function(response) {
        // console.log(response.album.image[1]['#text']); 
        albumArt = response.track.album.image[1]['#text']; 
        console.log(queryURL); 
        console.log(response); 
        console.log(albumArt) 
      });
  });

