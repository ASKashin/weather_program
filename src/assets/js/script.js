const reset = () => {
  document.querySelector(".weather__temp").innerText = "";
  document.querySelector(".weather__icon").innerText = "";
  document.querySelector(".weather__wind").innerText = "";
  document.querySelector(".weather__humidity").innerText = "";
  document.querySelector(".weather__visibility").innerText = "";
}

const weather = async (name) => {
  const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=70e1ed322b02acbc57d443dd91065f3e`);
  const json = await data.json();
  if (json.cod === "404") {
    document.querySelector(".weather__city-name").innerText = json.message;
    reset();
  } else {
    document.querySelector(".weather__city-name").innerText = json.name;
    document.querySelector(".weather__temp").innerText = `${Math.round(json.main.temp)} °C`;
    document.querySelector('.weather__icon').innerHTML = `<img  alt="icon" src="https://openweathermap.org/img/wn/${json.weather[0]['icon']}@2x.png">`;
    document.querySelector(".weather__wind").innerText = `Wind speed: ${json.wind.speed} m/s`;
    document.querySelector(".weather__humidity").innerText = `Humidity: ${json.main.humidity} %`;
    document.querySelector(".weather__visibility").innerText = `visibility: ${(json.visibility) / 1000} km`;

  }
}

weather("London");

document.querySelector(".weather__btn").addEventListener(`click`, () => {
  const name = document.querySelector(".weather__city-input").value;
  if (name === '') {
    document.querySelector(".weather__city-name").innerText = "Выничего не ввели";
    reset()
  } else {
    weather(name);
  }
})
