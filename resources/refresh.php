<?php

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
	mostrar();
}
else
{
	header("Location: ../login.php");
}

function mostrar(){
	if(isset($_GET['time']))
	{
		$freq = $_GET['time'];
			
		include 'RefreshClass.php';
		$ins = refresh::getInstance();

		if(strcmp($freq, "perso") == 0)
		{
			if(isset($_GET['tt']) && isset($_GET['tf']))
			{
				$res = $ins->GetData($freq, $_GET['tt'], $_GET['tf']);
				echo $res;
			}
			else
			{
				echo "0: Error";
			}
		}
		else
		{
			$res = $ins->GetData($freq, NULL, NULL);
			echo $res;
		}
	}
	else{
		echo "Nada";
	}
	
}

?>