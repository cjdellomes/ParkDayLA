console.log("This was read")
$(function () {
	$("#park-button").click(function () {
		console.log("I was clicked");
		$.getJSON(
			"https://parking.api.smgov.net/meters/"
						
			).done(function(result){
				console.log(result);
				console.log('Blue Whale'.includes('Blue'))
				console.log(result[0].street_address)
				var searchResult = $("#address").val().toUpperCase();
				outputResult = []
				for (var i = 0; i < result.length; i++) {
					if(result[i].street_address.includes(searchResult)) {
						console.log(result[i].street_address);
						outputResult.push(result[i].street_address);
					}
					
				}
				if(outputResult.length === 0) {
					console.log("There is no meter at this location");
				}
			});
	})
})
