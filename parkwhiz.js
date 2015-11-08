console.log("This was read")
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
				console.log("addressPrepInt is "+addressPrepInt);
				var addressNumber = parseInt(searchResult);
				console.log("The addressNumber is "+addressNumber);
				var modAddressNumber = addressNumber%100;
				console.log("1600 % 100 is " + (1600%100));
				console.log("modAddressNumber is "+modAddressNumber);
				if(modAddressNumber < 50) {
					addressNumber = addressNumber - modAddressNumber;
					console.log("addressNumber is " + addressNumber)
				}
				else {
					addressNumber += 100 - modAddressNumber;
					console.log("addressNumber is " + addressNumber)
					console.log("Round up is being called")
				}

				console.log(addressNumber);

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
})
