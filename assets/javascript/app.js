let cartoons = ["Rugrats","CatDog","Courage the Cowardly Dog"]

$(document).ready(function() {

// this function makes our JSON call to get our gifs
function showGifs(){
  let cartoon = $(this).attr('cartoonName');

let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + 
  "&api_key=Lt4Swoe1WVvDDtxMEjI3L6XmGXfJJ6Ny";

$.ajax({
  get: queryUrl,
  method: "GET"
})
  .then(function(response) {
    $('#gifBox').img(JSON.parse(response))
    console.log(queryUrl);
    console.log(response);
    });
  }
// this function is going to give us our buttons that go to our button array 
function makeButtons() {

  $('#gifBox').empty();
  // loop for our cartoons array
  for (let i = 0; i < cartoons.length; i++) {
    //this makes our button
    let button = $('<button>');
      button.addClass('cartoon');
      button.attr('cartoonName', cartoons[i]);

    $('#cartoonButtons').append(cartoons);
  }
}

//make event that handles when the buttons are clucked
  $('#addCartoon').on("click", function(event) {
    event.preventDefault();

    let cartoon = $('#cartoonInput').val().trim();
    cartoons.push(cartoon);
    console.log(cartoons);

    makeButtons();
  
});

$(document).on('click','.cartoon', showGifs);

makeButtons();

})

  
