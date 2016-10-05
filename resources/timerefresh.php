<?php

require 'db.inc';

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

if($islog)
{
	$user = $_SESSION['username'];
	$db = new mysqli(SERVER,USER,PASS,DB);

	if ($db->connect_error) {
		die('Error al abrir conexion');
	}
	else {
    	$query = 'SELECT * FROM usuarios WHERE nombre="'.$user.'"';

    	if ($resultado = $db->query($query)) {

    		while ($fila = $resultado->fetch_row()) {
                echo $fila[3];
            }

    		/* liberar el conjunto de resultados */
    		$resultado->close();
    	}
	}

	$db->close();
}
else
{
   header("Location: ../login.php");
}

?>