var x = document.getElementById("demo");
var today = new Date()
var dd = today.getDate();
var mm = today.getMonth(); 
var yy = today.getFullYear();
var day=today.getDay();
var days1=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var days=['SUN','MON','TUE','WED','THU','FRI','SAT'];
var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var searchcity='';
var searchcountry='';


function getLocation() {
	if(dd<10) {
	    dd='0'+dd;
	}  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    
}

function setimage(data){
	if (data=="clear sky") {
	    return "img/day-clearsky.svg";
	}
    else if (data=="few clouds") {
 		return "img/day-few-clouds.svg";
	}
   else if (data=="scattered clouds") {
    	return "img/day-scat-clouds.svg";
    }
    else if (data=="broken clouds") {
    	return "img/day-brok-clouds.svg";
    }
    else if (data=="shower rain") {
    	return "img/gen-showr-rain.svg";
    }
    else if (data=="rain") {
    	return "img/day-rain.svg";
    }
    else if (data=="light rain") {
    	return "img/day-light-rain.svg";
    }
    else if (data=="thunder storm") {
    	return "img/night-thu-storm.svg";
    }
    else if (data=="mist") {
    	return "img/gen-mist.svg";
    }
    else if (data=="snow") {
    	return "img/gen-snow.svg";
    }
    else {
    	return "img/night-drizzle.svg";
    }
}

function showPosition(position) {

		$.get("https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng="+position.coords.latitude+","+position.coords.longitude+"&key=AIzaSyBy9nMruKaIrgF3KLFzNHszSAdkTWj3acE",function(data){
			var comp=data.results[0].address_components;
			for (var i = 0; i < comp.length; i++) {
				if (comp[i].types.includes('locality')) {
					$('.city').html(comp[i].long_name+",");
					$('.curcountry').html(comp[i].long_name);
				}
				else if (comp[i].types.includes('sublocality')) {
					$('.curcity').html(comp[i].long_name+",");
				}
				else if (comp[i].types.includes('country')) {
					$('.country').html(comp[i].long_name);
				}
			}

	    	
		});


	    $.get("http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=5e6764119764d1b46052fd249383f76a",function(data){
	    	
	    	$('.weatherimage,.currentwimg').attr("src",setimage(data.weather[0].description));
	    	
	    	$('.temp,.curtemp').html(Math.floor(data.main.temp-273)+"&deg;");
	    	$('.unit,.curunit').html("C");
	    	$('.weatherimage').show();
	    	$('.day').html(days1[day]);
	    	$('.date').html(dd);
	    	$('.month').html(months[mm]);
	    	$('.year').html(yy%100);

	    });
	    $.get("http://api.openweathermap.org/data/2.5/forecast?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=5e6764119764d1b46052fd249383f76a",function(data){
	    	
	    	

	    	$('.img1').attr("src",setimage(data.list[0].weather[0].description));
	    	$('.mxtemp1').html(Math.ceil(data.list[0].main.temp_max-273)+"&deg;");
	    	$('.mntemp1').html(Math.floor(data.list[0].main.temp_min-273)+"&deg;");
	    	$('.date1').html(days[day]);

	    	$('.img2').attr("src",setimage(data.list[7].weather[0].description));
	    	$('.mxtemp2').html(Math.ceil(data.list[7].main.temp_max-273)+"&deg;");
	    	$('.mntemp2').html(Math.floor(data.list[7].main.temp_min-273)+"&deg;");
	    	$('.date2').html(days[(day+1)%7]);

	    	$('.img3').attr("src",setimage(data.list[15].weather[0].description));
	    	$('.mxtemp3').html(Math.ceil(data.list[15].main.temp_max-273)+"&deg;");
	    	$('.mntemp3').html(Math.floor(data.list[15].main.temp_min-273)+"&deg;");
	    	$('.date3').html(days[(day+2)%7]);

	    	$('.img4').attr("src",setimage(data.list[23].weather[0].description));
	    	$('.mxtemp4').html(Math.ceil(data.list[23].main.temp_max-273)+"&deg;");
	    	$('.mntemp4').html(Math.floor(data.list[23].main.temp_min-273)+"&deg;");
	    	$('.date4').html(days[(day+3)%7]);

	    	$('.img5').attr("src",setimage(data.list[31].weather[0].description));
	    	$('.mxtemp5').html(Math.ceil(data.list[31].main.temp_max-273)+"&deg;");
	    	$('.mntemp5').html(Math.floor(data.list[31].main.temp_min-273)+"&deg;");
	    	$('.date5').html(days[(day+4)%7]);

	    	

	    	$('.img1,.img2,.img3,.img4,.img5').show();
	    });
	}

