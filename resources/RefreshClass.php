<?php

/*
Clase Refresh
Actualiza los datos del cliente
*/

class refresh
{
	private static $_instance;
	private $_insDB;

	private function __construct()
	{
		require 'db.inc';
		$this->_insDB = new mysqli(SERVER,USER,PASS,DB);
	}

	public function GetData($tipo, $inicio, $final)
	{
		$resultado;

		switch ($tipo)
		{
			case 'hour':
				$resultado = $this->ObtenerDatos("1 HOUR");
				break;
			case 'thour':
				$resultado = $this->ObtenerDatos('12 HOUR');
				break;
			case 'day':
				$resultado = $this->ObtenerDatos('1 DAY');
				break;
			case 'week':
				$resultado = $this->ObtenerDatos('1 WEEK');
				break;
			case 'month':
				$resultado = $this->ObtenerDatos('1 MONTH');
				break;
			case 'year':
				$resultado = $this->ObtenerDatos('1 YEAR');
				break;
			case 'perso':
				$resultado = $this->perso($inicio, $final);
				break;
			default:
				$resultado = $this->ObtenerDatos("1 HOUR");
				break;
		}

		return $resultado;
	}

	private function ObtenerDatos ($interval)
	{
		$query = 'SELECT * FROM datos WHERE DATE_SUB(CURDATE(),INTERVAL '.$interval.') <= time';
		$buf = $this->_insDB->query($query);

		if (!$buf)
		{
			echo "Ocurrio un error";
			exit();
		}

		while ($row = $buf->fetch_row())
		{
			$rows[] = $row;
		}

		$this->_insDB->close();

		return json_encode($rows);
	}

	private function perso($inicio, $final){
		$query = 'SELECT * FROM datos WHERE time BETWEEN '."'".$inicio."'".' AND '."'".$final."'";
		$buf = $this->_insDB->query($query);

		if (!$buf)
		{
			echo "Ocurrio un error";
			exit();
		}

		while ($row = $buf->fetch_row())
		{
			$rows[] = $row;
		}

		$this->_insDB->close();

		return json_encode($rows);
	}

	/* Evitamos el clonaje del objeto. Patrón Singleton */
	private function __clone(){ }

	/* Función encargada de crear, si es necesario, el objeto. Esta es la función que debemos llamar desde fuera de la clase para instanciar el objeto, y así, poder utilizar sus métodos */
	public static function getInstance()
	{
		if (!(self::$_instance instanceof self))
		{
			self::$_instance=new self();
		}
		return self::$_instance;
	}

}/* Fin de la clase */

?>