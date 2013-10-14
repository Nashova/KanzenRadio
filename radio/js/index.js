/* Variables globales */
var dias = {0:" Domingo ",1:" Lunes ",2:" Martes ",3:" Miércoles ",4:" Jueves ",5:" Viernes ",6:" Sábado "};
var meses = {0:"Enero ",1:"Febrero ",2:"Marzo ",3:"Abril ",4:"Mayo ",5:"Junio ",6:"Julio ",7:"Agosto ",8:"Septiembre ",9:"Octubre ",10:"Noviembre ",11:"Diciembre "};
var radio1 = new Audio();
var metadataUrl = "";

/* Inicializacion de entorno */
//$(document).ready(function(){
window.onload = function(){
	generateClockWidget();
	inicializaReproductor();
	setInterval(refreshClock,60000);
	iniciaAnimacion();
};
/* Funciones de animación */
function iniciaAnimacion(){
	$("#logoKanzen").hide();
	$("#fechaHoraWidget").hide();
	$("#reproductor").hide();
	$("#informacion").hide();
	$("#navegacionContenedor span").hide();
	
	$("#reproductorContenedor").animate({left:0},1000,'easeOutElastic',function(){
		$("#navegacionContenedor").animate({top:0},1000,"easeOutElastic",function(){
			$("#navegacionContenedor span").each(function(){
				$(this).show().animate({top:"0px"},Math.floor((Math.random()*2000)+1),"easeOutElastic");
			});
		});
		$("#logoKanzen").fadeIn(600,function(){
			$("#fechaHoraWidget").slideDown(700,function(){
				$("#reproductor").fadeIn(900,function(){$("#informacion").slideDown(400);});
			});
		});
	});
	$("#principalContenedor").animate({width:"80%",height:"80%",top:"60px",right:"2%"},2000,"easeInElastic");
}

/* Funciones del Widget de Fecha y hora */
function generateClockWidget(){
	mydate = new Date(); 
	myday = mydate.getDay(); 
	mymonth = mydate.getMonth(); 
	myweekday= mydate.getDate(); 
	myhours = mydate.getHours();
	myminutes = mydate.getMinutes();
	hour = myhours>12?myhours-12:myhours;
	horaActual = hour+":"+myminutes+(myhours>12?" PM ":" AM " );
	$("#fechaActual #dia").text((""+myweekday).length<2?"0"+myweekday:myweekday);
	$("#fechaActual #mes").text(meses[mymonth]);
	$("#fechaActual #diaTexto").text(dias[myday]);
	$("#horaActual #hora").text(((""+hour).length<2?"0"+hour:hour)+":"+((""+myminutes).length<2?"0"+myminutes:myminutes));
	$("#horaActual #ampm").text(myhours>12?" PM ":" AM ");
}
function refreshClock(){
	var fecha = new Date();
	horas = fecha.getHours();
	minutos = fecha.getMinutes();
	hour = horas>12?horas-12:horas;
	$("#horaActual #hora").text(((""+hour).length<2?"0"+hour:hour)+":"+((""+minutos).length<2?"0"+minutos:minutos));
	$("#horaActual #ampm").text(horas>12?" PM ":" AM ");
	dia= fecha.getDate();
	if(parseInt($("#fechaActual #dia").text())!=dia){
		myday = fecha.getDay(); 
		mymonth = fecha.getMonth(); 
		$("#fechaActual #dia").text((""+dia).length<2?"0"+dia:dia);
		$("#fechaActual #mes").text(meses[mymonth]);
		$("#fechaActual #diaTexto").text(dias[myday]);
	}
}

/* Funciones del reproductor */
/*
myaudio.play(); - This will play the music.
myaudio.pause(); - This will stop the music.
myaudio.duration; - Returns the length of the music track.
myaudio.currentTime = 0; - This will rewind the audio to the beginning.
myaudio.loop = true; - This will make the audio track loop.
myaudio.muted = true; - This will mute the track
myaudio.addEventListener('ended',myfunc);
*/
function inicializaReproductor(){
	$.support.cors = true;
	radio1.type= 'audio/mpeg;';
	radio1.autoplay = "autoplay";
	radio1.src= 'http://play.radioknz.com.ar:8010/;stream.mp3';
	metadataUrl = "meta2.php";
	//radio1.src = '1.mp3';
	//refreshMetadata();
	$("#reproductorContenedor #informacion").show();
	$("#reproductorContenedor #apagada").hide();
	setTimeout(refreshMetadata,1000);
	setInterval(refreshMetadata,30000);
	radio1.addEventListener("playing",function(){
		$("#loadingImg").hide();
		$("#estatus").text("ENCENDIDA");
	});
	radio1.addEventListener("waiting",function(){
		$("#loadingImg").show();
		$("#estatus").text("CARGANDO");
	});
	$("#reproductor #play").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("deshabilitado")){
			radio1.play();
			$(this).addClass("deshabilitado");
			$("#reproductor #pause").removeClass("deshabilitado");
		}
		return false;
	});
	$("#reproductor #pause").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("deshabilitado")){
			radio1.pause();
			$(this).addClass("deshabilitado");
			$("#reproductor #play").removeClass("deshabilitado");
		}
		return false;
	});
	$("#reproductor #stop").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("deshabilitado")){
			radio1.stop();
			$(this).addClass("deshabilitado");
			$("#reproductor #play").removeClass("deshabilitado");
		}
		return false;
	});
	$("#reproductor #volOff").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("deshabilitado")){
			radio1.muted = true;
			$(this).addClass("deshabilitado");
			$("#reproductor #volOn").removeClass("deshabilitado");
		}
		return false;
	});
	$("#reproductor #volOn").click(function(e){
		e.preventDefault();
		if(!$(this).hasClass("deshabilitado")){
			radio1.muted = false;
			$(this).addClass("deshabilitado");
			$("#reproductor #volOff").removeClass("deshabilitado");
		}
		return false;
	});

}
function refreshMetadata(){
	$.ajax({url: metadataUrl, dataType:"text"}).done(function(data) {
		informacion = data.split(",");
		oyentes = informacion[0];
		maximoOyentes = informacion[1];
		estatus = informacion[2];
		bitrate = informacion[3];
		cancion = informacion[4];
		if(estatus=='1'){
			$("#reproductorContenedor #informacion").show();
			$("#reproductorContenedor #apagada").hide();
			$("#reproductorContenedor #oyentes").text(oyentes);
			$("#reproductorContenedor #maximoOyentes").text(maximoOyentes);
			$("#reproductorContenedor #bitrate").text(bitrate);
			$("#reproductorContenedor #cancion").text(cancion);
		}else{
			$("#reproductorContenedor #informacion").hide();
			$("#reproductorContenedor #apagada").show();
		}
	});
}