// Mixtape Logic
// Wait for the page to finish loading and establish global variables
  var data = [];
  var jsonPlaylist = []; //declare object
  var youObj =  {};
  var objectsRet = {};
  var iframeUrl;

  $(document).ready(function() {
// ==================================================================

// ====Firebase integration==========================================
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

    // ===== pull from DB most recent playlists ======

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
                  
          songs.append(song1 + '<br>' + song2+ '<br>' + song3+ '<br>' + song4+ '<br>' + song5);

          tempPlaylistDiv.html(songs); 

        $(tempCardDiv).append(tempImageDiv,tempPlaylistDiv);
        $(tempDiv).append(tempCardDiv); 
        $(tempDiv).insertAfter('.recentHeader'); 

      }); // END Firebase pull
    // ===============================================
// ==================================================================

// =====Tape Selector================================================
  var tapeImageArray = []; 
  var tape1 = $('<img class="tapeImages" id="tape1" src="assets/images/tape1.jpg" style="width:100%">'); 
  var tape2 = $('<img class="tapeImages" id="tape2" src="assets/images/tape2.png" style="width:100%">'); 
  var tape3 = $('<img class="tapeImages" id="tape3" src="assets/images/tape3.png" style="width:100%">'); 
  var tape4 = $('<img class="tapeImages" id="tape4" src="assets/images/tape4.jpg" style="width:100%">'); 
  var tape5 = $('<img class="tapeImages" id="tape5" src="assets/images/tape5.png" style="width:100%">'); 
  tapeImageArray.push(tape1, tape2, tape3, tape4, tape5); 
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

// ====Modal ========================================================
  $(document).ready(function(){
    $('.modal-trigger').modal();
    $('#modal1').modal();
  });
// ==================================================================

// ====Mixtape Info==================================================

  $(".mixtapeInfoSave").attr('disabled','disabled');

  $('.saveBtn').on('click', function() {
    if ($('#mixtapeName').val().length != 0 && $('#userName').val().length != 0 && $('.playlistWIP').find('tr').length >= 5) {
      $(".mixtapeInfoSave").removeAttr('disabled');
      $(".mixtapeInfoSave").addClass('pulse');
      
    } // END if
  }); 

  $('.mixtapeInfoSave').on('click', function() {
    // event.preventDefault();
    var userTapeSelection = tapeImageArray[tape].attr('src'); 
    var mixtapeName = $('#mixtapeName').val(); 
    var userName = $('#userName').val(); 
    var userEmail = $('#userEmail').val();   
    var mixtapeInfo = {
      mixtapeName: mixtapeName,
      userName: userName, 
      userEmail: userEmail,
      userTapeSelection: userTapeSelection, 
      playlist: jsonPlaylist,
    }

    // count how many rows in the table 
    var trackCount = $('.playlistWIP').find('tr').length;

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
    };
    GetCellValues();


    database.ref().push({
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      mixtapeInfo: mixtapeInfo
    }); 

  })

// ==================================================================

