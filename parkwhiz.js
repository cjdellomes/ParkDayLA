$(function () {
	$("#search-term").click(function () {
		$.getJSON(
			"https://parking.api.smgov.net/meters/"
						
			).done(function(result){
				console.log(result);
			});
	})
})
