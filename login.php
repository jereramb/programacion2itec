<?php

session_start();

if(isset($_SESSION['login']))
{
	header("Location: index.php");
}
else
{
	echo '<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Iniciar sesión</title>
	<link rel="stylesheet" type="text/css" href="resources/css/stylesl.css">
	<script type="text/javascript" src="resources/jquery/jquery-2.1.1.min.js"></script>
	<script type="text/javascript">
	window.onload = function(){
		function login(){
		var vuser = document.getElementById("user_login").value;
		var vpass = document.getElementById("pass_login").value;
		var data = { user:vuser, password:vpass};
		$.ajax({
			type: "POST",
			url: "in.php",
			data: data,
			timeout: 15000,
			beforeSend: function(){
				$("#blogin").css("visibility", "visible");
			},
			success: function(data,status){
				$("#blogin").css("visibility", "hidden");
				var st = data.charAt(0);
				if((st == "1")||(st == 1))
				{
					window.location="index.php";
				}
				else
				{
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
	}

	$(document).keypress(function(e){
      /*e.preventDefault();*/
      if(e.which == 13){
      	login();
      }
   });

	$("#submitlogin").on("click",login);

	};
	</script>
</head>
<body>
<div id="dnt">Combinación de nombre de usuario y contraseña errónea.</div>
<div id="login">
	<div id="formlogin">
		<div class="box">
			Nombre de usuario
			<br/>
			<input id="user_login" class="input" type="text" name="user_login">
		</div>
		<div class="box">
			Contraseña
			<br/>
			<input id="pass_login" class="input" type="password" name="pass_login">
		</div>
		<span class="fl text"><a href="">¿Olvidaste tu contraseña?</a></span>		
		<input id="submitlogin" class="fr" type="submit" value="Acceder">
	</div>
</div>
<div id="blogin"></div>
</body>
</html>';
}

?>