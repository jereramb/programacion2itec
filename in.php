<?php

require 'resources/db.inc';

session_start();

$islog;

if(isset($_SESSION['login']))
{
	$islog = $_SESSION['login'];
}
else
{
	$islog = false;
}

if (!$islog)
{
	$pass;
	$user;

	if (isset($_POST['user']) && isset($_POST['password'])) {
		$user = $_POST['user'];
		$pass = $_POST['password'];
	}
	else {
		echo "0: Datos erroneos.";
		return;
	}

	$pass = md5($pass);
	
	$db = new mysqli(SERVER,USER,PASS,DB);

	if ($db->connect_error) {
		die('Error al abrir conexion');
	}
	else {
		$count = 0;

    	$query = 'SELECT * FROM usuarios WHERE nombre="'.$user.'" and pass="'.$pass.'"';

    	if ($resultado = $db->query($query)) {
    		$count = $resultado->num_rows;

    		/* liberar el conjunto de resultados */
    		$resultado->close();
    	}

    	if($count == 1)
    	{
    		$_SESSION['login'] = true;
    		$_SESSION['username'] = $user;
	        echo "1: true";
	    }
	    else
	    {
        	echo "0: Datos erroneos. ".$count;
    	} 
	}

	$db->close();
}
else
{
	header("Location: index.php");
}

?>