// Ajax
			$(document).ready(function(){
		    $.ajax({
		        url: "https://data.policefoundation.org/resource/iibt-hvrs.json",
		        type: "GET",
		        data: {
		          "$limit" : 5000,
		          "$$app_token" : "nx6iorDFMna26v0zqNiSfz0ZK"
		        }
		    }).done(function(data){
		    console.log(data);
		    for (var i = 0; i < data.length; i++) {
		    	var address = data[i].address + " Austin, TX";
		    	// Run address through geocoder
		    	var converter = new google.maps.Geocoder;
		    	converter.geocode({address:address},function(res) {
		    		console.log(res);
		    	});

		    }
		    });
		});


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