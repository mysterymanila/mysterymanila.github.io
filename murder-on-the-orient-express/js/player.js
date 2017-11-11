var stepped = 0, chunks = 0, rows = 0;
var start, end;
var parser;
var pauseChecked = false;
var printStepChecked = false;
var arrayType = ["GLOBAL","ROUTE","FLIGHT"];
var arrayUploadedRows = [];
$(function()
{
	$('#submit-parse').click(function()
	{
		stepped = 0;
		chunks = 0;
		rows = 0;

		var txt = $('#input').val();
		var localChunkSize = $('#localChunkSize').val();
		var remoteChunkSize = $('#remoteChunkSize').val();
		var files = $('#files')[0].files;
		var config = buildConfig();

		// NOTE: Chunk size does not get reset if changed and then set back to empty/default value
		if (localChunkSize)
			Papa.LocalChunkSize = localChunkSize;
		if (remoteChunkSize)
			Papa.RemoteChunkSize = remoteChunkSize;

		pauseChecked = $('#step-pause').prop('checked');
		
		printStepChecked = $('#print-steps').prop('checked');

		//console.log(files);

		if (files.length > 0)
		{
			if (!$('#stream').prop('checked') && !$('#chunk').prop('checked'))
			{
				for (var i = 0; i < files.length; i++)
				{
					if (files[i].size > 1024 * 1024 * 10)
					{
						alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
						return;
					}
				}
			}
			
			start = performance.now();
			//console.log(files[0].name);
					//console.log(files[0].name.substr(files[0].name.length - 3));
					if(files[0].name.substr(files[0].name.length - 3)!="csv"){
						alert("Please upload a csv file");
						return false;
						
					}
					else{
						$('#files').parse({
						config: config,
						before: function(file, inputElem)
						{
							//console.log("Parsing file:", file);
							
						},
						complete: function()
						{
							console.log("Done with all files.");
						}
					});
		
						
					}
					
		}
		else
		{
			start = performance.now();
			var results = Papa.parse(txt, config);
			console.log("Synchronous parse results:", results);
		}
		return false;
	});

	$('#submit-parse2').click(function()
	{
		stepped = 0;
		chunks = 0;
		rows = 0;

		var txt = $('#input').val();
		var localChunkSize = $('#localChunkSize').val();
		var remoteChunkSize = $('#remoteChunkSize').val();
		var files = $('#files2')[0].files;
		var config = buildConfig2();
		console.log(files);
		// NOTE: Chunk size does not get reset if changed and then set back to empty/default value
		if (localChunkSize)
			Papa.LocalChunkSize = localChunkSize;
		if (remoteChunkSize)
			Papa.RemoteChunkSize = remoteChunkSize;

		pauseChecked = $('#step-pause').prop('checked');
		
		printStepChecked = $('#print-steps').prop('checked');

		//console.log(files);

		if (files.length > 0)
		{
			if (!$('#stream').prop('checked') && !$('#chunk').prop('checked'))
			{
				for (var i = 0; i < files.length; i++)
				{
					if (files[i].size > 1024 * 1024 * 10)
					{
						alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
						return;
					}
				}
			}
			
			start = performance.now();
			//console.log(files[0].name);
					//console.log(files[0].name.substr(files[0].name.length - 3));
					if(files[0].name.substr(files[0].name.length - 3)!="csv"){
						alert("Please upload a csv file");
						return false;
						
					}
					else{
						$('#files2').parse({
						config: config,
						before: function(file, inputElem)
						{
							//console.log("Parsing file:", file);
							
						},
						complete: function()
						{
							console.log("Done with all files.");
						}
					});
		
						
					}
					
		}
		else
		{
			start = performance.now();
			var results = Papa.parse(txt, config);

			console.log("Synchronous parse results:", results);
		}
		return false;
	});

	$('#submit-unparse').click(function()
	{
		var input = $('#input').val();
		var delim = $('#delimiter').val();

		var results = Papa.unparse(input, {
			delimiter: delim
		});

		console.log("Unparse complete!");
		console.log("--------------------------------------");
		console.log(results);
		console.log("--------------------------------------");
	});

	$('#insert-tab').click(function()
	{
		$('#delimiter').val('\t');
	});
});



