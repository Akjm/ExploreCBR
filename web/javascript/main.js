 var datasetsReady = 0;
 var basketballCourts = [];
 var skateParks = [];
 var fitnessSites = [];
 var playgrounds = [];
 var barbeques = [];
 var toilets = [];
 var basketballCourtMarkers = [];
 var skateParkMarkers = [];
 var fitnessSiteMarkers = [];
 var playgroundMarkers = [];
 var barbequeMarkers = [];
 var toiletMarkers = [];
 var map;
 var directionsDisplay;
 var directionsService = new google.maps.DirectionsService();
 var userCurrentLatitude;
 var userCurrentLongitude;

 function applySentenceCase(str) {
 	if (str == undefined) {
 		return str;
 	}
 	return str.replace(/\w\S*/g, function(txt) {
 		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
 	});
 }

 function BasketballCourt(id, area, suburb, latitude, longitude, name) {
 	this.id = id;
 	this.name = name;
 	this.area = area;
 	this.suburb = suburb;
 	this.latitide = latitude;
 	this.longitude = longitude;
 }

 function SkatePark(id, area, suburb, latitude, longitude) {
 	this.id = id;
 	this.area = area;
 	this.suburb = suburb;
 	this.latitide = latitude;
 	this.longitude = longitude;
 }

 function Playground(id, area, suburb, equipment, latitude, longitude) {
 	this.id = id;
 	this.area = area;
 	this.suburb = suburb;
 	this.equipment = equipment;
 	this.latitide = latitude;
 	this.longitude = longitude;
 }

 function Barbeque(id, area, suburb, latitude, longitude) {
 	this.id = id;
 	this.area = area;
 	this.suburb = suburb;
 	this.latitide = latitude;
 	this.longitude = longitude;
 }

 function FitnessSite(id, area, suburb, latitude, longitude, type) {
 	this.id = id;
 	this.area = area;
 	this.suburb = suburb;
 	this.latitide = latitude;
 	this.longitude = longitude;
 	this.type = type;
 }

 function Toilet(id, area, suburb, latitude, longitude) {
 	this.id = id;
 	this.area = area;
 	this.suburb = suburb;
 	this.latitide = latitude;
 	this.longitude = longitude;
 }
 function createRequest() {
 	try {
 		request = new XMLHttpRequest();
 	} catch (tryMS) {
 		try {
 			request = new ActiveXObject("Msxml2.XMLHTTP");
 		} catch (otherMS) {
 			try {
 				request = new ActiveXObject("Microsoft.XMLHTTP");
 			} catch (failed) {
 				request = null;
 			}
 		}
 	}
 	return request;
 }
