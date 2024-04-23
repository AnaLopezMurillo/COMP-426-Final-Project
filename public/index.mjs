// will contain functionality for index.html

function getWeather(data) {
    const js_city = document.getElementById("htmlcity");
        const js_weather = document.getElementById("htmlweather");
        const js_wind = document.getElementById("htmlwind");
        const js_temp = document.getElementById("htmltemp");

        js_city.innerHTML = data.name;
        js_weather.innerHTML = data.weather[0].description;
        js_wind.innerHTML = data.wind.speed;
        js_temp.innerHTML = data.main.temp;
}

document.addEventListener("click", function (event) {
  if (!event.target.matches("#button")) return;

  fetch('http://api.openweathermap.org/data/2.5/weather?q='
  + document.getElementById('testcity').value +
  ',us&APPID=f87efa6efbae21838d158e6b02208445&units=imperial')
  .then(
      response =>{
    return response.json();
  })
  .then(
      data =>{
      getWeather(data);
      console.log(data);
      })
  }

  // to store this into the backend we'll probably need to use fetch as well with localhost:3000 as the path w/ the information in it
);