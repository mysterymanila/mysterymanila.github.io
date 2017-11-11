$(document).on('click', 'a', function () {
	console.log(this.id);
	$('#spanModalTitle').text(this.text);
	bookingId = this.id;

	urlGetBookingHistory = baseURL+"/_ah/api/endpoint/v1/admin/bookings/"+bookingId+"/bid/"+baseToken;
		$.getJSON(urlGetBookingHistory, function(bidHistory){
			var maxcount = bidHistory.count;
			$('#tableModal tr').has('td').remove();
			for (i = 0; i < maxcount; i++) {
				urlFlightLevelProvision = baseURL+"/_ah/api/endpoint/v1/admin/provisions/codes/FLIGHT*"+airlineCode+"*"+flight_id_org+flight_id_des+"*"+flighNumbers.results[i].code+"/"+baseToken;		
				
				
				if(i==maxcount-1){
					lockFile = 1;
				}
			}
	}).error(function() {
		alert("[ERROR] No Flight number for route: "+flight_id_org+" - "+flight_id_des); 
	});	
	

});