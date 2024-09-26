const APIKey = 'YOUR_API_KEY';
const APIURL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const search = document.querySelector(".city");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function CheckWeather(city){
	const response = await fetch(APIURL + city + `&appid=${APIKey}`);

	if(response.status == 404){
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	} else{
		var data = await response.json();
		console.log(data);

		document.querySelector(".temp").innerHTML = Math.round(data.list[0].main.temp) + "°c";
		document.querySelector(".humidity-percent").innerHTML = data.list[0].main.humidity + "%";
		document.querySelector(".wind-speed").innerHTML = data.list[0].wind.speed + "km/hr";

		document.querySelector(".middle .more-info").innerHTML = data.list[0].weather[0].description;

		if(data.list[0].weather[0].main == 'Clear') {
			weatherIcon.src = "assets/images/clear.png";
		} else if(data.list[0].weather[0].main == 'Rain') {
			weatherIcon.src = "assets/images/rain.png";
		} else if(data.list[0].weather[0].main == 'Snow') {
			weatherIcon.src = "assets/images/snow.png";
		} else if(data.list[0].weather[0].main == 'Clouds') {
			weatherIcon.src = "assets/images/cloud.png";
		} else{
			weatherIcon.src = "assets/images/cloud.png";
		}

		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none";
	}

}

searchBtn.addEventListener('click', () =>{
	CheckWeather(search.value);
});