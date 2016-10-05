<?php 

session_start();

if (isset($_SESSION['login']))
{
	$user = $_SESSION['username'];
	//$token = $_SESSION['crsftoken'];
	$token = "sa";
	echo '<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
		<link rel="stylesheet" type="text/css" href="resources/css/styles.css">
		<script type="text/javascript" src="resources/jquery/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="resources/js/mainBar.js"></script>
		<script type="text/javascript" src="resources/js/imp.js"></script>
		<link rel="stylesheet" href="resources/jquery/jquery-ui.css">
		<script src="resources/jquery/jquery-ui.js"></script>
	</head>
	<body>
	<div id="dnt">Hubo un error, vuelve a intentarlo.</div>
	<div id="header">
		<a href=""><div id="logo" class="fl"><span class="mdle">Arduino Control</span></div></a>
		<div id="nav_user" class="fr">
			<div id="nameuser" class="mdle">'.$user.'</div>
			<a href="javascript:void(0)"><div class="config"></div></a>
			<a href="out.php"><div id="logout" title="Cerrar sesion"></div></a>
		</div>
	</div>
	<div id="pref" data-crsftoken="'.$token.'">
		<div id="fecha">
			<select name="fecha" id="fechaop">
				<option value="hour">1 hora</option>
				<option value="thour">12 horas</option>
				<option value="day">1 día</option>
				<option value="week">1 semana</option>
				<option value="month">1 mes</option>
				<option value="year">1 año</option>
				<option value="perso">Personalizado</option>
			</select>
		</div>
		<div class="optionCont">
			<input type="checkbox" name="temp" id="temp" checked="checked"><label for="temp">Temperatura</label>
			<input type="checkbox" name="temp" id="hum" checked="checked"><label for="hum">Humedad</label>
		</div>
		<div class="timepicker">
			Desde:
			<input type="text" id="datepicker" class="datepicker">
			Hasta:
			<input type="text" id="datepickert" class="datepicker">
			<input type="submit" id="datepickerb" class="datepicker" value="Buscar">
		</div>
		<div id="viewInfo" class="fr">
			<div class="viewInfo view1"></div>
			<div class="viewInfo view2"></div>
			<div class="viewInfo view3"></div>
		</div>
	</div>
	<div id="canvas">
		<canvas id="idcanvas" width="100" height="100"><b>Tu navegador no soporta canvas, actualizalo o instala un navegador compatible.</b></canvas>
	</div>
	<div id="backAround">
		<div class="cuadro">
			<div class="incuadro">
				<span class="text">
					Velocidad de actualización (en segundos):
				</span>
				<input id="spin" width="20" value="15">
				<div class="inputPref fr">
					<input type="submit" value="Cancelar" class="buton-normal" id="cancelPref">
					<input type="submit" value="Aceptar" class="buton-normal" id="okPref">
				</div>
			</div>
		</div>
	</div>
	</body>
	</html>';
}
else
{
	header("Location: login.php");
}

?>