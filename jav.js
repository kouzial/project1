// Ajax

var theftData = [];
var assaultData = [];
var dwiData = [];
var map; // Google map object (global variable)

$.ajax({
    url: "https://data.policefoundation.org/resource/iibt-hvrs.json",
    type: "GET",
    data: {
        "$limit": 300,
        "$$app_token": "nx6iorDFMna26v0zqNiSfz0ZK"
    }
}).done(function(data) {
    // console.log(data);
    for (var i = 0; i < data.length; i++) {
        var address = data[i].address;
        var crime = data[i].crime_type;
        if(crime === 'THEFT'||crime === 'THEFT FROM PERSON'||crime === 'THEFT BY SHOPLIFTING'|| crime === 'AUTO THEFT'|| crime === 'THEFT OF BICYCLE'|| crime === 'THEFT OF AUTO PARTS'|| crime === 'THEFT FROM AUTO'){
         theftData.push(data[i]);
        }else if(crime === 'ASSAULT'|| crime === 'ASSAULT WITH INJURY'|| crime === 'ASSAULT BY THREAT' || crime === 'ASSAULT  CONTACT-SEXUAL NATURE' || crime === 'ASSAULT BY CONTACT FAM/DATING'|| crime === 'ASSAULT W/INJURY-FAM/DATE VIOL' || crime === 'ASSAULT INFO (FAMILY VIOLENCE' || crime === 'ASSAULT BY CONTACT' || crime === 'ASSAULT INFORMATION' || crime === 'AGG ASSAULT FAM/DATE VIOLENCE' || crime === 'SEXUAL ASSAULT W/ OBJECT'){
            assaultData.push(data[i]);
        }else if(crime === 'DWI DWI  .15 BAC OR ABOVE'|| crime === 'DWI' || crime === 'DWI 2ND' || crime === 'DWI - DRUG RECOGNITION EXPERT'){
          dwiData.push(data[i]);
                    }
    }

    for (var i = 0; i < theftData.length; i++) {

        var geoCodeAddress = theftData[i].address.split(' ').join('+');

        var resultsAddressURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodeAddress + "+Austin,+TX" + "&key=AIzaSyCQy72evJVRXltDR5di_RYVf5dv6aj5SeY";
        $.ajax({
            url: resultsAddressURL,
            type: "GET",
            data: {
                "$limit": 300
            }
        }).done(function(data) {
            var gresults = data;
            console.log(data);
            // for loop for finding coordinates
            for (var j = 0; j < data.results.length; j++) {
                var coords = data.results[j].geometry.location;
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'images/theft.png',
                });
            }
        });
    }
    for (var i = 0; i < assaultData.length; i++) {

        var geoCodeAddress = assaultData[i].address.split(' ').join('+');

        var resultsAddressURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodeAddress + "+Austin,+TX" + "&key=AIzaSyCQy72evJVRXltDR5di_RYVf5dv6aj5SeY";
        $.ajax({
            url: resultsAddressURL,
            type: "GET",
            data: {
                "$limit": 300
            }
        }).done(function(data) {
            var gresults = data;
            console.log(data);
            // for loop for finding coordinates
            for (var j = 0; j < data.results.length; j++) {
                var coords = data.results[j].geometry.location;
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'images/assault.png',
                });
            }
        });
    }
    for (var i = 0; i < dwiData.length; i++) {

        var geoCodeAddress = dwiData[i].address.split(' ').join('+');

        var resultsAddressURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodeAddress + "+Austin,+TX" + "&key=AIzaSyCQy72evJVRXltDR5di_RYVf5dv6aj5SeY";
        $.ajax({
            url: resultsAddressURL,
            type: "GET",
            data: {
                "$limit": 300
            }
        }).done(function(data) {
            var gresults = data;
            console.log(data);
            // for loop for finding coordinates
            for (var j = 0; j < data.results.length; j++) {
                var coords = data.results[j].geometry.location;
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'images/dwi.png',
                });
            }
        });
    }
})



// Initialize and display a google map
function Init() {
    // Create a Google coordinate object for where to center the map
    var latlngATX = new google.maps.LatLng(30.2672, -97.7431); // Coordinates of Austin, TX (area centroid)

    // Map options for how to display the Google map
    var mapOptions = {
        zoom: 12,
        center: latlngATX
    };

    // Show the Google map in the div with the attribute id 'map-canvas'.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    google.maps.event.addDomListener(window, "resize", function() {
     var center = map.getCenter();
     google.maps.event.trigger(map, "resize");
     map.setCenter(center);
    });

    function geolocationSuccess(position) {
        var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // Write the formatted address
        writeAddressName(userLatLng);

        var myOptions = {
            zoom: 16,
            center: userLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        // Draw the map
        var mapObject = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Place the marker
        new google.maps.Marker({
            map: mapObject,
            position: userLatLng
        });
    }

    function geolocationError(positionError) {
        document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
    }

    function geolocateUser() {
        // If the browser supports the Geolocation API
        if (navigator.geolocation) {
            var positionOptions = {
                enableHighAccuracy: true,
                timeout: 10 * 1000 // 10 seconds
            };
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
        } else
            document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
    }

    $("#locatorIcon").on("click", function() {
        geolocateUser();
    });

}
google.maps.event.addDomListener(window, 'load', initialize);

// Initialize firebase

var config = {
    apiKey: "AIzaSyCrqXg8Tlrap751-MiLRymevQmJErM8K64",
    authDomain: "project-1-database-e557d.firebaseapp.com",
    databaseURL: "https://project-1-database-e557d.firebaseio.com",
    storageBucket: "project-1-database-e557d.appspot.com",
    messagingSenderId: "156136916107"
};
firebase.initializeApp(config);

// Create a variable to reference the database

var database = firebase.database();


$("#bouton").on("click", function() {
    event.preventDefault();

    var first_name = $("#first_name").val().trim();
    var last_name = $("#last_name").val().trim();
    var password = $("#password").val().trim();
    var email = $("#email").val().trim();
    var crime = $("#crime").val().trim();
    $(".validate").val("");

    database.ref().push({
        first_name: first_name,
        last_name: last_name,
        password: password,
        email: email,
        crime: crime
    });


});


database.ref().on("child_added", function(snapshot) {

    var first_name = $("#first_name").val().trim();
    var last_name = $("#last_name").val().trim();
    var password = $("#password").val().trim();
    var email = $("#email").val().trim();
    var crime = $("#crime").val().trim();
    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});