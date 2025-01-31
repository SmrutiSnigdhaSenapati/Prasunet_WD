// Load Swiper JS
const swiperScript = document.createElement('script');
swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js';
swiperScript.onload = function() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 15,
        freeMode: true,
    });
};
document.head.appendChild(swiperScript);

// Weather updates script
const searchBtn = document.querySelector('.searchBtn');
const cityNameInput = document.querySelector('.citySearch');
const apiKey = 'b8e6343adb114d2c88af0939f6b1a6c4';
const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WeatherDegree = document.querySelector('.weatherInput');
const locationData = document.querySelector('.location-data');
const weatherPallete = document.querySelector('.weather-pallete');
const weatherUL = document.querySelector('.weather-ul');

const gettingStartedBtn = document.querySelector('.getting-started-btn');

gettingStartedBtn.addEventListener('click', function() {
    document.querySelector('.frontpage').classList.add('active');
    document.querySelector('.weather-container').classList.add('active');
});

function createWeatherCard(cityName2, weatherItem2, index2) {
    if (index2 === 0) {
        return `
        <div class="location-data">
        <div class="location-content">
        <i class='bx bxs-map'></i>
        <h3>${cityName2}</h3>
        </div>
        <p>${weatherItem2.dt_txt.split(' ')[0]}</p>
        </div>
        <div class="weather-Degree">
        <h1>${(weatherItem2.main.temp - 273.15).toFixed(2)}°</h1>
        <img src="https://openweathermap.org/img/wn/${weatherItem2.weather[0].icon}@4x.png" alt="weather-Degree-image" class="weather-Degree-img">
        <h2>${weatherItem2.weather[0].description}</h2>
        </div>
        <div class="weather-pallete">
        <div class="pallete-data">
            <i class='bx bx-water'></i>
            <small>${weatherItem2.main.pressure} M/B</small>
            <span>Pressure</span>
        </div>
        <div class="pallete-data">
            <i class='bx bxs-droplet-half' ></i>
            <small>${weatherItem2.main.humidity}%</small>
            <span>Humidity</span>
        </div>
        <div class="pallete-data">
            <i class='bx bx-wind' ></i>
            <small>${weatherItem2.wind.speed} M/S</small>
            <span>wind Speed</span>
        </div>
        </div>
        `;
    } else {
        return `
        <li class="swiper-slide weather-data">
            <span>${weatherItem2.dt_txt.split(' ')[0]}</span>
            <img src="http://openweathermap.org/img/wn/${weatherItem2.weather[0].icon}@2x.png" alt="forecast-image" class="forecast-img">
            <div class="icon-overlay"></div>
            <small>${(weatherItem2.main.temp - 273.15).toFixed(2)}°</small>
        </li>
        `;
    }
}

function gettingWeatherDetails(cityWeather, lat, lon) {
    const weather_api_url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(weather_api_url).then(res => res.json()).then(data => {
        const forecastDays = [];
        const fiveDaysForecast = data.list.filter(function(forecast) {
            const forecastdate = new Date(forecast.dt_txt).getDate();
            if (!forecastDays.includes(forecastdate)) {
                return forecastDays.push(forecastdate);
            }
        });

        console.log(data);
        cityNameInput.value = "";
        WeatherDegree.innerHTML = "";
        locationData.innerHTML = "";
        weatherPallete.innerHTML = "";
        weatherUL.innerHTML = "";

        fiveDaysForecast.forEach(function(weatherItem, index) {
            if (index === 0) {
                WeatherDegree.insertAdjacentHTML('beforeend', createWeatherCard(cityWeather, weatherItem, index));
            } else {
                weatherUL.insertAdjacentHTML('beforeend', createWeatherCard(cityWeather, weatherItem, index));
            }
        });
    }).catch(() => {
        alert('Error Occurred While Fetching the Coordinates of Weather');
    });
}

searchBtn.addEventListener('click', function() {
    const cityName = cityNameInput.value.trim();
    if (cityName === "") {
        alert("Please Enter the City Name");
        return;
    } else {
        const geocoding_api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
        fetch(geocoding_api_url).then(res => res.json()).then(data => {
            if (!data.length) {
                return alert(`${cityName} isn't a valid city Name`);
            } else {
                const { name, lat, lon } = data[0];
                gettingWeatherDetails(name, lat, lon);
            }
        }).catch(() => {
            alert("Error Occurred While Fetching the Coordinates");
        });
    }
});