function fsearch(){

	if(searchcity!=''&&searchcountry!=''){
		$.get("http://api.openweathermap.org/data/2.5/forecast?q="+searchcity+","+searchcountry+"&appid=5e6764119764d1b46052fd249383f76a",function(data){
	    	
			$('.weatherimage').attr("src",setimage(data.list[0].weather[0].description));
	    	
	    	$('.temp').html(Math.floor(data.list[0].main.temp-273)+"&deg;");

	    	$('.img1').attr("src",setimage(data.list[0].weather[0].description));
	    	$('.mxtemp1').html(Math.ceil(data.list[0].main.temp_max-273)+"&deg;");
	    	$('.mntemp1').html(Math.floor(data.list[0].main.temp_min-273)+"&deg;");
	    	$('.date1').html(days[day]);

	    	$('.img2').attr("src",setimage(data.list[7].weather[0].description));
	    	$('.mxtemp2').html(Math.ceil(data.list[7].main.temp_max-273)+"&deg;");
	    	$('.mntemp2').html(Math.floor(data.list[7].main.temp_min-273)+"&deg;");
	    	$('.date2').html(days[(day+1)%7]);

	    	$('.img3').attr("src",setimage(data.list[15].weather[0].description));
	    	$('.mxtemp3').html(Math.ceil(data.list[15].main.temp_max-273)+"&deg;");
	    	$('.mntemp3').html(Math.floor(data.list[15].main.temp_min-273)+"&deg;");
	    	$('.date3').html(days[(day+2)%7]);

	    	$('.img4').attr("src",setimage(data.list[23].weather[0].description));
	    	$('.mxtemp4').html(Math.ceil(data.list[23].main.temp_max-273)+"&deg;");
	    	$('.mntemp4').html(Math.floor(data.list[23].main.temp_min-273)+"&deg;");
	    	$('.date4').html(days[(day+3)%7]);

	    	$('.img5').attr("src",setimage(data.list[31].weather[0].description));
	    	$('.mxtemp5').html(Math.ceil(data.list[31].main.temp_max-273)+"&deg;");
	    	$('.mntemp5').html(Math.floor(data.list[31].main.temp_min-273)+"&deg;");
	    	$('.date5').html(days[(day+4)%7]);

	    	$('.city').html(searchcity+",");
	    	$('.country').html(searchcountry);

	    	$('.curweather').css("display", "flex");
	    	$('.location').css("display", "inline-table");

		});
	}
	else {
		alert("Please choose a city");
	}

}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
            break;
    }
    x.style.display = 'inline-block';
}

function initMap() {
        
        var input = document.getElementById('pac-input');
        
        var autocomplete = new google.maps.places.Autocomplete(input);

        
        

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
       

        autocomplete.addListener('place_changed', function() {
          
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
          	window.alert("No details available for input: '" + place.name + "'");
          	return;
        }

          
          
        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
            searchcity=place.name;
            var comp=place.address_components;
            for (var i = 0; i < comp.length; i++) {
				 if (comp[i].types.includes('country')) {
					searchcountry=comp[i].long_name;
				}
			}
        }
        infowindowContent.children['place-icon'].src =place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
          
        });
 }