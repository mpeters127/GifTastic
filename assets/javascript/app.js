let states = []

$(document).ready(function() {

// this function makes our JSON call to get our gifs
function showGifs(){
  let state = $(this).attr('stateName');

let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + state + 
  "&api_key=Lt4Swoe1WVvDDtxMEjI3L6XmGXfJJ6Ny";

$.ajax({
  get: queryUrl,
  method: "GET"
})
  .then(function(response) {
    console.log(queryUrl);
    console.log(response);
    });
  }
// this function is going to give us our buttons that go to our button array 
function makeButtons() {

  $('#gifBox').empty();
  // loop for our States array
  for (let i = 0; i < states.length; i++) {
    //this makes our button
    let button = $('<button>');
      button.addClass('state');
      button.attr('stateName', states[i]);

    $('#stateButtons').append(states);
  }
}

//make event that handles when the buttons are clucked
  $('#addStates').on("click", function(event) {
    event.preventDefault();

    let state = $('#stateInput').val().trim();
    states.push(state);
    console.log(states);

    makeButtons();
  
});

$(document).on('click','.state', showGifs);

makeButtons();

})

  
