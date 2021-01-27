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
var bandBio = $("band-bio");
var bandDisco = $("band-discography");
var concerts = $("conerts");
var breweries = $("brewery-results");

searchButton.on("click", function(){
    bandInput.val();
    locationInput.val();
    console.log(bandInput.val(), locationInput.val());
})

var  queryUrl = "https://api.openbrewerydb.org/breweries?by_postal=" + locationInput;


