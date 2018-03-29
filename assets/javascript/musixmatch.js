//MusixMatch API connection
  // ==================================================================
  // Connection to musixmatch service, returns based on user search from html. It also passes a value into the youtube API Search. The request we made calls a jsonp file. That required a special function to parse it correctly.
  $('#search').on('click', '.searchBtn', function () {
    var trackName = $(this).text;
    console.log(trackName);

    var artist = "";
    var trackName = 'dare you to move';
    var apiKey = '76cb84616ac5b0e74b21c7674cb2b865';
    var queryURL = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=' + trackName + '&quorum_factor=1&apikey=' + apiKey;

    function parseMusic (res){
      console.log(res)
      trackName = res.message.body.track_list[0].track.track_name
      artist = res.message.body.track_list[0].track.artist_name
      console.log('sharing' + trackName,artist)


    // for (i = 0; i < res.length; i++) {
    //   var trackDisp = $("<div>");

    //     imgDisplay.addClass("images img-fluid rounded mx-auto d-block text-center"); 
    //     imgDisplay.attr('src', objectsRet[i].images.original_still.url);
    //     imgDisplay.attr('dt-animate', objectsRet[i].images.original.url); 
    //     imgDisplay.attr('dt-still', objectsRet[i].images.original_still.url); 
    //     imgDisplay.attr('dt-state', 'still'); 
      
    //     imgDisplay.attr('rating', objectsRet[i].rating);

    //     var gifcapt = $('<labels>');
    //     var rtng = objectsRet[i].rating; 
    //     console.log(rtng); 
    //     var giflbl= $('<lbl>'); 
    //     giflbl.text('this is rated ' + rtng); 
    //     gifcapt.prepend(giflbl); 
    //     gifcapt.append(imgDisplay); 
    //     $('.gifDiv').prepend(gifcapt); 
    
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