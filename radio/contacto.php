	<?	php if (!$HTTP_POST_VARS){	 ?>
	<FORM action="form.php" method=post>
		<!-- Ó action="form.html" Dependiendo la extensión del archivo -->
		NOMBRE:
		<input type="text" name="name" size="36" style="text-align: justify">
		<br>
		<br>
		CORREO:
		<input type="text" name="e-mail" size="36" style="text-align: justify" value="@" >
		<br>
		<br>
		MENSAJE:
		<textarea name="txtmessage" rows="8" cols="72" style="text-align: justify" ></textarea>
		<br>
		<br>
		<center>
			<INPUT TYPE="RESET" NAME="limpiar" VALUE="LIMPIAR">
			<INPUT TYPE="SUBMIT" NAME="enviar" VALUE="ENVIAR"></center>

	</FORM>

	<br>
	<br>

	<? php
}
else{
//Nota. Cuerpo o contenido del mensaje.
$cuerpo = "<br>
	Formulario Recibido
	<br>
	<br>
	\n";
$cuerpo .= "Nombre: " . $HTTP_POST_VARS["name"] . "
	<br>
	\n";
$cuerpo .= "Correo: " . $HTTP_POST_VARS["e-mail"] . "
	<br>
	\n";
$cuerpo .= "Mensaje: " . $HTTP_POST_VARS["txtmessage"] . "
	<br>
	<br>
	\n";

//Nota. Cabeceras para el envío en formato HTML.
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

//Nota. Dirección del remitente.
$headers .= "From: " . $HTTP_POST_VARS["e-mail"] . "\n";

//Nota. Dirección de respuesta.
$headers .= "Reply-To: " . $HTTP_POST_VARS["e-mail"] . "\n";

//Nota. Ruta del mensaje desde origen a destino.
$headers .= "Return-path: " . $HTTP_POST_VARS["e-mail"] . "\n";

//Nota. Funcion Mail de PHP:
// mail( $correoreceptor, $asunto, $mensaje, $cabeceras );
mail("prueba@ejemplo.com.mx","Contacto Desde La Pagina",$cuerpo,$headers);

//Confirmación de envio del mensaje.
echo "Comentarios Enviados Correctamente. En breve nos comunicaremos con usted.";

}

?>
