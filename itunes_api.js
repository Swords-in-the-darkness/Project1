// <!DOCTYPE html>
// <html>
// <head>
// 	<title>Itunes API</title>

// 	<!-- Primary Page Layout
//   	–––––––––––––––––––––––––––––––––––––––––––––––––– -->
	
// 		<!-- Header
// 		========================================== -->
//   		<header class="container">
//   			<div class="row">
//   				<div class="text-center">
//   					<h1>Reel It</h1>
//   				</div>
//   			</div>
// 		</header>

// 		<!-- Main
// 		========================================== -->
		
// 		<!-- Search Area -->
// 		<div class="container">
// 			<div class="row">
// 				<div class="panel panel-primary">
// 					<div class="panel-body">
// 						<form>
// 							<div class="form-group" id="searchForm">
// 								<label for="movieTitle">Movie or TV Show Title</label>
// 								<input type="text" class="form-control" id="movieTitle">
// 								<label for="movieActor">Actor/Actress/Director</label>
// 								<input type="text" class="form-control" id="movieActor">
// 								<label for="movieGenre">Genre</label>
//                 <!--List of movie genres by id -->
// 								<select type="text" class="form-control" id="movieGenre"> 
//                   <option value="4401">Action & Adventure</option>
//                   <option value="4402">Anime</option>
//                   <option value="4403">Classics</option>
//                   <option value="4404">Comedy</option>
//                   <option value="4405">Documentary</option>
//                   <option value="4406">Drama</option>
//                   <option value="4407">Foreign</option>
//                   <option value="4408">Horror</option>
//                   <option value="4409">Independent</option>
//                   <option value="4410">Kids & Family</option>
//                   <option value="4411">Musicals</option>
//                   <option value="4412">Romance</option>
//                   <option value="4413">Sci-Fi & Fantasy</option>
//                   <option value="4414">Short Films</option>
//                   <option value="4415">Special Interest</option>
//                   <option value="4416">Thriller</option>
//                   <option value="4417">Sports</option>
//                   <option value="4418">Western</option>
//                   <option value="4419">Urban</option>
//                   <option value="4420">Holiday</option>
//                   <option value="4421">Made for TV</option>
//                   <option value="4422">Concert Films</option>
//                   <option value="4423">Music Documentaries</option>
//                   <option value="4424">Music Feature Films</option>
//                   <option value="4425">Japanese Cinema</option>
//                   <option value="4426">Jidaigeki</option>
//                   <option value="4427">Tokusatsu</option>
//                   <option value="4428">Korean Cinema</option>
//                 </select> 

              
// 								<div class="checkbox">
// 								    <label>
// 								      <input type="checkbox">All
// 								    </label>
// 								    <label>
// 								      <input type="checkbox">Netflix
// 								    </label>
// 								    <label>
// 								      <input type="checkbox">iTunes
// 								    </label>
// 								</div>	
// 							</div>
// 							<button type="submit" class="btn btn-primary" id="submitButton">Submit</button>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 		<!-- Table -->
// 		<div class="container">
// 			<div class="row">
// 				<div class="panel panel-primary">
// 					<div class="container" id="movieResults">
// 					</div>
// 				</div>
// 			</div>
// 		</div>

	

// 		<!-- Footer
// 		========================================== -->
// 		<footer>
// 		</footer>	
	

