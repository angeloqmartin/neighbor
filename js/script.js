"use strict";

function findResources(seletedResource,postalCode) {
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${seletedResource}+in+${postalCode}&key=AIzaSyAdmPI42OYNaII52yMjflpdaKH1Gqk1Fks`)
    .then(response => response.json())
    .then(responseJson => renderResources(responseJson))
    .catch(err => console.log(err))
}

function hideElements() {
    $('main').addClass('hide');
    $('header').addClass('hide');
}

function watchFindResourceForm() {
    $(".find-resources-form").on("submit", (e) => {
    e.preventDefault();
    let postalCode = $('.postalcode').val();
    const seletedresource = $(".resource").val();
    findResources(seletedresource, postalCode);
})}

function generateResourceList(responseJson) {
    const resourceName = responseJson.results.map(data => 
        `<div class="js-results-item">
        <h3>${data.name}</h3>
        <p>${data.formatted_address}</p>
        </div>`)
    return resourceName;
};

function renderResources(responseJson) {
    hideElements();
    $('.resourceResults').html(generateResourceList(responseJson));
    
}
// --------------------------------------------------------------------------

function findEvents(postalCode) {
    fetch(`https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?q=volunteer%20homeless&l=${postalCode}&within=40&units=miles&app_key="3RM2NQ6NFX4bJkg4"`)
    .then(response => response.json())
    .then(responseJson => renderEvents(responseJson))
}

function watchFindEventsForm() {
    $(".find-events-form").on("submit", (e) => {
    e.preventDefault();
    let postalCode = $('.postalcode').val();
    findEvents(postalCode);
})}

function generateEventsList(responseJson) {
    const eventsList = responseJson.events.event.map(item => 
        `<div class="js-event-item">
        <h3>${item.title}</h3>
        <p>${item.venue_address}</p>
        </div>`)
        
    return eventsList;
};

function renderEvents(responseJson) {
    hideElements();
    $('.js-eventResults').html(generateEventsList(responseJson));
}

$(function () {
    watchFindResourceForm();
    watchFindEventsForm();
});