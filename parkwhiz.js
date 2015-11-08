$(function () {
	$("#park-button").click(function () {
		$("#parking-info").empty();
		$.getJSON(
			"https://parking.api.smgov.net/meters/"
						
			).done(function(result){
				console.log(result);
				var searchResult = $("#address").val().toUpperCase();
				var untouched = searchResult.slice(0,searchResult.indexOf(","));
				searchResult = searchResult.slice(0,searchResult.indexOf(","));
				addressPrepInt= searchResult.slice(0,5);
				var addressNumber = parseInt(searchResult);
				var modAddressNumber = addressNumber%100;
				if(modAddressNumber < 50) {
					addressNumber = addressNumber - modAddressNumber;
					console.log("addressNumber is " + addressNumber)
				}
				else {
					addressNumber += 100 - modAddressNumber;
					console.log("addressNumber is " + addressNumber)
					console.log("Round up is being called")
				}


				var searchResult = String(addressNumber) + untouched.slice(searchResult.indexOf(" "));
				console.log(searchResult);
				
				
				outputResult = []
				
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

	$("#more-info").click(function () {
		console.log("more-info was clicked");
		$.getJSON(
			"https://parking.api.smgov.net/lots/"
			).done(function(result) {
			console.log(result);
		})
	})
})
