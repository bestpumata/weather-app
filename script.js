const form = document.getElementById('weather-form');
const input = document.getElementById('city-input');
const result = document.getElementById('weather-result');

// ⚠️ Сложи своя ключ тук
const API_KEY = 'b21d445d9f4f01eb373d77d2e38ebb4a';

function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }
  
  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }
  

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const city = input.value.trim();
  if (city === '') return;
  showLoader();
  // Извикваме OpenWeather API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=bg&appid=${API_KEY}`)
    .then(response => {
      if (!response.ok) throw new Error('Градът не е намерен.');
      return response.json();
    })
    .then(data => {
        hideLoader();
      showWeather(data);
    })
    .catch(error => {
        hideLoader();
      result.innerHTML = `<p style="color:red;">Грешка: ${error.message}</p>`;
    });

  input.value = '';
});
  
// Функция за показване на информацията
function showWeather(data) {
    const temp = data.main.temp.toFixed(1);
    const feels = data.main.feels_like.toFixed(1);
    const humidity = data.main.humidity;
    const wind = data.wind.speed.toFixed(1);
    const pressure = data.main.pressure;
    const desc = data.weather[0].description;
    const cityName = data.name;
    const icon = data.weather[0].icon;
    const weatherMain = data.weather[0].main;
    updateBackground(weatherMain);
    

  
    result.innerHTML = `
      <h2>${cityName}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p><strong>${temp}°C</strong> – ${desc}</p>
      <p>🌡️ Усеща се като: <strong>${feels}°C</strong></p>
      <p>💧 Влажност: <strong>${humidity}%</strong></p>
      <p>🌬️ Вятър: <strong>${wind} km/h</strong></p>
      <p>🔵 Налягане: <strong>${pressure} hPa</strong></p>
    `;
  }
  function updateBackground(weatherMain) {
    document.body.className = ''; // Премахваме всички предишни класове
  
    const condition = weatherMain.toLowerCase();
  
    if (condition.includes('clear')) {
      document.body.classList.add('clear');
    } else if (condition.includes('clouds')) {
      document.body.classList.add('clouds');
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      document.body.classList.add('rain');
    } else if (condition.includes('snow')) {
      document.body.classList.add('snow');
    } else if (condition.includes('thunderstorm')) {
      document.body.classList.add('thunderstorm');
    } else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
      document.body.classList.add('mist');
    }
  }
  