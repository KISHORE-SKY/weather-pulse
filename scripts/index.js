
//preloader
const preloaderanimation=document.querySelector('.preloader-section');
window.addEventListener('load',()=>{
	preloaderanimation.style.display='none';
	//console.log('its loading');
})


//current date
let currentDate=new Date();

let month=currentDate.getMonth()+1;
let year=currentDate.getFullYear();
let date=currentDate.getDate();
let date_today=`${date}/${month}/${year}`;
const dailyDate=document.querySelector('.date');
dailyDate.textContent=date_today;

//current day

const todayDate=new Date();
let day=todayDate.getDay();
const weekdays=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
const currentDay=document.querySelector('.day');
currentDay.textContent=weekdays[day];

//current time

function updateClock(){       
	const timeNow=new Date();
	let hours=timeNow.getHours();
	let meridieum=hours>=12 ? 'PM' : 'AM';
	hours=hours %12 || 12;
	hours=hours.toString().padStart(2,0);
	const minutes=timeNow.getMinutes().toString().padStart(2,0);
	const seconds=timeNow.getSeconds().toString().padStart(2,0);
	const timeString=`${hours}:${minutes}:${seconds} ${meridieum}`;

	const currentTime=document.querySelector('.time');
	currentTime.innerText=timeString;
}

setInterval(updateClock,1000);


//API
const searchButton=document.querySelector('.location-btns');

searchButton.addEventListener('click',(event)=>{
	const locationInputBox = document.getElementById('searchLocation').value.trim();
	globalWeather(locationInputBox);
})

async function globalWeather(city){ 

let myapiKey="58b219c79f86a4ca34000b66acbde736";
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myapiKey}`)
 
try{
	if (!response.ok) {
		throw new Error(`couldn't fetch ${response.status}`);
	}
	else{
		let globalData=await response.json();
		console.log(globalData);

		const degreeOfCity=document.getElementById('degree-measure');
		degreeOfCity.innerHTML=`<p>${globalData.main.temp} <sup class="degree-celsious">o</sup><sup>c</sup></p>`;

		const climateMessage=document.getElementById('climate');
		climateMessage.textContent=`${globalData.
weather[0].main}`;

		const locationName=document.getElementById('locationduplicate');
		locationName.textContent=globalData.name;

		const windState=document.getElementById('wind-bx');
		windState.innerText=`${globalData.wind.speed}`;

		const humidityState=document.getElementById('Humadity-bx');
		humidityState.textContent=`${globalData.main.humidity}%`;

		const sealevelState=document.querySelector('.sea-level-message');
		sealevelState.innerText=globalData.main.
sea_level;

		const pressureState=document.getElementById('Pressure-bx');
		pressureState.textContent=globalData.main.pressure;

		const sunriseState=document.getElementById('sun-rise');
		sunriseState.textContent=globalData.sys.sunrise;

		const sunsetState=document.getElementById('sun-set');
		sunsetState.textContent=globalData.sys.sunset;

		const snowState=document.querySelector('.snow-level');
		if(globalData.main.temp>=225 && globalData.main.temp<=280){
			snowState.textContent=`90%`;
		}
		else if(globalData.main.temp>=281 && globalData.main.temp<=299){
			snowState.textContent=`70%`;
		}
		else if(globalData.main.temp>=300){
			snowState.textContent=`35%`;
		}

		const weatherImage=document.querySelector('.default-image-weather');
		let weatherType=globalData.weather[0].
main;
		if(weatherType==='Clouds' || weatherType==='mostly cloud'){
			weatherImage.src='assets/clouds.png';
		}
		else if (weatherType==='Haze' || weatherType==='mist') {
			weatherImage.src='assets/mist.png'
		}
		else if (weatherType==='Clear' || weatherType==='sunny' || weatherType==='clear sky') {
			weatherImage.src='assets/clear.png';
		}
		else if(weatherType==='rainy' || weatherType==='rain'){
			weatherImage.src='assets/rain.png'
		}
		else{
			weatherImage.src='assets/snowfall.png';	
		}
		
	}
 }
 catch(error){ 
 	console.log(error);
 }
}





