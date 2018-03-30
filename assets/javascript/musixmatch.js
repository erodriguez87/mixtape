//MusixMatch API connection
  // ==================================================================
  // Connection to musixmatch service, returns based on user search from html. It also passes a value into the youtube API Search. The request we made calls a jsonp file. That required a special function to parse it correctly.

  $('.searchBtn').on('click', function (event) {
    event.preventDefault();
    var trackName = $("#search").val();
    console.log('this is the button value' + trackName);

    var artist = "";
    var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
    var queryURL = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + trackName + '&apikey=' + apiKey;

    var tracks = [];
    var artists = [];
    var albumArts = [];

    function parseMusic (res){
      console.log(res)
      trackName = res.message.body.track_list[0].track.track_name
      artist = res.message.body.track_list[0].track.artist_name
      console.log('sharing' + trackName,artist)

      //for loop to loop through the top 10 search results from api and add them to an array
      for (i = 0; i < 10; i++) {
        console.log('in for loop');
        tracks[i] = res.message.body.track_list[i].track.track_name
        artists[i] = res.message.body.track_list[i].track.artist_name
        albumArts[i] = res.message.body.track_list[i].track.album_coverart_100x100
        console.log(tracks,artists, albumArts);
        
        var imgDisplay = $("<img>");
          imgDisplay.attr('src', res.message.body.track_list[i].track.album_coverart_100x100);

        var tBody = $('.searchDump');
        var tRow = $('<tr>');
          var thumbTd = $('<td class="thumbnail">').val(imgDisplay);
          var trackTd = $('<td class="track">').text(tracks[0]);
          var artistTd = $('<td class="artist">').text(artists[0]);
      }

    // Adds the table to the html
    tRow.append(thumbTd, trackTd, artistTd);
    tBody.append(tRow);
    
  }
  //ajax call that returns a search from musix match. populates a div that users can use to select songs for the playlist
  $.ajax({
    url: queryURL,
    method: 'GET',
    dataType: 'jsonp',
    jsonpCallback: 'parseMusic'
  }).then(parseMusic)
    .catch(function(err){
      console.log(err)
    })

  });
// ==================================================================