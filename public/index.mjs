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

let cityForm = document.getElementById("city-form")

// this is the div we should manipulate to add the recently searched cities from the database!!! just add in the innerHTML a new <h3> element with each city from the backend, and they should show up on the webpage
let searchedCities = document.getElementById("searched-cities")

cityForm.addEventListener("submit", (e) => {
console.log(document.getElementById('testcity').value)

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

e.preventDefault();
});

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

      fetch("http://localhost:3000/user/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: data.name,
          weather: data.weather[0].description,
          windspeed: data.wind.speed,
          temp: data.main.temp,
          pid: window.location.href.slice(-34)
        })
    });
      });
  }
);
