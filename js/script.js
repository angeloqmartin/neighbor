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
// handles click function on the the navigation a tags
$(".nav-list a").click(function() {
    $('.js-eventResults').addClass('hide');
    $('.resourceResults').addClass('hide');
    $('main').removeClass('hide');
    $('header').removeClass('hide');
})
function watchFindResourceForm() {
    $(".find-resources-form").on("submit", (e) => {
        $('.resourceResults').removeClass('hide');
        e.preventDefault();
        let postalCode = $('.postalcode').val();
        const seletedresource = $(".resource").val();
        findResources(seletedresource, postalCode);
})}
function generateResourceList(responseJson) {
    const resourceName = responseJson.results.map(data => 
        `
        <div class="tile">
        <h3 role=heading>${data.name}<h3>
            <div id="tile-title">
            <p>address:<br><br>${data.formatted_address}</p>
            </div>
        </div> 
        `)
    return resourceName;
};
function renderResources(responseJson) {
    hideElements();
    $('.resourceResults').html(generateResourceList(responseJson));
}
function findEvents(postalCode) {
    fetch(`https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?q=volunteer%20homeless&l=${postalCode}&within=50&units=miles&app_key="3RM2NQ6NFX4bJkg4"`)
    .then(response => response.json())
    .then(responseJson => renderEvents(responseJson))
}
function watchFindEventsForm() {
    $(".find-events-form").on("submit", (e) => {
        $('.js-eventResults').removeClass('hide');
        e.preventDefault();
        const postalCode = $('.js-events-postalcode').val();
        findEvents(postalCode);
})}
function generateEventsList(responseJson) {
    const eventsList = responseJson.events.event.map(item =>
        `
        <div class="tile">
            <div id="tile-date"><h3>when:<br><br>${item.start_time}<h3></div>
            <div id="tile-title">
                <h3 role=heading>${item.venue_name}<h3>
                <h3>${item.title}<h3>
                <p>${item.city_name}, ${item.region_name}</p>
            </div>
            <a href="${item.url}" target="_blank">GET INVOLVED</a>
        </div> 
        `)

    return eventsList
}
function renderEvents(responseJson) {
    hideElements();
    $('.js-eventResults').html(generateEventsList(responseJson));
}
$(function () {
    watchFindResourceForm();
    watchFindEventsForm();
});