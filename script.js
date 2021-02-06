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
var events = $(".events");
var breweries = $("#brewery-results");
var bandDiscoError = $("#bandDiscoError")

//adds function to search button
searchButton.on("click", function () {
    bandInput.val();
    locationInput.val();
    console.log(bandInput.val(), locationInput.val());
    localBreweries();
    bandInformation();
    getConcerts();
})

//clear button
var clearResults = $("#clear");
clearResults.click(function (event) {
    bandDisco.empty();
    bandBio.empty();
    breweries.empty();
    bandInput.val("");
    locationInput.val("");
    $("#barImg").hide();
});

//gets artist profile
function getProfile(profileResource) {
    $.ajax({
        url: profileResource,
        method: "get",
    })
        .then(function (response) {
            // console.log(response.profile);
            bandBio.empty();
            bandBio.append(`<p>"${response.profile}"</p>`);
            // return response.profile;
        })
}

//Grabs artist's resource URL so we can access the artist's profile
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
            // console.log(profileUrl);
            // link to band's page
        })
}

//Gets artist's discography
function getReleases(bandReleases) {
    $.ajax({
        url: bandReleases,
        method: "GET",
    }).then(function (response) {
        var artistReleases = getAlbums(response.releases_url);
        // console.log(response.releases_url);

        //conditional statement when the artist's profile & discography is under the "master resource"
        if (response.releases_url === undefined) {
            bandBio.empty();
            // console.log("nothing");
            var bioError = bandBio.append(`<p>This artist's profile and discography are not available at this time. Please check back later!</p>`);
            // var albumError = bandDiscoError.append(`<p>This artist's albums are not available at this time. Please check back later!</p>`);
            return (bioError);

        }
    })
}

//Function that gets the artist's album title and year
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
            bandDisco.append(`<ul><p>Album Title: ${response.releases[i].title}</p><p>Album Year: ${response.releases[i].year}</p></ul>`);
        }
    })
}

//grabs event information for the artist
function getConcerts() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandInput.val() + "/events?app_id=c65dedcf04e65667f523ca7355f03c5d";

    $.ajax({
        url: queryUrl,
        method: "Get",
    })
        .then(function (eventInfo) {
            console.log(queryUrl);
            // console.log(eventUrl[0].url);
            events.empty();
            for (var i = 0; i < eventInfo.length; i++) {
                console.log(eventInfo[i].url);
                console.log(eventInfo[i].datetime);
                console.log(eventInfo[i].lineup);
                events.append(`<a href=Link: ${eventInfo[i].url}></a><p>${eventInfo[i].datetime}</p><p>${eventInfo[i].lineup}</p>`);
            }

        })


}



//Function that gets the local bars related to the user's location input
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


