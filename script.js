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
//variables
var bandInput = $("#band-name");
var locationInput = $("#location");
var searchButton = $("#search");
var clearButton = $("#clear");
var bandBio = $("#band-Bio");
var bandDisco = $("#band-discography");
var concerts = $("#concerts");
var breweries = $("#brewery-results");

//adds function to search button
searchButton.on("click", function () {
    bandInput.val();
    locationInput.val();
    console.log(bandInput.val(), locationInput.val());
    localBreweries();
    bandInformation();
    concertInformation();
})

function concertInformation(){
    var queryUrl = "https://rest.bandsintown.com/v4/artists/" + bandInput.val() + /events/?app_id=c65dedcf04e65667f523ca7355f03c5d";

    $.ajax ({
        url:queryUrl,
        method:"Get",
    })
    .then(function(_concerts) {
        console.log(queryUrl);
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

function bandInformation() {
    var queryUrlBand = "https://api.discogs.com/database/search?q=" + bandInput.val() + "&token=sjwnRXyRkNbzMOUItONhtLYRMUGbnHiwgGMCFgdP";


    $.ajax({
        url: queryUrlBand,
        method: "Get",
    })
        .then(function (albumList) {
            console.log(queryUrlBand);
            console.log(albumList);
            // console.log(albumList.results);
            //discography
            bandDisco.empty();
            for (var i = 0; i < albumList.results.length; i++) {
                console.log(albumList.results[i].title);
                bandDisco.append(`<ul>"${albumList.results[i].title}"</ul>`)

            }
            var profileUrl = albumList.results[0].resource_url;
            var bandProfile = getProfile(profileUrl);
          
            console.log(profileUrl);
            
            // link to band's page
        })


}

function getProfile(profileResource) {
    $.ajax({
        url: profileResource,
        method: "get",
    })
        .then(function (response) {
            // console.log("=======")
            // console.log(response.profile);
            bandBio.empty();
            bandBio.append(`<p>"${response.profile}"</p>`);
            // return response.profile;

        })
}

