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




function bandInformation() {
    var queryUrlBand = "https://api.discogs.com/database/search?q=" + bandInput.val() + "&token=sjwnRXyRkNbzMOUItONhtLYRMUGbnHiwgGMCFgdP";


    $.ajax({
        url: queryUrlBand,
        method: "Get",
    })
        .then(function (albumList) {
            console.log(queryUrlBand);
            // console.log(albumList);
            console.log(albumList.results);

            var profileUrl = albumList.results[0].resource_url;
            var bandProfile = getProfile(profileUrl);
            //discography
            var accessReleasesUrl = getReleases(profileUrl);
            // console.log(accessReleasesUrl);
            // var artistReleases = getAlbums(profileUrl);




            console.log(profileUrl);

            // link to band's page
        })
}

function getReleases(bandReleases) {
    $.ajax({
        url: bandReleases,
        method: "GET",
    }).then(function (response) {
        var artistReleases = getAlbums(response.releases_url);
        console.log(response.releases_url);
        // return response.releases_url;
    })
}

function getAlbums(bandAlbums) {
    $.ajax({
        url: bandAlbums,
        method: "GET",
    }).then(function (response) {
        // console.log(response.releases[0].title);
        bandDisco.empty();
        for (var i = 0; i < response.releases.length; i++) {
            console.log(response.releases[i].title);
            console.log(response.releases[i].year);
            
            bandDisco.append(`<ul>" Album Title: ${response.releases[i].title} <p>"Album Year: ${response.releases[i].year}</p>"</ul>`)

        }
    })
}

function concertInformation() {
    var queryUrl = "https://api.seatgeek.com/2/events?client_id=MjE1MTc5MTV8MTYxMTcwODQ0MS43NTExMTk0&client_secret=f4b171fe10abb7596219cdc85cc92ea099eed88a2f981f277950a5325b27cfe6" + locationInput.val();
    var queryUrlBand = "https://api.seatgeek.com/2/performers/?client_id=MjE1MTc5MTV8MTYxMTcwODQ0MS43NTExMTk0&client_secret=f4b171fe10abb7596219cdc85cc92ea099eed88a2f981f277950a5325b27cfe6" + bandInput.val();

    $.ajax({
        url: queryUrl,
        method: "Get",
    })
        .then(function (concerts) {
            console.log(queryUrl);
            console.log(queryUrlBand);
        })
}


function localBreweries() {
    var queryUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + locationInput.val();

    $.ajax({
        url: queryUrl,
        method: "Get",
    })
        .then(function (breweryList) {
            console.log(queryUrl);
            console.log(breweryList);
            `<a href="-">link to breweries</a>`
            breweries.empty()
            for (var i = 0; i < breweryList.length; i++) {
                breweries.append(`<a href="${breweryList[i].website_url}">${breweryList[i].name}</a>`)
            }
        })
}
