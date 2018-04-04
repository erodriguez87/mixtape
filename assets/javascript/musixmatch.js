//MusixMatch API connection and Searching for Songs
  // ==================================================================
  // Connection to musixmatch service, returns based on user search from html. It also passes a value into the youtube API Search. The request we made calls a jsonp file. That required a special function to parse it correctly.
  $("#clear").on("click", function() {
    $('.searchInput :input').val('');
  }); // ----- END click event

  
  $('.searchBtn').on('click', function (event) {
    event.preventDefault();
    
    //set variables including the search pulled in from the input field
    var trackName = $("#searchTrack").val();
    var artist = $("#searchArtist").val();;
    var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
    var queryURL = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + trackName +'&q_artist=' + artist + '&s_artist_rating=desc'+ '&apikey=' + apiKey;

    // set up arrays to catch the 10 responses from the first ajax call
    var tracks = [];
    var artists = [];
    var trackLength = [];
    var albumId = [];
    var albumName = [];

    // function that parses the return from musix match
    function parseMusic (res){
       
      // variables for table
      $('.searchDump').empty();
      var tBody = $('.searchDump');
      var tbl = $('<table>');
      var tblH = $('<tr><th>Artist</th><th>Album</th><th>Track Name</th><th>Track Length</th>')
      tbl.append(tblH);

      //for loop to loop through the top 10 search results from api and add them to an array
      for (i = 0; i < 10; i++) {
        var tRow = $('<tr>');
        tRow.empty();
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
    
    }
    //ajax call that returns a search from musix match. populates a div that users can use to select songs for the playlist
    $.ajax({
      url: queryURL,
      method: 'GET',
      dataType: 'jsonp',
      jsonpCallback: 'parseMusic'
    }).then(parseMusic)
  });
// ==================================================================

// MusixMatch Logic to move search items from table to Playlist
  // ==================================================================
  $('.searchDump').on('click', '.trackSelect', function() {
    console.log(this); 
    $('.playlistWIP').append(this); 
  }); 

  $('.playlistWIP').on('click', '.trackSelect', function() {
    $(this).remove(); 
  }); 

// ==================================================================

// Second call to MusixMatch for album images on the playlist
  // ==================================================================
  function findAlbumArt (){
    var albumSelect='28247938';
    var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
    var queryURL2 = 'https://api.musixmatch.com/ws/1.1/album.get?format=jsonp&callback=callback&album_id='+albumSelect+'&apikey=' + apiKey;
    // https://api.musixmatch.com/ws/1.1/album.get?format=jsonp&callback=callback&album_id=28247938
    // https://api.musixmatch.com/ws/1.1/album.get?format=jsonp&callback=callback&album_id=28247938&apikey=76cb84616ac5b0e74b21c7674cb2b865
    // https://api.musixmatch.com/ws/1.1/album.get?album_id=28247938&apikey=76cb84616ac5b0e74b21c7674cb2b865
    
    // $.ajax({
    //   url: queryURL2,
    //   method: 'GET'
    // }).then(function(response) {
    //   console.log('in ajax 2');
    //   // console.log(response);
    //   var imgDisplay = $("<img>");
    //   albumArt= response.message.body.album.album_coverart_100x100;
    //   imgDisplay.attr('src', albumArt);
    //   console.log(imgDisplay);
    // }); 

  }; 


  findAlbumArt(); 

  
  
   
// ==================================================================

// Call to MusixMatch for lyrics when user selects song from playlist
$('.finalPlaylist').on('click', '.playBtn', function() {   
    var artist = $(this).attr('artist'); 
    var track = $(this).attr('trackName'); 
    console.log(artist, track); 
    var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
    var queryURL = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=' + track +'&q_artist=' + artist + '&s_artist_rating=desc'+ '&apikey=' + apiKey;    
    
    // https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=slowride&q_artist=foghat&s_artist_rating=desc&apikey=76cb84616ac5b0e74b21c7674cb2b865
    // https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=slowride&q_artist=foghat&s_artist_rating=desc&apikey=76cb84616ac5b0e74b21c7674cb2b865

    function fetchLyrics(response) {
      console.log(queryURL); 
      console.log(response.message.body.lyrics.lyrics_body); 

    }



    $.ajax({
      url: queryURL,
      method: 'GET',
      dataType: 'jsonp',
      jsonpCallback: 'fetchLyrics'
    }).then(fetchLyrics); 


    //   console.log(response.body.lyrics.lyrics_body); 
    // });



    // second call to get lyrics


    //display lyrics in DIV



  }); 

  var albumSelect='28247938';
  var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
  var queryURL2 = 'https://api.musixmatch.com/ws/1.1/album.get?format=jsonp&callback=callback&album_id='+albumSelect+'&apikey=' + apiKey;
  // https://api.musixmatch.com/ws/1.1/album.get?format=jsonp&callback=callback&album_id=28247938
  // https://api.musixmatch.com/ws/1.1/album.get?format=jsonp&callback=callback&album_id=28247938&apikey=76cb84616ac5b0e74b21c7674cb2b865
  // https://api.musixmatch.com/ws/1.1/album.get?album_id=28247938&apikey=76cb84616ac5b0e74b21c7674cb2b865

  // $.ajax({
  //   url: queryURL2,
  //   method: 'GET'
  // }).then(function(response) {
  //   console.log('in ajax 2');
  //   // console.log(response);
  //   var imgDisplay = $("<img>");
  //   // albumArt= response.message.body.album.album_coverart_100x100;
  //   imgDisplay.attr('src', albumArt);
  //   console.log(imgDisplay);
  // }); 

  




// ==================================================================