if (navigator.geolocation) {
 	navigator.geolocation.getCurrentPosition(function(position) {
 		userCurrentLatitude = position.coords.latitude;
 		userCurrentLongitude = position.coords.longitude;
 		datasetsReady++;
 		if (datasetsReady == 8) {
 		    itemsReady();
 		}
 	}, function() {
 		/*handleNoGeolocation(true);*/
 	});
 }
 function startParsing() {
 	$.getJSON("datasets/basketball_courts.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 			var basketballCourt = new BasketballCourt();
 			basketballCourt.id = json[i].id;
 			basketballCourt.area = json[i].location;
 			basketballCourt.suburb = json[i].division;
 			basketballCourt.latitude = json[i].latitude;
 			basketballCourt.longitude = json[i].longitude;
 			basketballCourt.type = "Basketball court";
 			basketballCourts.push(basketballCourt);
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 	$.getJSON("datasets/skate_parks.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 			var skatePark = new SkatePark();
 			skatePark.id = json[i].id;
 			skatePark.area = json[i].location;
 			skatePark.suburb = json[i].division;
 			skatePark.latitude = json[i].latitude;
 			skatePark.longitude = json[i].longitude;
 			skateParks.push(skatePark);
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 	$.getJSON("datasets/playgrounds.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 			var playground = new Playground();
 			playground.id = json[i].asset_id;
 			playground.area = json[i].location;
 			playground.suburb = json[i].division_name;
 			playground.equipment = json[i].equipment;
 			playground.latitude = json[i].latitude;
 			playground.longitude = json[i].longitude;
 			playgrounds.push(playground);
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 	$.getJSON("datasets/barbeques.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 			var barbeque = new Barbeque();
 			barbeque.id = json[i].asset_id;
 			barbeque.name = "Barbeque";
 			barbeque.area = applySentenceCase(json[i].location_description);
 			barbeque.suburb = applySentenceCase(json[i].location);
 			barbeque.latitude = json[i].location_1.latitude;
 			barbeque.longitude = json[i].location_1.longitude;
 			barbeques.push(barbeque);
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 	$.getJSON("datasets/fitness_sites.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 			var fitnessSite = new FitnessSite();
 			fitnessSite.id = json[i].id;
 			fitnessSite.area = json[i].location;
 			fitnessSite.suburb = json[i].division;
 			fitnessSite.latitude = json[i].location_1_2.latitude;
 			fitnessSite.longitude = json[i].location_1_2.longitude;
 			fitnessSite.type = json[i].type;
 			fitnessSites.push(fitnessSite);
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 	$.getJSON("datasets/toilets.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 			var toilet = new Toilet();
 			toilet.id = json[i].asset_id;
 			toilet.area = applySentenceCase(json[i].location_description);
 			toilet.suburb = applySentenceCase(json[i].division_name);
 			toilet.latitude = json[i].latitude;
 			toilet.longitude = json[i].longitude;
 			toilets.push(toilet);
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 	$.getJSON("datasets/gazetted_features.json", function(json) {
 		for (var i = 0; i < json.length; i++) {
 		    if (json[i].name == "TENNIS COURTS" || json[i].name == "TENNIS COURT") {
     			var basketballCourt = new BasketballCourt();
     			basketballCourt.id = json[i].feature_id;
     			basketballCourt.area = applySentenceCase(json[i].division);
     			basketballCourt.suburb = applySentenceCase(json[i].district);
     			basketballCourt.latitude = json[i].latitude;
     			basketballCourt.longitude = json[i].longitude;
     			basketballCourt.type = "Tennis courts";
     			basketballCourts.push(basketballCourt);
 		    }
 		    else if (json[i].name == "SWIMMING POOL" || json[i].name == "OLYMPIC SWIMMING POOL") {
     			var basketballCourt = new BasketballCourt();
     			basketballCourt.id = json[i].feature_id;
     			basketballCourt.area = applySentenceCase(json[i].division);
     			basketballCourt.suburb = applySentenceCase(json[i].district);
     			basketballCourt.latitude = json[i].latitude;
     			basketballCourt.longitude = json[i].longitude;
     			basketballCourt.type = "Swimming pool";
     			basketballCourts.push(basketballCourt);
 		    }
 		    else if ((json[i].name).indexOf("OVAL") >= 0) {
 		        var basketballCourt = new BasketballCourt();
     			basketballCourt.id = json[i].feature_id;
     			basketballCourt.area = applySentenceCase(json[i].division);
     			basketballCourt.suburb = applySentenceCase(json[i].district);
     			basketballCourt.latitude = json[i].latitude;
     			basketballCourt.longitude = json[i].longitude;
     			basketballCourt.type = "Oval";
     			basketballCourts.push(basketballCourt);
 		    }
 		}
 		datasetsReady++;
 		if (datasetsReady == 8) {
 			itemsReady();
 		}
 	});
 }
function itemsReady() {
 	map = new google.maps.Map(document.getElementById('map-canvas'), {
 		zoom: 12,
 		center: {
 			lat: -35.3075,
 			lng: 149.1244
 		}
 	});
 	directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: { strokeColor: "#34495e" } });
 	directionsDisplay.setMap(map);
 	for (var i = 0; i < basketballCourts.length; i++) {
 		var marker = new google.maps.Marker({
 			position: new google.maps.LatLng(basketballCourts[i].latitude, basketballCourts[i].longitude),
 			map: map,
 			title: basketballCourts[i].area
 		});
 		marker.set("data-index", i);
 		marker.setIcon('img/32/basketball.png');
 		google.maps.event.addListener(marker, 'click', function() {
 			console.log("Basketball court in " + basketballCourts[this.get("data-index")].suburb);
 			generateModal(basketballCourts[this.get("data-index")].type, basketballCourts[this.get("data-index")].area + ", " + basketballCourts[this.get("data-index")].suburb, basketballCourts[this.get("data-index")].latitude, basketballCourts[this.get("data-index")].longitude);

 		});
 		basketballCourtMarkers.push(marker);
 	}
 	for (var i = 0; i < skateParks.length; i++) {
 		var marker = new google.maps.Marker({
 			position: new google.maps.LatLng(skateParks[i].latitude, skateParks[i].longitude),
 			map: map,
 			title: skateParks[i].area
 		});
 		marker.set("data-index", i);
 		marker.setIcon('img/32/skate.png');
 		google.maps.event.addListener(marker, 'click', function() {
 			console.log("Skate park in " + skateParks[this.get("data-index")].suburb);
 			generateModal("Skate park", skateParks[this.get("data-index")].area + ", " + skateParks[this.get("data-index")].suburb, skateParks[this.get("data-index")].latitude, skateParks[this.get("data-index")].longitude);
 		});
 		skateParkMarkers.push(marker);
 	}
 	for (var i = 0; i < playgrounds.length; i++) {
 		var marker = new google.maps.Marker({
 			position: new google.maps.LatLng(playgrounds[i].latitude, playgrounds[i].longitude),
 			map: map,
 			title: playgrounds[i].area
 		});
 		marker.set("data-index", i);
 		marker.setIcon('img/32/playground.png');
 		google.maps.event.addListener(marker, 'click', function() {
 			console.log("Playground in " + playgrounds[this.get("data-index")].suburb);
 			generateModal("Playground", playgrounds[this.get("data-index")].area + ", " + playgrounds[this.get("data-index")].suburb + "<br />" + playgrounds[this.get("data-index")].equipment, playgrounds[this.get("data-index")].latitude, playgrounds[this.get("data-index")].longitude);
 		});
 		playgroundMarkers.push(marker);
 	}
 	for (var i = 0; i < barbeques.length; i++) {
 		var marker = new google.maps.Marker({
 			position: new google.maps.LatLng(barbeques[i].latitude, barbeques[i].longitude),
 			map: map,
 			title: barbeques[i].area
 		});
 		marker.set("data-index", i);
 		marker.setIcon('img/32/bbq.png');
 		google.maps.event.addListener(marker, 'click', function() {
 			console.log("Barbeque in " + barbeques[this.get("data-index")].suburb);
 			generateModal(barbeques[this.get("data-index")].name, barbeques[this.get("data-index")].area + ", " + barbeques[this.get("data-index")].suburb, barbeques[this.get("data-index")].latitude, barbeques[this.get("data-index")].longitude);
 		});
 		barbequeMarkers.push(marker);
 	}
 	for (var i = 0; i < fitnessSites.length; i++) {
 		var marker = new google.maps.Marker({
 			position: new google.maps.LatLng(fitnessSites[i].latitude, fitnessSites[i].longitude),
 			map: map,
 			title: fitnessSites[i].area
 		});
 		marker.set("data-index", i);
 		marker.setIcon('img/32/weights.png');
 		google.maps.event.addListener(marker, 'click', function() {
 			console.log("Fitness site in " + fitnessSites[this.get("data-index")].suburb);
 			generateModal(fitnessSites[this.get("data-index")].type, fitnessSites[this.get("data-index")].area + ", " + fitnessSites[this.get("data-index")].suburb, fitnessSites[this.get("data-index")].latitude, fitnessSites[this.get("data-index")].longitude);
 		});
 		fitnessSiteMarkers.push(marker);
 	}
 	for (var i = 0; i < toilets.length; i++) {
 		var marker = new google.maps.Marker({
 			position: new google.maps.LatLng(toilets[i].latitude, toilets[i].longitude),
 			map: map,
 			title: toilets[i].area
 		});
 		marker.set("data-index", i);
 		marker.setIcon('img/32/toilets.png');
 		google.maps.event.addListener(marker, 'click', function() {
 			console.log("Toilet in " + toilets[this.get("data-index")].suburb);
 			generateModal("Toilet", toilets[this.get("data-index")].area + ", " + toilets[this.get("data-index")].suburb, toilets[this.get("data-index")].latitude, toilets[this.get("data-index")].longitude);
 		});
 		toiletMarkers.push(marker);
 	}
 }
 var xmlhttp = createRequest();
 xmlhttp.onreadystatechange = function() {
 	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
 		if (xmlhttp.responseText == "Done!") {
 			startParsing();
 		}
 		else {
 		    console.log(xmlhttp.responseText);
 		}
 	}
 }
 xmlhttp.open("GET", "php_ajax/download_files.php", true);
 xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 xmlhttp.send();
 document.getElementById("map-canvas").style.height = (window.innerHeight - 65) + "px";
 $(window).resize(function() {
 	document.getElementById("map-canvas").style.height = (window.innerHeight - 65) + "px";
 });
 window.addEventListener("orientationchange", function() {
 	document.getElementById("map-canvas").style.height = (window.innerHeight - 65) + "px";
 }, false);
 document.getElementById("barbequeCheckbox").onchange = function() {
 	if (document.getElementById("barbequeCheckbox").checked) {
 		for (var i = 0; i < barbequeMarkers.length; i++) {
 			barbequeMarkers[i].setMap(map);
 		}
 	} else {
 		for (var i = 0; i < barbequeMarkers.length; i++) {
 			barbequeMarkers[i].setMap(null);
 		}
 	}
 };
 document.getElementById("basketballCourtCheckbox").onchange = function() {
 	if (document.getElementById("basketballCourtCheckbox").checked) {
 		for (var i = 0; i < basketballCourtMarkers.length; i++) {
 			basketballCourtMarkers[i].setMap(map);
 		}
 	} else {
 		for (var i = 0; i < basketballCourtMarkers.length; i++) {
 			basketballCourtMarkers[i].setMap(null);
 		}
 	}
 };
 document.getElementById("fitnessSiteCheckbox").onchange = function() {
 	if (document.getElementById("fitnessSiteCheckbox").checked) {
 		for (var i = 0; i < fitnessSiteMarkers.length; i++) {
 			fitnessSiteMarkers[i].setMap(map);
 		}
 	} else {
 		for (var i = 0; i < fitnessSiteMarkers.length; i++) {
 			fitnessSiteMarkers[i].setMap(null);
 		}
 	}
 };
 document.getElementById("playgroundCheckbox").onchange = function() {
 	if (document.getElementById("playgroundCheckbox").checked) {
 		for (var i = 0; i < playgroundMarkers.length; i++) {
 			playgroundMarkers[i].setMap(map);
 		}
 	} else {
 		for (var i = 0; i < playgroundMarkers.length; i++) {
 			playgroundMarkers[i].setMap(null);
 		}
 	}
 };
 document.getElementById("skateParkCheckbox").onchange = function() {
 	if (document.getElementById("skateParkCheckbox").checked) {
 		for (var i = 0; i < skateParkMarkers.length; i++) {
 			skateParkMarkers[i].setMap(map);
 		}
 	} else {
 		for (var i = 0; i < skateParkMarkers.length; i++) {
 			skateParkMarkers[i].setMap(null);
 		}
 	}
 };
 document.getElementById("toiletCheckbox").onchange = function() {
 	if (document.getElementById("toiletCheckbox").checked) {
 		for (var i = 0; i < toiletMarkers.length; i++) {
 			toiletMarkers[i].setMap(map);
 		}
 	} else {
 		for (var i = 0; i < toiletMarkers.length; i++) {
 			toiletMarkers[i].setMap(null);
 		}
 	}
 };

 function getDirections(latitude, longitude, modeOfTravel) {
 	var start = userCurrentLatitude + "," + userCurrentLongitude;
 	var end = latitude + "," + longitude;
 	var request = {
 		origin: start,
 		destination: end,
 		travelMode: modeOfTravel
 	};
 	directionsService.route(request, function(response, status) {
 		if (status == google.maps.DirectionsStatus.OK) {
 			console.log("test");
 			directionsDisplay.setDirections(response);
 		}
 	});

 }

 function suggestion(thing) {
 	if (thing == "exercise") {
 		$('#suggest-modal').modal('hide');
 		console.log(fitnessSites.length);
 		var lowest = 9999999999999;
 		var lowestMarker = null;
 		for (var i = 0; i < fitnessSiteMarkers.length; i++) {
 			if (google.maps.geometry.spherical.computeDistanceBetween(fitnessSiteMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude)) < lowest) {
 				lowest = google.maps.geometry.spherical.computeDistanceBetween(fitnessSiteMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude));
 				lowestMarker = fitnessSiteMarkers[i];
 			}
 		}
 		generateModal(fitnessSites[lowestMarker.get("data-index")].type, fitnessSites[lowestMarker.get("data-index")].area + ", " + fitnessSites[lowestMarker.get("data-index")].suburb, fitnessSites[lowestMarker.get("data-index")].latitude, fitnessSites[lowestMarker.get("data-index")].longitude);
 		map.setZoom(17);
 		map.panTo(lowestMarker.position);
 	} else if (thing == "sport") {
 		$('#suggest-modal').modal('hide');
 		var lowest = 9999999999999;
 		var lowestMarker = null;
 		var lowestType = "";
 		for (var i = 0; i < basketballCourtMarkers.length; i++) {
 			if (google.maps.geometry.spherical.computeDistanceBetween(basketballCourtMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude)) < lowest) {
 				lowest = google.maps.geometry.spherical.computeDistanceBetween(basketballCourtMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude));
 				lowestMarker = basketballCourtMarkers[i];
 				lowestType = "basketball";
 			}
 		}
 		if (lowestType == "basketball") {
 			generateModal(basketballCourts[lowestMarker.get("data-index")].type,  basketballCourts[lowestMarker.get("data-index")].area + ", " + basketballCourts[lowestMarker.get("data-index")].suburb, basketballCourts[lowestMarker.get("data-index")].latitude, basketballCourts[lowestMarker.get("data-index")].longitude);
 		} 
 		map.setZoom(17);
 		map.panTo(lowestMarker.position);
 	} else if (thing == "friends") {
 		$('#suggest-modal').modal('hide');
 		var lowest = 9999999999999;
 		var lowestMarker = null;
 		var lowestType = "";
 		for (var i = 0; i < playgroundMarkers.length; i++) {
 			if (google.maps.geometry.spherical.computeDistanceBetween(playgroundMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude)) < lowest) {
 				lowest = google.maps.geometry.spherical.computeDistanceBetween(playgroundMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude));
 				lowestMarker = playgroundMarkers[i];
 				lowestType = "playground";
 			}
 		}
 		for (var i = 0; i < barbequeMarkers.length; i++) {
 			if (google.maps.geometry.spherical.computeDistanceBetween(barbequeMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude)) < lowest) {
 				lowest = google.maps.geometry.spherical.computeDistanceBetween(barbequeMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude));
 				lowestMarker = barbequeMarkers[i];
 				lowestType = "barbeque";
 			}
 		}
 		 for (var i = 0; i < skateParkMarkers.length; i++) {
 			if (google.maps.geometry.spherical.computeDistanceBetween(skateParkMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude)) < lowest) {
 				lowest = google.maps.geometry.spherical.computeDistanceBetween(skateParkMarkers[i].position, new google.maps.LatLng(userCurrentLatitude, userCurrentLongitude));
 				lowestMarker = skateParkMarkers[i];
 				lowestType = "skatepark";
 			}
 		}
 		if (lowestType == "playground") {
 			generateModal("Playground", playgrounds[lowestMarker.get("data-index")].area + ", " + playgrounds[lowestMarker.get("data-index")].suburb + "<br />" + playgrounds[lowestMarker.get("data-index")].equipment, playgrounds[lowestMarker.get("data-index")].latitude, playgrounds[lowestMarker.get("data-index")].longitude);
 		}else if  (lowestType == "skatepark") {
 			generateModal("Skate park", skateParks[lowestMarker.get("data-index")].area + ", " + skateParks[lowestMarker.get("data-index")].suburb, skateParks[lowestMarker.get("data-index")].latitude, skateParks[lowestMarker.get("data-index")].longitude);
 		} 
 		else {
 			generateModal("Barbeque", barbeques[lowestMarker.get("data-index")].area + ", " + barbeques[lowestMarker.get("data-index")].suburb + "<br />", barbeques[lowestMarker.get("data-index")].latitude, barbeques[lowestMarker.get("data-index")].longitude);
 		}
 		map.setZoom(17);
 		map.panTo(lowestMarker.position);
 	} else {
 		$('#suggest-modal').modal('hide');
 		generateModal("Alice Springs", "The heart of Australia.", -23.7000, 133.8700);
 		map.setZoom(17);
 		map.panTo(new google.maps.LatLng(-23.7000, 133.8700));
 	}
 }