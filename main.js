var iconTable = {
			"01d": "wi-day-sunny",
			"02d": "wi-day-cloudy",
			"03d": "wi-cloudy",
			"04d": "wi-cloudy-windy",
			"09d": "wi-showers",
			"10d": "wi-rain",
			"11d": "wi-thunderstorm",
			"13d": "wi-snow",
			"50d": "wi-fog",
			"01n": "wi-night-clear",
			"02n": "wi-night-cloudy",
			"03n": "wi-night-cloudy",
			"04n": "wi-night-cloudy",
			"09n": "wi-night-showers",
			"10n": "wi-night-rain",
			"11n": "wi-night-thunderstorm",
			"13n": "wi-night-snow",
			"50n": "wi-night-alt-cloudy-windy"
		};
var iconTable2 = {
			"clear-day": "wi-day-sunny",
			"partly-cloudy-day": "wi-day-cloudy",
			"cloudy": "wi-cloudy",
			"wind": "wi-cloudy-windy",
			"showers": "wi-showers",
			"rain": "wi-rain",
			"sleet": "wi-rain",
			"thunderstorm": "wi-thunderstorm",
			"snow": "wi-snow",
			"fog": "wi-fog",
			"clear-night": "wi-night-clear",
			"partly-cloudy-night": "wi-night-cloudy",
		};
var days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
 function generateCalendar()
 {
	$("#calendar").html("<table border=1 cellspacing=0></table>");
	var today = new Date();
	var todayday = today.getDate();
	var current = new Date();
	current.setDate(1);
	var firstday = current.getDay();
	current.setMonth(today.getMonth()+1);
	current.setDate(0);
	var lastday = current.getDate();
	var curday = 1;
	$("#calendar table").append("<tr><th colspan=7 id='imageoftheday'></th></tr><tr><th colspan=7>"+months[today.getMonth()]+" &bull; "+today.getFullYear()+"</th></tr><tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>");
	$.get("imageofday.php", function (data) {
		$("#imageoftheday").append(data);
	});
	while(curday<=lastday)
	{
		$("#calendar table").append("<tr>");
		for(i = 0;i<7;i++)
		{
			if(curday==1&&firstday!=i||curday>lastday)
			{
				$("#calendar table tr:last-child").append("<td></td>");
			}else if(curday==todayday)
			{
				
				$("#calendar table tr:last-child").append("<td><span style='border:solid white 1px;border-radius:50%;width: 20px;height: 20px;display:inline-block;text-align:center;line-height:20px;'>"+curday+"</span><br><br></td>");
				curday++;
			}
			else{
				$("#calendar table tr:last-child").append("<td>"+curday+"<br><br><br></td>");
				curday++;
			}
		}
	}
    t = setTimeout(function () {
        generateCalendar()
    }, 86400000);
 }
 function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
	var ampm = "AM";
    var h = today.getHours();
	if(h>12)
	{
		h=h-12;
		ampm = "PM"
	}
    var m = today.getMinutes();
    // add a zero in front of numbers<10
    m = checkTime(m);
    $('#time').text(h + ":" + m + " " + ampm);
    t = setTimeout(function () {
        startTime()
    }, 20000);
}
function checkWeather()
{
	var curWeatherRequest = new XMLHttpRequest();
	curWeatherRequest.open("GET", "proxy.php?url=41.740066,-111.824409&t=" + Math.random(), true);
	curWeatherRequest.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var weather = $.parseJSON(this.response);
				console.log(weather);
				var icon = weather.currently.icon;
				$('#currentweather').html('<h2><span style="margin-right: 50px;" class="'+iconTable2[icon]+'"></span>'+Math.round(weather.currently.temperature) + '&deg;</h2>');
			}else{
				$('#currentweather').append("<p>Could not load current weather.</p>");
			}
		}
	};
	var weatherRequest = new XMLHttpRequest();
	weatherRequest.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?id=5777544&appid=074e880c08d3fefcc874e95b4527df44&units=imperial&t=" + Math.random(), true);
	weatherRequest.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var weather = $.parseJSON(this.response).list;
				$('#weather').html('<table>');
				$.each(weather,function(data,element){
					var xx = new Date();
					xx.setTime(element.dt*1000);
					var dayOfWeek = days[xx.getDay()]
					var icon = element.weather[0].icon;
					$('#weather').append('<tr><td style="padding-right:30px;">'+dayOfWeek+'</td><td style="padding-right:30px;"><span class="'+iconTable[icon]+'"></span></td><td style="padding-right:30px;">'+Math.round(element.temp.max)+'&deg;</td><td>'+Math.round(element.temp.min)+'&deg;</td></tr>');
				});
				$('#weather').append('</table>');
			}else{
				$('#weather').append("<p>Could not load weather.</p>");
			}
		}
	};
	curWeatherRequest.send();
	weatherRequest.send();
    t = setTimeout(function () {
        checkWeather()
    }, 60000);
}
$(document).ready(function()
{
	startTime();
	checkWeather();
	generateCalendar();
});