//-----------------------------------------------------------
//-----------------Begin movie search api -------------------
//-----------------------------------------------------------

	$(document).ready(function() {
		var searchTerm = "";
		var queryURL = "";
		var requestData = "";

		


	$('#submitButton').on('click', function(event) {
        event.preventDefault();
    $(".moviePurchase").empty();
    $(".director").empty();

    var searchTerm =  $('.query').val().trim();
      
    var queryURL = "https://itunes.apple.com/search?term="+ searchTerm +"&entity=movie&limit=1";

   

    $('#movieResults').empty();

    
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET",
          dataType: "jsonp"
        })
      .done(function(data) {

          var requestData = data.results;

          

          for (var i = 0; i<requestData.length; i++){

            // store our call back result into variables
            var itunesMovieTitle = requestData[i].trackCensoredName;
            console.log(itunesMovieTitle);

          	var itunesMovieImage = requestData[i].artworkUrl100;
          	console.log(itunesMovieImage);

          	var itunesMovieDirector = requestData[i].artistName;
          	console.log(itunesMovieDirector);

          	var itunesMovieRating = requestData[i].contentAdvisoryRating;
          	console.log(itunesMovieRating);

          	var itunesMovieDescription = requestData[i].longDescription;
          	console.log(itunesMovieDescription);

          	var itunesMovieTrailer = requestData[i].previewUrl;
          	console.log(itunesMovieTrailer);

            var mainItunesLink = requestData[i].trackViewUrl;
            console.log(mainItunesLink);

            //creating a div to put all our imags, movie title, trailer, rating etc

          	var newMovieDivDisplay = $('<div class="htmlMovieDisplay">');
          	var movieImageFile = $('<img class="imageFile">');

          	movieImageFile.attr('src', itunesMovieImage);

         
         	  var itunesRatingDiv = $('<p>');

          	itunesRatingDiv.append("Rated: " + itunesMovieRating);

          	var descriptionDiv = $('<p>');

          	descriptionDiv.append(itunesMovieDescription);

          	var directorDiv = $('<p>');

          	directorDiv.append("Director: " + itunesMovieDirector);

          	var videoDiv = $('<video width="400" controls>');

          	videoDiv.attr('src', itunesMovieTrailer);

          	videoDiv.append(itunesMovieTrailer);
 
            var titleDiv = $('<p>');

            titleDiv.append(itunesMovieTitle);

            var linkDiv = $('<a>').attr('href', mainItunesLink).attr("target", "_blank").text('View in iTunes');
            linkDiv.addClass("btn btn-sm btn-primary btn-itunes");
            linkDiv.attr("role", "button");

            //appending our movie div with all the api information into our main html page
            newMovieDivDisplay.append(titleDiv);
          	newMovieDivDisplay.append(movieImageFile);
          	newMovieDivDisplay.append(itunesRatingDiv);
          	newMovieDivDisplay.append(descriptionDiv);
          	newMovieDivDisplay.append(directorDiv);
          	newMovieDivDisplay.append(videoDiv);
            newMovieDivDisplay.append(linkDiv);

          	// $('#movieResults').append(newMovieDivDisplay);
            $(".moviePurchase").append(linkDiv);
            $(".director").append(directorDiv);
            $(".ratingFCC").append(itunesRatingDiv);




            console.log(requestData[i]);




           }
               

      	// end of ajax call
       });


//End of on click function
});

