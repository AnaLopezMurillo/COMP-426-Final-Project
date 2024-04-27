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

document.addEventListener("DOMContentLoaded", async (e) => {
      await addrecentCities(window.location.href.slice(-34));
})

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
    async data =>{
    getWeather(data);
    console.log(data);

    await fetch("http://localhost:3000/user/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pid: window.location.href.slice(-34),
          name: data.name,
          weather: data.weather[0].description,
          wind_speed: data.wind.speed,
          temp: data.main.temp
        })
      });
      addrecentCities(window.location.href.slice(-34)); // helper function to add recently searched cities to div. Call it before posting the current added city so that it doesn't include that one.
    })
    document.getElementById('testcity').value = '';
e.preventDefault();
});


async function addrecentCities(p_id) {
    searchedCities.innerHTML = "";
    const recent_array = [];
    const response = await fetch (`http://localhost:3000/user?pid=${p_id}`);
    const recent_cities = await response.json();

    recent_cities.forEach(c => {
      if (!document.getElementById(c.name)) {
          recent_array.unshift(c.name);
        }
    });

    for (let i = 0; i < 7; i++) {
        const new_div = document.createElement("h3");
        new_div.textContent = recent_array[i];
        new_div.id = recent_array[i];
        searchedCities.append(new_div);
    }
    console.log(recent_array);
};

/*
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
    });
  }
);
*/
