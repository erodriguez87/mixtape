//MusixMatch API connection
  // ==================================================================
  // Connection to musixmatch service, returns based on user search from html. It also passes a value into the youtube API Search. The request we made calls a jsonp file. That required a special function to parse it correctly.
  $('.searchBtn').on('click', function (event) {
    event.preventDefault();
    
    //set variables including the search pulled in from the input field
    var trackName = $("#search").val();
    var artist = "";
    var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
    var queryURL = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + trackName + '&apikey=' + apiKey;

    // set up arrays to catch the 10 responses from the first ajax call
    var tracks = [];
    var artists = [];
    var trackLength = [];
    var albumId = [];
    var albumName = [];

    // function that parses the return from musix match
    function parseMusic (res){
      console.log(res)
      trackLength = parseInt(res.message.body.track_list[0].track.track_length)
      console.log(trackLength);
      console.log('seconds '+ moment.duration(trackLength, 'seconds'));
      console.log('minutes ' + moment.duration(trackLength).asMinutes());

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
        trackLength[i] = parseInt(res.message.body.track_list[i].track.track_length)
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
          tRow.addClass('trackSelect')
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
      // .catch(function(err){
        console.log(err)
      // })

  });
// ==================================================================

// MusixMatch Logic to move search items from table to Playlist
  // ==================================================================
  $('.trackSelect').on('click', function() {
    console.log('CLICK'); 
    console.log(this); 


    var tBody = $('.playlistWIP');
    var tRow = $('<tr>');
    var artistTd = $('<td class="artist">').text(artist);
    var albumTd = $('<td class="album">').text(album);
    var trackNameTd = $('<td class="trackName">').text(trackName);
    var trackLengthTd = $('<td class="trackLength">').text(trackLength);
  
    // add track info to DOM in playlist 
    tRow.append(artistTd, albumTd, trackNameTd, trackLengthTd);
    tBody.append(tRow);

  }); 

  




// ==================================================================

// Second call to MusixMatch for album images on the playlist
  // ==================================================================
  var albumSelect='28247938';

  var queryURL2 = 'https://api.musixmatch.com/ws/1.1/album.get?album_id='+albumSelect;
  $.ajax({
    url: queryURL2,
    method: 'GET',
  }).then()
    .catch(function(response){
      console.log(err)
      var imgDisplay = $("<img>");
      imgDisplay.attr('src', res.message.body.track_list[i].track.album_coverart_100x100);


    })


    
// ==================================================================