//----------------------------------------------------------------------------
//----------------------Start movie actor, director search script-------------
//----------------------------------------------------------------------------
	
  $('#submitButton').on('click', function(event) {
        event.preventDefault();

    var searchTerm =  $('#movieActor').val().trim();
      
    var queryURL = "https://itunes.apple.com/search?term="+ searchTerm;

   
    
    
    $('#movieResults').empty();
        
    
      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET",
          dataType: "jsonp"
        })
      .done(function(data) {

          var requestData = data.results;

          

          for (var i = 0; i<requestData.length; i++){

            var itunesMovieTitle = requestData[i].trackCensoredName;

            console.log(itunesMovieTitle);

          	var itunesMovieImage = requestData[i].artworkUrl100;
          	console.log(itunesMovieImage);

          	var itunesMovieDirector = requestData[i].artistName;
          	console.log(itunesMovieDirector);

          	var itunesMovieRating = requestData[i].contentAdvisoryRating;
          	console.log(itunesMovieRating);

          	var itunesMovieDescription = requestData[i].longDescription;
          	console.log(itunesMovieDescription);

          	var itunesMovieTrailer = requestData[i].previewUrl;
          	console.log(itunesMovieTrailer);

            var mainItunesLink = requestData[i].trackViewUrl;

          	var newMovieDivDisplay = $('<div class="htmlMovieDisplay">');
          	var movieImageFile = $('<img class="imageFile">');

          	movieImageFile.attr('src', itunesMovieImage);

         
         	var itunesRatingDiv = $('<p>');

          	itunesRatingDiv.append(itunesMovieRating);

          	var descriptionDiv = $('<p>');

          	descriptionDiv.append(itunesMovieDescription);

          	var directorDiv = $('<p>');

          	directorDiv.append("Director: " + itunesMovieDirector);

          	var videoDiv = $('<video width="400" controls>');

          	videoDiv.attr('src', itunesMovieTrailer);

          	videoDiv.append(itunesMovieTrailer);

            var titleDiv = $('<p>');

            titleDiv.append(itunesMovieTitle);

            var linkDiv = $('<a>').attr('href', mainItunesLink).text('Here is a movie link to purchase ' + itunesMovieTitle);


            newMovieDivDisplay.append(titleDiv);
          	newMovieDivDisplay.append(movieImageFile);
          	newMovieDivDisplay.append(itunesRatingDiv);
          	newMovieDivDisplay.append(descriptionDiv);
          	newMovieDivDisplay.append(directorDiv);
          	newMovieDivDisplay.append(videoDiv);
            newMovieDivDisplay.append(linkDiv);


          	$('#movieResults').append(newMovieDivDisplay);

            // When searching for movies by query, can I filter those results by genre within the URL?
            // Can I accomiplish the above using a genreID in combination with the search term?
            // If you can accomplish that with genre ID, store the genre IDs in an array of objects or as items in a select menu, etc...

           }
               

      	// end of ajax call
       });


//End of second on click function 
});

//--------------------------------------------------------------------------------------------
//----------------------Start Genre movie script----------------------------------------------
//--------------------------------------------------------------------------------------------

$('#submitButton').on('click', function(event) {
        event.preventDefault();

    var searchGenreId =  $('#movieGenre').val().trim();
      
    var queryURL = "https://itunes.apple.com/us/rss/topmovies/genre=" + searchGenreId+ "/json";

    
    
    
    $('#movieResults').empty();
            
    
      // Performing an AJAX request with queryURL
      $.ajax({
          url: queryURL,
          method: "GET",
          dataType: "jsonp"
        })
      .done(function(data) {

          var requestData = data.feed.entry;
          console.log(requestData);


          for (var i = 0; i<requestData.length; i++){


           var itunesMovieTitle = requestData[i]['im:name'].label;
           


           var itunesMovieImage = requestData[i]['im:image'][2].label;
           

           var itunesMovieDirector = requestData[i]['im:artist'].label;

         

           var itunesMovieDescription = requestData[i].summary.label;

          

           var mainItunesGenreLink = requestData[i].link[0].attributes.href;

           var genreMovieTrailer = requestData[i].link[1].attributes.href;

           var newMovieDivDisplay = $('<div class="htmlMovieDisplay">');
           var movieImageFile = $('<img class="imageFile">');

           movieImageFile.attr('src', itunesMovieImage);

         
          


          var descriptionDiv = $('<p>');

          descriptionDiv.append(itunesMovieDescription);

          var directorDiv = $('<p>');

          directorDiv.append("Director: " + itunesMovieDirector);

          var videoDiv = $('<video width="400" controls>');

          videoDiv.attr('src', genreMovieTrailer);

          videoDiv.append(genreMovieTrailer);

          var titleDiv = $('<p>');

          titleDiv.append(itunesMovieTitle);

          var linkDiv = $('<a>').attr('href', mainItunesGenreLink).text('Here is a movie link to purchase ' + itunesMovieTitle);


            newMovieDivDisplay.append(titleDiv);
            newMovieDivDisplay.append(movieImageFile);
            newMovieDivDisplay.append(descriptionDiv);
            newMovieDivDisplay.append(directorDiv);
            newMovieDivDisplay.append(videoDiv);
            newMovieDivDisplay.append(linkDiv);


            $('#movieResults').append(newMovieDivDisplay);

           }
               

        // end of ajax call
       });


//End of genre on click function 
});



//end of document ready function
});





