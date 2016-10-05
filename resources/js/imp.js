window.onload = function(){
	var elem = document.getElementById("idcanvas");
	var contexto = cargaContextoCanvas(elem);

	var width = $("#canvas").width();
	var height = $("#canvas").height();

	var timest = "hour";

	elem.width = width-10;
	elem.height = height-5;

	var bar = new mainBar();

	bar.SetParameters(width,height,elem);

	bar.drawReferer();
	var timeInt = 15000;
	var ai;
	getTime();
	function getTime(){
		$.ajax({
			type: "GET",
			url: "/resources/timerefresh.php",
			timeout: 15000,
			success: function(data,status){
				timeInt = data*1000;
				$("#spin").val(data);
				ai = setInterval(actualiza,timeInt);
			}
		});
	}

	actualiza();

	function actualiza(){
		var data;
		if(timest == "perso"){
			var tto = $("#datepicker").val();
			var tfo = $("#datepickert").val();
			data = {time:timest, tt:tto, tf:tfo};
		}
		else{
			data = {time:timest};
		}
		$.ajax({
			type: "GET",
			url: "/resources/refresh.php",
			data: data,
			dataType: "json",
			timeout: 15000,
			success: function(data,status){
				bar.delShape();
				into(data);
			}
		});
	}	

	$("#datepickerb").on('click', function(event) {
		event.preventDefault();
		actualiza();
	});

	function into(ob){
		/*for (var i = 0; i < ob.dato.length; i++) {
			bar.newShape(ob.dato[i].temp,ob.dato[i].hum,ob.dato[i].fecha);
		};*/
		for (var i = 0; i < ob.length; i++) {
			var row = ob[i];
			bar.newShape(row[1],row[2],row[3]);
		};
		bar.refresh();
	}

	$("#fechaop").selectmenu({
		change: function( event, data ) {
		timest = data.item.value;
		if(timest == 'perso'){
			$(".timepicker").css('display', 'inline-block');
			clearInterval(ai);
		}
		else{
			$(".timepicker").css('display', 'none');
			clearInterval(ai);
			ai = setInterval(actualiza,timeInt);
			actualiza();
		}
	}
	});

	$("#spin").spinner({
		min: 10,
		max: 1800,
	});
	$(".optionCont").buttonset();

	$("#datepicker").datepicker({
		autoSize: true,
		dateFormat: "yy-mm-dd",
		defaultDate: "+0w",
		selectOtherMonths: true,
		showOtherMonths: true,
		showAnim: "slideDown",
		onClose: function( selectedDate ) {
		$( "#datepickert" ).datepicker( "option", "minDate", selectedDate );
		}
	});

	$("#datepickert").datepicker({
		autoSize: true,
		dateFormat: "yy-mm-dd",
		defaultDate: "+0w",
		selectOtherMonths: true,
		showOtherMonths: true,
		showAnim: "slideDown",
		onClose: function( selectedDate ) {
		$( "#datepicker" ).datepicker( "option", "maxDate", selectedDate );
		}
	});

	$(".config").on('click', function(event) {
		event.preventDefault();
		var wo = (($("#backAround").height())-200)/2;
		$(".cuadro").css('margin-top', wo);
		$("#backAround").slideDown(800, function() {

		});
	});

	$("#cancelPref").on('click', function(event) {
		event.preventDefault();
		$("#backAround").slideUp(800, function() {});
	});

	$("#okPref").on('click', function(event) {
		event.preventDefault();
		var timePref = $("#spin").val();
		var cd = $("#pref").data('crsftoken');
		var data = {time:timePref, crsf:cd};

		$.ajax({
			type: "POST",
			url: "/resources/preferences.php",
			data: data,
			timeout: 15000,
			beforeSend: function(){
				$("#backAround").slideUp(800, function() {});
			},
			success: function(data,status){
				var aRes = data.charAt(0);
				if(aRes == 0){
					var cr = data.substr(2);
					$("#pref").data('crsftoken', cr);
					clearInterval(ai);
					timeInt = ($("#spin").val())*1000;
					ai = setInterval(actualiza,timeInt);
				}
				else{
					var l = $(window).width();
					$("#dnt").css("left", ((l-400)/2));
					$("#dnt").slideDown("fast", function() {
					});
					setTimeout(function(){
							$("#dnt").slideUp("fast");
					},4000);
				}
			}
		});
	});

	$("#temp").change(function(event) {
		var a = $("#temp").prop("checked");
		bar.setDrawTemp(a);
		bar.delPoint();
		bar.refresh();
	});

	$("#hum").change(function(event) {
		var a = $("#hum").prop("checked");
		bar.setDrawHum(a);
		bar.delPoint();
		bar.refresh();
	});

	//eventos del raton
	$('#canvas').mousedown(function(e) {
		//se capturan coordenas del mouse
		mouseX = e.pageX;
		mouseY = e.pageY;
		var as = bar.mouseDown(mouseX,mouseY-92);
		bar.delPoint();
		bar.refresh();
		if(as==0){
			var tid = bar.getSelected();
			var tfecha = bar.getDay(tid);
			var ttemp = bar.getTemp(tid);
			var thum = bar.getHum(tid);
			$(".view1").html('Fecha: '+tfecha);
			$(".view2").html('Humedad: '+thum+' %');
			$(".view3").html('Temperatura: '+ttemp+' °C');
			$("#viewInfo").css('display', 'block');
		}
		else{
			$("#viewInfo").css('display', 'none');
		}
    });
}

function cargaContextoCanvas(idCanvas){
   var elemento = idCanvas;
   if(elemento && elemento.getContext){
      var contexto = elemento.getContext('2d');
      if(contexto){
         return contexto;
      }
   }
   return false;
}
