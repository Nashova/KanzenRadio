<?php
$ip = "141.0.170.74";
$port = "8010";
$er = null;
$open = fsockopen($ip,$port);
if ($open) {
	fputs($open,"GET /7.html HTTP/1.1\nUser-Agent:Mozilla\n\n");
	$read = fread($open,1000);
	$text = explode("content-type:text/html",$read);
	$text = explode(",",$text[1]);
	$text0 = explode(">",$text[0]);
	$text6 = explode("<",$text[6]);
	$text[0] = $text0[count($text0)-1];
	$text[6] = $text6[0];
}
else {
	$er="Connection Refused!";
}
if ($er) {
	echo $er;
	exit;
}
/**
	0: listeners
	1: state
	3: max listeners
	5: bitrate
	6: song name
*/
echo "$text[0],$text[3],$text[1],$text[5],$text[6]";
?>