function buildConfig()
{
	return {
		delimiter: $('#delimiter').val(),
		newline: getLineEnding(),
		header: true,
		dynamicTyping: $('#dynamicTyping').prop('checked'),
		preview: parseInt($('#preview').val() || 0),
		step: $('#stream').prop('checked') ? stepFn : undefined,
		encoding: $('#encoding').val(),
		worker: $('#worker').prop('checked'),
		comments: $('#comments').val(),
		complete: completeFn,
		error: errorFn,
		download: $('#download').prop('checked'),
		fastMode: $('#fastmode').prop('checked'),
		skipEmptyLines: true,
		chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
		beforeFirstChunk: undefined,
	};

	function getLineEnding()
	{
		if ($('#newline-n').is(':checked'))
			return "\n";
		else if ($('#newline-r').is(':checked'))
			return "\r";
		else if ($('#newline-rn').is(':checked'))
			return "\r\n";
		else
			return "";
	}
}

function buildConfig2()
{
	return {
		delimiter: $('#delimiter').val(),
		newline: getLineEnding(),
		header: true,
		dynamicTyping: $('#dynamicTyping').prop('checked'),
		preview: parseInt($('#preview').val() || 0),
		step: $('#stream').prop('checked') ? stepFn : undefined,
		encoding: $('#encoding').val(),
		worker: $('#worker').prop('checked'),
		comments: $('#comments').val(),
		complete: completeFn2,
		error: errorFn,
		download: $('#download').prop('checked'),
		fastMode: $('#fastmode').prop('checked'),
		skipEmptyLines: true,
		chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
		beforeFirstChunk: undefined,
	};

	function getLineEnding()
	{
		if ($('#newline-n').is(':checked'))
			return "\n";
		else if ($('#newline-r').is(':checked'))
			return "\r";
		else if ($('#newline-rn').is(':checked'))
			return "\r\n";
		else
			return "";
	}
}

function stepFn(results, parserHandle)
{
	stepped++;
	rows += results.data.length;

	parser = parserHandle;
	
	if (pauseChecked)
	{
		console.log(results, results.data[0]);
		parserHandle.pause();
		return;
	}
	
	if (printStepChecked)
		console.log(results, results.data[0]);
}

function chunkFn(results, streamer, file)
{
	if (!results)
		return;
	chunks++;
	rows += results.data.length;

	parser = streamer;

	if (printStepChecked)
		console.log("Chunk data:", results.data.length, results);

	if (pauseChecked)
	{
		console.log("Pausing; " + results.data.length + " rows in chunk; file:", file);
		streamer.pause();
		return;
	}
}

function errorFn(error, file)
{
	console.log("ERROR:", error, file);
}

