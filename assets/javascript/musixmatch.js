// ====MusixMatch API connection and Searching for Songs=============
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
      var tableMain = $('.searchDump');
      var tbl = $('<table>');
      var tHead = $('<thead>'); 
      var tBody = $('<tbody>'); 
      var tblH = $('<tr><th>Artist</th><th>Album</th><th>Track Name</th><th>Track Length</th>')
      tHead.append(tblH); 
      tbl.append(tHead);

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
          tBody.append(tRow); 
          // tbl.append(tRow);
      }

    // Adds the table to the html  
    tbl.addClass("table highlight");
    tbl.append(tBody); 
    var title = $('<h4 class="searchPlayTitles">'+'Search!'+'</h4>')
    tableMain.append(title, tbl);
    
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

// ====MusixMatch Logic- move items to/from search & Playlist========
  $('.searchDump').on('click', '.trackSelect', function() {
      var tblH = $('<tr><th>Artist</th><th>Album</th><th>Track Name</th><th>Track Length</th>')
      var mixtapeName = $('#mixtapeName').val(); 
      var title = $('<h4 class="searchPlayTitles">'+ mixtapeName +'</h4>')

      $('#playlistWIPHead').html(title, tblH);
    $('.playlistWIP').append(this); 
  }); 

  $('.playlistWIP').on('click', '.trackSelect', function() {
    $('.searchDump').append(this); 
  }); 

// ==================================================================