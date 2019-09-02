let states = ["california", "oregon", "washington"]

$(document).ready(function () {
  $("#stateButtons").empty();
  // this populates our list
  for (let i = 0; i < states.length; i++) {
    makeOneButton(states[i]);
  }
})

//this is binding a function to the click event of any state button
$("#stateButtons").on("click", ".state", function () {
  // this function calls the clicked state by id
  getStateGifsByName(this.id);
});

// this function makes a button with the name of the state
function makeOneButton(text) {
  // this gives the button an id of the state name
  let stateButton = $('<button id="' + text + '">');
  // this gives the button class of state
  stateButton.addClass("state");
  // this gives the button text
  stateButton.text(text);
  // this appends stateButton to the stateButtons div
  $("#stateButtons").append(stateButton);
}

function getStateGifsByName(text) {
  let endPoint = "https://api.giphy.com/v1/gifs/search";
  let api_key = "Lt4Swoe1WVvDDtxMEjI3L6XmGXfJJ6Ny";
  let queryURL = endPoint + "?q=" + text + "&limit=10" + "&api_key=" + api_key;

  // our API call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    $("#stateGifs").empty();

    // this populates the stateGifs div with 10 gifs from the clicked state
    for (let i = 0; i < response.data.length; i++) {
      // makes div for our gifs
      let gifDiv = $("<div>");
      // gives us our still gif from the response data
      let stateGifStill = $("<img>");
      stateGifStill.attr("src", response.data[i].images.original_still.url);
      // gives us our gif from the response data
      let stateGifMoving = $("<img>");
      stateGifMoving.attr("src", response.data[i].images.original.url);
      // gives us our rating from the response data
      let rating = $("<p>");
      rating.text("Rating: " + response.data[i].rating);
      // this adds the above information to the gifDiv
      gifDiv.append(stateGifStill);
      // this replaces the still gif with the moving gif
        $(stateGifStill.replaceWith(stateGifMoving)).on("click");
      gifDiv.append(rating);
      // appends the gifDiv to the stateGifs div
      $("#stateGifs").append(gifDiv);
    }
    console.log(response);
    //error handling
  }).catch(function (error) {
    console.error(error)
  });
}
// binding function to click event for new state button
$('#newStateButton').click(function (event) {
  event.preventDefault();
  // calling make button function
  makeOneButton($('#stateInput').val().trim());
});

//bind click event to toggle static v mobile gif