function completeFn()
{
	end = performance.now();
	//console.log(end)
	if (!$('#stream').prop('checked')
			&& !$('#chunk').prop('checked')
			&& arguments[0]
			&& arguments[0].data)
	rows = arguments[0].data.length;
	var tempArguments = arguments[0].data;
	console.log(tempArguments);	
	for(i=3;i<rows;i++){
		console.log(arguments[0].data[i]);
		//console.log("Type for this row ("+i+")is "+tempArguments[i].type)
		
		arrayUploadedRows.push({"type":tempArguments[i].type,"origin":tempArguments[i].origin,"destination":tempArguments[i].destination,"flightNumber":tempArguments[i].flightNumber,"annualFlightLimit":tempArguments[i].annualFlightLimit,"baggageOption":tempArguments[i].baggageOption,"capeAvailabilityLimit":tempArguments[i].capeAvailabilityLimit,"chanceToFlyLimit":tempArguments[i].chanceToFlyLimit,"confirmationLeadTimeInHours":tempArguments[i].confirmationLeadTimeInHours,"loadFactoryCriteriaLimit":tempArguments[i].loadFactoryCriteriaLimit,"purchaseTimeControlStartInHours":tempArguments[i].purchaseTimeControlStartInHours,"purchaseTimeControllerEndinHours":tempArguments[i].purchaseTimeControllerEndinHours,"disabled":tempArguments[i].disabled,"status":tempArguments[i].status})
		
		
		
	}
	
	
	for(i=0;i<arrayUploadedRows.length;i++){
		var tempArguments = arrayUploadedRows;		
		urlEndPoint2 = baseURL+"/_ah/api/endpoint/v1/admin/provisions/codes/"+tempArguments[i].type+"*"+airlineCode+"*"+tempArguments[i].origin+tempArguments[i].destination+"*"+tempArguments[i].flightNumber+"/"+baseToken;
		(function(i) { // protects i in an immediately called function
			
		 
		
		
		
		$.getJSON(urlEndPoint2,function(data){
			type=tempArguments[i].type.toUpperCase();
			origin=tempArguments[i].origin.toUpperCase();
			destination = tempArguments[i].destination.toUpperCase();
			flightNumber = tempArguments[i].flightNumber.toUpperCase();
			annualFlightLimit = parseInt(tempArguments[i].annualFlightLimit);
			baggageOption = parseInt(tempArguments[i].baggageOption);
			capeAvailabilityLimit = parseInt(tempArguments[i].capeAvailabilityLimit);
			chanceToFlyLimit = parseInt(tempArguments[i].chanceToFlyLimit);
			confirmationLeadTimeInHours = parseInt(tempArguments[i].confirmationLeadTimeInHours);
			loadFactoryCriteriaLimit = parseInt(tempArguments[i].loadFactoryCriteriaLimit);
			purchaseTimeControlStartInHours = parseInt(tempArguments[i].purchaseTimeControlStartInHours);
			purchaseTimeControlEndInHours = parseInt(tempArguments[i].purchaseTimeControllerEndinHours);
			disabled = tempArguments[i].disabled.toLowerCase();
			status = tempArguments[i].status.toUpperCase();	
			baggageOption = tempArguments[i].baggageOption;
			var settings = {
					"async": true,
					"url": baseURL+"/_ah/api/endpoint/v1/admin/provisions/"+baseToken,
					"method": "PUT",
					"headers": {
						"content-type": "application/json",
						"cache-control": "no-cache",
						"postman-token": "fc38416f-adf0-306f-3ec4-a29810811bc7"
					},
					"processData": false,
					"data": "{\n \"provisionId\": \""+data.provisionId+"\",\n  \"annualFlightLimit\": 10,\n  \"baggageOption\": "+parseInt(baggageOption)+",\n  \"capeAvailabilityLimit\": "+parseInt(capeAvailabilityLimit)+",\n  \"chanceToFlyLimit\": "+parseInt(chanceToFlyLimit)+",\n  \"confirmationLeadTimeInHours\": "+parseInt(confirmationLeadTimeInHours)+",\n  \"loadFactoryCriteriaLimit\": "+parseInt(loadFactoryCriteriaLimit)+",\n  \"purchaseTimeControlEndInHours\": "+parseInt(purchaseTimeControlEndInHours)+",\n  \"purchaseTimeControlStartInHours\": "+parseInt(purchaseTimeControlStartInHours)+",\n  \"disabled\": "+disabled+",\n  \"status\": \""+status+"\"\n}"
				}
				console.log(settings.data);
				$.ajax(settings).done(function (response) {
					console.log(response);
					if(response.type=="GLOBAL"){
						alert("[SUCCESS] Update for  GLOBAL")	 
					  }
					  else if(response.type=="ROUTE"){
						alert("[SUCCESS] Update for  ROUTE: [ "+origin+destination+" ]")	
					  }
					  else {
						alert("[SUCCESS] Update for  FLIGHT LEVEL: [ "+origin+destination+" -- "+flightNumber+" ]")	
					  }		
				});
			
		}).error(function(data) {
			type=tempArguments[i].type.toUpperCase();
			origin=tempArguments[i].origin.toUpperCase();
			destination = tempArguments[i].destination.toUpperCase();
			flightNumber = tempArguments[i].flightNumber.toUpperCase();
			annualFlightLimit = parseInt(tempArguments[i].annualFlightLimit);
			baggageOption = parseInt(tempArguments[i].baggageOption);
			capeAvailabilityLimit = parseInt(tempArguments[i].capeAvailabilityLimit);
			chanceToFlyLimit = parseInt(tempArguments[i].chanceToFlyLimit);
			confirmationLeadTimeInHours = parseInt(tempArguments[i].confirmationLeadTimeInHours);
			loadFactoryCriteriaLimit = parseInt(tempArguments[i].loadFactoryCriteriaLimit);
			purchaseTimeControlStartInHours = parseInt(tempArguments[i].purchaseTimeControlStartInHours);
			purchaseTimeControlEndInHours = parseInt(tempArguments[i].purchaseTimeControllerEndinHours);
			disabled = tempArguments[i].disabled.toLowerCase();
			status = tempArguments[i].status.toUpperCase();	
			
			baggageOption = tempArguments[i].baggageOption;
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://staging-mycape-webservice.appspot.com/_ah/api/endpoint/v1/admin/provisions/tokenToNgAnonymousCapeWagKaNaPumalagTokaNaTo%2112518237jajsdiajdijioj9128391248hajkhasjkdkajshd",
					"method": "POST",
					"headers": {
					"content-type": "application/json",
					"cache-control": "no-cache",
					"postman-token": "9084acb9-0523-ce13-7ea2-fbe317607bfc"
					},
					"processData": false,
					"data": "{\n  \"airlineCode\": \""+airlineCode+"\",\n  \"type\": \""+type+"\",\n  \"route\": \""+origin+destination+"\",\n  \"flightNumber\": \""+flightNumber+"\",\n \"annualFlightLimit\": 10,\n  \"baggageOption\": "+parseInt(baggageOption)+",\n  \"capeAvailabilityLimit\": "+parseInt(capeAvailabilityLimit)+",\n  \"chanceToFlyLimit\": "+parseInt(chanceToFlyLimit)+",\n  \"confirmationLeadTimeInHours\": "+parseInt(confirmationLeadTimeInHours)+",\n  \"loadFactoryCriteriaLimit\": "+parseInt(loadFactoryCriteriaLimit)+",\n  \"purchaseTimeControlEndInHours\": "+parseInt(purchaseTimeControlEndInHours)+",\n  \"purchaseTimeControlStartInHours\": "+parseInt(purchaseTimeControlStartInHours)+",\n  \"disabled\": "+disabled+",\n  \"status\": \""+status+"\"\n}"
			  }
			  console.log(settings.data);
			  $.ajax(settings).done(function (response) {
				  console.log(response)
				  if(response.type=="GLOBAL"){
					alert("[NEW PROVISION][SUCCESS] for  GLOBAL")	 
				  }
				  else if(response.type=="ROUTE"){
					alert("[NEW PROVISION][SUCCESS] for  ROUTE: [ "+origin+destination+" ]")	
				  }
				  else {
					alert("[NEW PROVISION][SUCCESS] for  ROUTE: [ "+origin+destination+" ]"+" Flight Number: [ "+flightNumber+" ]")	
				  }
				
			  });

		});//end ERROR
	})(i);	
	
			
	}	
	//console.log("Finished input (async). Time:", end-start);	
	//console.log("Rows:", rows, "Stepped:", stepped, "Chunks:", chunks);
}//end completeFN Function


