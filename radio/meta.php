<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
              <?php
include ("config.php");

if ($scsuccs!=1) {
if($streamstatus == "1"){
if (isset($dj)) {
echo "<b>Oyentes:</b> $currentlisteners&nbsp;&nbsp;&nbsp;<br>
<b>Titulo Actual</b>: $servertitle<br>
<b>Cancion Actual:</b> $song[0]<br>
";

if (isset($address) && $address) {
echo "<b>Canción solicitada de la página</b>: <a href=\"$address\">Link</a>";
}

} else {
echo "<b>A DJ is not currently signed on to the system. Please check again later.</b>";
}
} else {
echo "<b>A DJ is not currently connected to the radio. Please check again later.</b>";
}
} else {
echo "<b>La Radio Esta OFF Ve los Horarios de los DJS para Saber Cuando Trasmiten.</b>";
}
?>

</html>

