"use strict";

// display message in modal notfiying user 
// there is nothing in their area
function noEventsToReturn() {
    $('.modal').css("display","block");
}
// closes modal box if user
// clicks close btn (X) 
// or if user clicks window
function closeModal() {
    $('.close').click(function() {
        $('.modal').css("display","none");
    });
    $(window).click(function(e){
        $('.modal').css("display","none");
    });
};
// removes all results to in order
// to keep page from getting lengthy 
function removeResults() {
    $('.js-eventResults').empty();
    $('.js-resourceResults').empty();
}
function findResources(seletedResource,postalCode) {
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${seletedResource}+in+${postalCode}&key=AIzaSyAdmPI42OYNaII52yMjflpdaKH1Gqk1Fks`)
    .then(response => response.json())
    .then(responseJson => returnResources(responseJson))
    .catch(err => console.log(err))
}
function watchFindResourceForm() {
    $(".find-resources-form").on("submit", (e) => {
       $('.js-resourceResults').empty();
        e.preventDefault();
        let postalCode = $('.postalcode').val();
        const seletedresource = $(".resource").val();
        removeResults();
        findResources(seletedresource, postalCode);
})}
function returnResources(responseJson) {
    if (responseJson.status === "ZERO_RESULTS") {
        return  noEventsToReturn();
    } else {
        return renderResources(responseJson);
    }
};
function generateResourceList(responseJson) {
    const resourceName = responseJson.results.map(data => 
        `
        <div class="grid">
            <h3 role=heading>${data.name}</h3>
            <p>${data.formatted_address}</p>
        </div> 
        `)
    return resourceName;
};
function renderResources(responseJson) {
    $('.js-resourceResults').html(generateResourceList(responseJson));
    location.hash="#resource-Results";
}
function findEvents(postalCode) {
    fetch(`https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?q=volunteer%20homeless&l=${postalCode}&within=50&units=miles&app_key="3RM2NQ6NFX4bJkg4"`)
    .then(response => response.json())
    .then(responseJson => returnEvents(responseJson))
    .catch(err => console.log(err))
}
function watchFindEventsForm() {
    $(".find-events-form").on("submit", (e) => {
        const postalCode = $('.js-events-postalcode').val();
        e.preventDefault();
        removeResults();
        findEvents(postalCode);
})}
function returnEvents(responseJson) {
    if (responseJson.events === null) {
        return  noEventsToReturn();
    } else {
        return renderEvents(responseJson);
    }
};
function generateEventsList(responseJson) {
    const eventsList = responseJson.events.event.map(item =>
        `
        <div class="tile">
            <div id="tile-date"><h3>when:<br><br>${item.start_time}<h3></div>
            <div id="tile-title">
                <h3 role=heading>${item.venue_name}</h3>
                <p>${item.title}</p>
                <p>${item.city_name}, ${item.region_name}</p>
            </div>
            <a href="${item.url}" target="_blank">GET INVOLVED</a>
        </div> 
        `)
    return eventsList
}
function renderEvents(responseJson) {
    $('.js-eventResults').html(generateEventsList(responseJson));
    location.hash="#event-Results";
}
$(function () {
    closeModal();
    watchFindResourceForm();
    watchFindEventsForm();
});