// ====Final Playlist================================================
  function genFinPlaylist () {
      // $('.modal-trigger').leanModal();
      $('.finalPlaylist').empty(); //clears whatever was in the playlist before showing the new one

      //  set up variables for the table
      var tBody = $('.finalPlaylist');
      var tbl   = $('<table>');
      var tblH  = $('<tr><th>Artist</th><th>Album</th><th>Track Name</th><th>Track Length</th><th>Album Info</th><th>Youtube</th>')
      
      // set up table headers
      tbl.append(tblH);

      // ===== pull from DB to populate FINAL playlist=======
      database.ref().limitToLast(1).once('child_added', function(snapshot, prevChildKey) {
              
        var fbFinalMixtapeName = snapshot.child('mixtapeInfo/mixtapeName').val();
        var fbFinalUserTapeSelection = snapshot.child('mixtapeInfo/userTapeSelection').val();
        var fbFinalPlaylist = snapshot.child('mixtapeInfo/playlist').val();
        var fbFinalUserName = snapshot.child('mixtapeInfo/userName').val();

        var tapeLabel = $('<div class ="mixtapeLabel2">')
          tapeLabel.append('<h5>' + fbFinalMixtapeName + '</h5>'); 
            
          var tapeImage = $('<img class="finalMixtapeImage">'); 
            tapeImage.attr('src', fbFinalUserTapeSelection); 
            $('.mixtapeCover').prepend(tapeImage, tapeLabel); 

        //for loop to loop through the object returned from firebase
        for (i = 0; i < fbFinalPlaylist[0].values.length; i++) {
          var artist = fbFinalPlaylist[0].values[i].artist; 
            // console.log(artist); 
          var album = fbFinalPlaylist[0].values[i].album; 
          var track = fbFinalPlaylist[0].values[i].trackName; 
          var trackLength = fbFinalPlaylist[0].values[i].trackLength; 
            // console.log(artist, album, track, trackLength); 


          var tRow = $('<tr>'); 
          var ytDisp = $('<img>');
          var playBtnLink = $('<a>');
          var playBtn = $('<i>');
          var modalBtn = $('<a>');

          tRow.empty(); // clears the row after each loopthrough and each append
          ytDisp.empty(); //clears the youtube icon display so it can be re-applied
          playBtnLink.empty(); // clears the attached music link before

          ytDisp.attr('src','assets/images/youtube.png');
          // ytDisp.attr('href','#modal2');
          ytDisp.attr('height', '55px');
          ytDisp.attr('width', '55px');
          ytDisp.attr('artist', artist);
          ytDisp.attr('track', track);
          ytDisp.addClass('waves-effect waves-light');

          playBtn.addClass('material-icons playBtn');
          playBtn.attr('artist',artist);
          playBtn.attr('track',track);
          playBtn.attr('album',album);
          playBtn.text('info');

          playBtnLink.addClass('btn-floating btn-medium waves-effect waves-light blue-darken-3 playBtn modal-trigger');
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
            var artistTd = $('<td class="Artist">').text(artist);
            var albumtTd = $('<td class="AlbumName">').text(album);
            var trackTd = $('<td class="trackName">').text(track);
            var trackLengthTd = $('<td class="tlength">').text(trackLength);
            var playTd = $('<td class="playMusic">').append(playBtnLink);
            var ytTd = $('<td class="youtubeTd">').append(modalBtn);

            tRow.addClass('finalTrackSelect hoverable')
            tRow.append(artistTd,albumtTd,trackTd,trackLengthTd,playTd,ytTd);
            tbl.append(tRow);
        } // END for loop
        $(".finalUserInfo").append ('<h5>' + 'A Mixtape By: ' + '<br>' + fbFinalUserName + '</h5>');



      }); //END firebase pull

    // Adds the table to the html  
    tbl.addClass("table highlight");
    tBody.append(tbl);
    
  }; //END genFinPlaylist
  genFinPlaylist(jsonPlaylist);
  

// ==================================================================

// ====Youtube API===================================================
  $('.finalPlaylist').on('click', '.youtube', function() {
    var artist = $(this).attr('artist');
    var track = $(this).attr('track');
    
    // Need to get the trackname and artist passed from music match. This section searches the youtube API for a mix of the track and artist and returns the top 10 results.
    
      function searchYoutube(trackPass,artistPass) {
        // set variables for search and establish youtube key
        var trackName = trackPass; 
        var artist = artistPass;
        var searchString = trackName + artist;
        var ytKey = 'AIzaSyC2Ztkch3B2cHJIwLRpZpwzCw4IM6UqwlU';
        var queryURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+searchString+'&type=video&videoEmbeddable=true&maxResults=1&key='+ytKey
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
    searchYoutube(track,artist);
    $('#modal2').modal();
    $('#modal2').modal('open'); 
  }); 
// ==================================================================

// ====LastFM API Call for Album Info================================
  $('.finalPlaylist').on('click', '.playBtn', function() {  
    var artist = $(this).attr('artist'); 
    var album = $(this).attr('album'); 
    var apiKey = '7b595b1c67e159509af67e6e4e94cbb4';
    var queryURL = 'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' + apiKey + '&artist=' + artist + '&album=' + album + '&format=json'; 
    // console.log(queryURL); 
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      $('.albumImage').empty(); 
      $('.summary').empty(); 

      var albumArt = response.album.image[3]['#text']; 
      var albumArtLast = $('<img>');
      albumArtLast.attr('src',albumArt);
      $('.albumImage').html(albumArtLast);
      var albumSummary = response.album.wiki.content; 
      // console.log(albumSummary)
      var albumSummaryP = $('<p>').html(albumSummary); 
      $('.summary').html(albumSummary); 

    });
  }); 
      
// ==================================================================


}); // End Document.ready



