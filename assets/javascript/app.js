let states = ["california","oregon","washington"]

// this function makes our buttons



let state = $(this).attr("data-state");
// this function makes our JSON call to get our gifs

let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + state + 
  "&api_key=Lt4Swoe1WVvDDtxMEjI3L6XmGXfJJ6Ny";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      let results = response.data;

      // Looping through each result item
      for (let i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        let stateDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        let p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        let stateImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        stateImage.attr("src", results[i].images.fixed_height.url);

        // Appending the paragraph and image tag to the stateDiv
        stateDiv.append(p);
        stateDiv.append(stateImage);

        // Prependng the stateDiv to the HTML page in the "#gifs-appear-here" div
        $("#stateGifs").append(stateButtons);
      }
    }
    
    );

    function makeButtons() {

      $("stateButtons").empty();
  
      for (let i = 0; i < states.length; i++){
        
        let stateButton = $('<button>');
          stateButton.addClass("state");
          stateButton.text(states[i])
  
        $("#stateButtons").append(stateButton);
      }
    }
  
    makeButtons();

    $('#statesFrom').submit(function (event){
      event.preventDefault();

      //array for state selection
      let stateSelection=[];
      stateSelection.push($('#stateInput').val().trim());

      makeButtons(stateSelection);
    })