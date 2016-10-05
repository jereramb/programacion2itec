$(document).ready(function() {
	setInterval(function(){
		var valora = Math.random()*100/25;
		var valorb = Math.random()*100;
		//var _url = '//jeree.hol.es/resources/ap.php';
		var _url = '//127.0.0.1/resources/indata.php';
		//var _data = {v: valora, b:valorb};
		var _data = {temp: valora, hum:valorb};
		$.ajax({
			url: _url,
			type: 'POST',
			dataType: 'json',
			data: _data,
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		
	},5000);
});