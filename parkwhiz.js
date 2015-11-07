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
				for (var i = 0; i < result.length; i++) {
					if(result[i].street_address.includes($("#search-term").val().toUpperCase())) {
						console.log(result[i].street_address);
					}
					
				};
			});
	})
})
