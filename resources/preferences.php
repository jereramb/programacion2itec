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
	if (isset($_POST['time']))
	{
		if (is_numeric($_POST['time']))
		{
			$user = $_SESSION['username'];
			$db = new mysqli(SERVER,USER,PASS,DB);
			$time = $_POST['time'];

			if ($db->connect_error)
			{
				die('Error al abrir conexion');
			}
			else
			{
		    	$query = 'UPDATE `usuarios` SET `timerefresh`='.$time.' WHERE `nombre`="'.$_SESSION['username'].'"';

		    	if ($db->query($query) === TRUE)
		    	{
					echo '0: Ok';
		    	}
				else
				{
					echo '1: Hubo un error';
				}
			}

			$db->close();
		}
		else
		{
			echo '1: Hubo un error';
		}
	}
	else
	{
		echo '1: Hubo un error';
	}
}
else
{
   header("Location: ../login.php");
}

?>