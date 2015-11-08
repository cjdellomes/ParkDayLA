console.log("This was read")
$(function () {
	$("#park-button").click(function () {
		$("#parking-info").empty();
		$.getJSON(
			"https://parking.api.smgov.net/meters/"
						
			).done(function(result){
				console.log(result);
				var searchResult = $("#address").val().toUpperCase();
				outputResult = []
				searchResult = searchResult.slice(0,searchResult.indexOf(","));
				var isMetered;
				for (var i = 0; i < result.length; i++) {
					if(result[i].street_address.includes(searchResult)) {
						console.log(result[i].street_address);
						outputResult.push(result[i].street_address);
					}
					
				}
				if(outputResult.length === 0) {
					isMetered = "Not metered";
				}
				else {
					isMetered = "Metered";
				}
				$("#parking-info").append("<h4>Street Parking:</h4>" +
											isMetered)
			});
	})
})
