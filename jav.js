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
                    "$limit": 5,
                }
            }).done(function(data) {
                console.log(data);
            });

        }
    });
});


<<<<<<< HEAD
		$(document).on(click)

	var map;	// Google map object (global variable)
	
	// Initialize and display a google map
	function Init()
	{
		// Create a Google coordinate object for where to center the map
		var latlngDC = new google.maps.LatLng( 30.2672, -97.7431 );	// Coordinates of Washington, DC (area centroid)
		
		// Map options for how to display the Google map
		var mapOptions = { zoom: 12, center: latlngDC  };
		
		// Show the Google map in the div with the attribute id 'map-canvas'.
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}
=======
var map; // Google map object (global variable)

// Initialize and display a google map
function Init() {
    // Create a Google coordinate object for where to center the map
    var latlngDC = new google.maps.LatLng(30.2672, -97.7431); // Coordinates of Washington, DC (area centroid)

    // Map options for how to display the Google map
    var mapOptions = {
        zoom: 12,
        center: latlngDC
    };

    // Show the Google map in the div with the attribute id 'map-canvas'.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
>>>>>>> edcbef22e99cfd1afd975e37007bcf28fd63caf9
