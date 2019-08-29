let states = ["california", "oregon", "washington"]
// MJP <3 CMG
$(document).ready(function () {
  makeButtons();


  // this function makes our buttons
  function makeButtons() {
    //
    $("#stateButtons").empty();

    for (let i = 0; i < states.length; i++) {
      makeOneButton(states[i]);
    }
  }

  function makeOneButton(text) {
    let stateButton = $('<button></button>');
    stateButton.addClass("state");
    stateButton.text(text);

    $("#stateButtons").append(stateButton);
    getGifsForButton(text);
  }

  function getGifsForButton(text) {
    let endPoint = "https://api.giphy.com/v1/gifs/search";
    let api_key = "Lt4Swoe1WVvDDtxMEjI3L6XmGXfJJ6Ny";
    let queryURL = endPoint + "?q=" + text + "&limit=10" + "&api_key=" + api_key;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      
      for (let i = 0; i < response.data.length; i++){

        let gifDiv = $("<div>");
        
        let stateGif = $("<img>");
        stateGif.attr("src", response.data[i].images.fixed_height.url);
  
        //gifDiv.append(p);
        gifDiv.append(stateGif);
        
        $("#stateGifs").prepend(gifDiv);
      }
      console.log(response);
    }).catch(function (error) {
      console.error(error)
    });
  }

  $('#newStateButton').click(function (event) {
    event.preventDefault();

    makeOneButton($('#stateInput').val().trim());
  })
})