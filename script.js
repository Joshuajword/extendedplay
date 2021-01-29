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
    concertInformation();
})

function concertInformation(){
    var queryUrl = "https://api.seatgeek.com/2/events?client_id=MjE1MTc5MTV8MTYxMTcwODQ0MS43NTExMTk0&client_secret=f4b171fe10abb7596219cdc85cc92ea099eed88a2f981f277950a5325b27cfe6" + locationInput.val();
    var queryUrlBand = "https://api.seatgeek.com/2/performers/?client_id=MjE1MTc5MTV8MTYxMTcwODQ0MS43NTExMTk0&client_secret=f4b171fe10abb7596219cdc85cc92ea099eed88a2f981f277950a5325b27cfe6" + bandInput.val();

    $.ajax ({
        url:queryUrl,
        method:"Get",
    })
    .then(function(concerts) {
        console.log(queryUrl);
        console.log(queryUrlBand);
    })
}


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
    var queryUrlBand = "https://api.discogs.com/artists/?callback=" + bandInput.val();
    $.ajax ({
        url:queryUrlBand,
        method:"Get",
    }) 
    .then(function(response) {
        console.log(queryUrlBand);
        console.log(response);
    }) 
}

