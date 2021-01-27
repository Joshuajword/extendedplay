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

var bandInput = $("#bandName");
var locationInput = $("#location");
var search = $("#search");
var clear = $("#clear");
var bandBio = $("band-bio");
var bandDisco = $("band-discography");
var concerts = $("conerts");
var breweries = $("brewery-results");