function completeFn2()
{
	end = performance.now();
	//console.log(end)
	if (!$('#stream').prop('checked')
			&& !$('#chunk').prop('checked')
			&& arguments[0]
			&& arguments[0].data)
	rows = arguments[0].data.length;
	var tempArguments = arguments[0].data;
	console.log(tempArguments);	
	for(i=0;i<rows;i++){
		console.log(tempArguments[i]);
		code=airlineCode+"*"+tempArguments[i].route+"*"+tempArguments[i].flightNumber;
		urlEndPoint2 = baseURL+"/_ah/api/endpoint/v1/admin/provisions/codes/"+code+"/"+baseToken;
				
		arrayUploadedRows.push({"route":tempArguments[i].route,"flightNumber":tempArguments[i].flightNumber,"status":tempArguments[i].status, "code":code})
		
		//console.log(i + " -- "+ rows);
		
			
			
	}
	for(i=0;i<arrayUploadedRows.length;i++){
		var tempArguments = arrayUploadedRows;
		console.log("------------------");
		//console.log(tempArguments[i]);
		
		urlEndPoint2 = baseURL+"/_ah/api/endpoint/v1/admin/flights/flightnumbers/"+tempArguments[i].code+"/"+baseToken;
		(function(i) { // protects i in an immediately called function
		$.getJSON(urlEndPoint2,function(data){
			route=tempArguments[i].route.toUpperCase();			
			flightNumber = tempArguments[i].flightNumber;
			status = tempArguments[i].status.toUpperCase();	
			code = tempArguments[i].code.toUpperCase();	
				
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://staging-mycape-webservice.appspot.com/_ah/api/endpoint/v1/admin/flights/flightnumbers/tokenToNgAnonymousCapeWagKaNaPumalagTokaNaTo%2112518237jajsdiajdijioj9128391248hajkhasjkdkajshd",
				"method": "POST",
				"headers": {
				  "content-type": "application/json",
				  "cache-control": "no-cache",
				  "postman-token": "ae9410ff-ecdc-8dbd-c22e-634e01a8fcfd"
				},
				"processData": false,
				"data": "{\n  \"code\": \""+code+"\",\n \"number\": \""+flightNumber+"\",\n  \"airlineCode\": \""+airlineCode+"\",\n  \"route\": \""+route+"\",\n  \"status\":\""+status+"\"\n}"
			}
			
			$.ajax(settings).done(function (response) {
				console.log(response)
				alert("[SUCCESS] Flight Number: "+ respoonse.flightNumber + " Updated")
			}).error(function(error) {
				console.log(error.responseJSON.error.message);
				alert("[ERROR] --- Flight Number: "+flightNumber + " ")
			});
			
		}).error(function(data) {
			route=tempArguments[i].route.toUpperCase();			
			flightNumber = tempArguments[i].flightNumber.toUpperCase();
			status = tempArguments[i].status.toUpperCase();	
			code = tempArguments[i].code.toUpperCase();	
			
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://staging-mycape-webservice.appspot.com/_ah/api/endpoint/v1/admin/flights/flightnumbers/tokenToNgAnonymousCapeWagKaNaPumalagTokaNaTo%2112518237jajsdiajdijioj9128391248hajkhasjkdkajshd",
				"method": "POST",
				//"success": callbackTest(),
				"headers": {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "2c327df7-04bc-3eec-db63-ce56f69d1283"
				},
				"processData": false,
				"data": "{\n  \"number\": \""+flightNumber+"\",\n  \"airlineCode\": \""+airlineCode+"\",\n  \"route\": \""+route+"\",\n  \"status\":\""+status+"\"\n}"
			}
			
			$.ajax(settings).done(function (response) {		
				alert("[SUCCESS] Flight level creation succesful for: " + response.flightNumber)
			}).error(function() {
				
			});

		});//end ERROR
	})(i);	
	
			
	}	
	
		
}
function callbackTest(){
	alert ("chuck");
}
function uploadProvisions(type,origin,destination,flightNumber,annualFlightLimit,baggageOption,capeAvailabilityLimit,chanceToFlyLimit,confirmationLeadTimeInHours,loadFactoryCriteriaLimit,purchaseTimeControllerStartinHours,purchaseTimeControllerEndinHours,disabled,status){
	
	if(jQuery.inArray(type, arrayType)){
		console.log("-----",type);
	}
	else{
		console.log(type+" --- type is not in array");
	}
	
}