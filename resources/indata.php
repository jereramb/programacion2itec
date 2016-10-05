<?php 

require 'db.inc';

if (isset($_POST['temp']) && isset($_POST['hum'])) 
{
	$temp = $_POST['temp'];
	$hum = $_POST['hum'];

	if (is_numeric($temp) && is_numeric($hum)) 
	{
		$db = new mysqli(SERVER,USER,PASS,DB);
		if ($db->connect_error)
		{
			die('Error al abrir conexion');
		}
		else
		{
			$query = "INSERT INTO datos(temp,hum,time) VALUES ('$temp', '$hum', NOW())";
			if ($db->query($query) === TRUE)
			{
				echo "1: Ok";
			}
			else
			{
				echo "0: Error";
			}
			$db->close();
		}
	}
	else
	{
		echo "0: Error";
	}
}
else
{
	echo "0: Error";
}

?>