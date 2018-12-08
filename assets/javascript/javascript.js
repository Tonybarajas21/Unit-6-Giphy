var movies = ["The Matrix", "Toy Story", "Deadpool", "Pulp Fiction", "Jurassic Park", "Pineapple Express", "Dodgeball"];

// function for displaying gif data
$(document).ready(function () {

    function renderButtons() {

        $("#movies-view").empty();

        //loop through the array of movies

        for (var i = 0; i < movies.length; i++) {

            var a = $("<button>");

            a.addClass("movie");

            //a.attr("data-name", movies[i]);

            a.text(movies[i]);

            $("#movies-view").append(a);

        };
    };

    // This function handles events where one button is clicked
    $("#add-movie").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        event.preventDefault();

        var moviebutton = $("#movie-input").val().trim();

        movies.push(moviebutton);

        renderButtons();


    });
    renderButtons();

    $(document).on("click", ".movie", function () {

        var movie = $(this).text();
        
        $("#movie-gifs").empty();

        console.log("I got pressed!");
        console.log(movie);
        Search(movie);
       
        



    });

    $(document).on("click", ".giffy", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

    function Search(search) {
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=b3pwT2Dgw57RUVbsOOWFaiNJH5z0XGjM&limit=10";
        
        $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var stillLink = results[i].images.fixed_height_still.url;
                var animateLink = results[i].images.fixed_height.url;



                var movieDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);
                var movieImage = $("<img>");
                movieImage.attr("src", stillLink);

                movieImage.addClass("giffy");

                movieImage.attr({
                    "data-state": "still",
                    "data-still": stillLink,
                    "data-animate": animateLink

                });

                movieDiv.append(p);
                movieDiv.append(movieImage);

                $("#movie-gifs").prepend(movieDiv);
            }


        });

        


    }

    



});




