//accordian script//
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

var bandInput = $("#band-name");
var locationInput = $("#location");
var searchButton = $("#search");
var clearButton = $("#clear");
var bandBio = $("#band-bio");
var bandDisco = $("#band-discography");
var concerts = $("#concerts");
var breweries = $("#brewery-results");

searchButton.on("click", function(){
    bandInput.val();
    locationInput.val();
    console.log(bandInput.val(), locationInput.val());
    localBreweries();
    bandInformation();
})


function localBreweries(){
var  queryUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + locationInput.val();

$.ajax ({
    url:queryUrl,
    method:"Get",
}) 
.then(function(breweryList) {
    console.log(queryUrl);
    console.log(breweryList);
    `<a href="-">link to breweries</a>`
    breweries.empty()
    for (var i = 0; i < breweryList.length; i++){
        breweries.append(`<a href="${breweryList[i].website_url}">${breweryList[i].name}</a>`)
    }
})  


}

function bandInformation(){
    var queryUrlBand = "https://api.discogs.com/artists/1?callback=" + bandInput.val();
    $.ajax ({
        url:queryUrlBand,
        method:"Get",
    }) 
    .then(function(response) {
        console.log(queryUrlBand);
        console.log(response);
    }) 
}

