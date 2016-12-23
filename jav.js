// Ajax

$(document).ready(function() {
    $.ajax({
        url: "https://data.policefoundation.org/resource/iibt-hvrs.json",
        type: "GET",
        data: {
            "$limit": 500,
            "$$app_token": "nx6iorDFMna26v0zqNiSfz0ZK"
        }
    }).done(function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var address = data[i].address;
            var geoCodeAddress = address.split(' ').join('+');
            // Run address through geocoder
            var resultsAddressURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoCodeAddress + "+Austin,+TX" + "&key=AIzaSyAe5ZLl9i8S1etqv9W99vMBV4LAW2vkkZI";
            $.ajax({
                url: resultsAddressURL,
                type: "GET",
                data: {
                    "$limit": 500,
                }
            }).done(function(data) {
                var gresults = data;
				// for loop for finding coordinates
					for(var i = 0; i < gresults.results.length; i++){
						// console.log(gresults);
						var coords = gresults.results[i].geometry.location;
						console.log(coords);
						var marker = new google.maps.Marker({
							position: coords,
							map: map
						})

					}
            });

        }
    });
});



var map; // Google map object (global variable)

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
}



	function writeAddressName(latLng) {
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			"location": latLng
		},
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK)
				document.getElementById("address").innerHTML = results[0].formatted_address;
			else
				document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
		});
	}

	function geolocationSuccess(position) {
		var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		// Write the formatted address
		writeAddressName(userLatLng);

		var myOptions = {
			zoom : 16,
			center : userLatLng,
			mapTypeId : google.maps.MapTypeId.ROADMAP
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
		if (navigator.geolocation)
		{
			var positionOptions = {
				enableHighAccuracy: true,
				timeout: 10 * 1000 // 10 seconds
			};
			navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
		}
		else
			document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
	}

	$("#locatorIcon").on("click", function(){
		geolocateUser();
	});
