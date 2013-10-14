<?php
$ip = "141.0.170.74";
$port = "8010";

$open = fsockopen($ip,$port);
if ($open) {
	fputs($open,"GET /7.html HTTP/1.1\nUser-Agent:Mozilla\n\n");
	$read = fread($open,1000);
	$text = explode("content-type:text/html",$read);
	$text = explode(",",$text[1]);
	$text0 = explode(">",$text[0]);
	$text6 = explode("<",$text[6]);
	$text[0] = $text0[4];
	$text[6] = $text6[0];
} 
else { 
	$er="Connection Refused!"; 
}
//if ($text[1]==1) { $state = "Up"; } else { $state = "Down"; }
if ($er) { 
	echo $er; 
	exit; 
}
/*echo "<font face=verdana size=1>
Listeners: $text[0] of $text[3] ($text[4] Unique)<br>
Listener Peak: $text[2]<br>
Server State: <b>$state</b><br>
Bitrate: $text[5] Kbps<br>
Current Song: $text[6]<br>
</font>";*/
echo "$text[0],$text[3],$text[1],$text[5],$text[6]";
?>