const $userName = document.getElementById("name");
const $quotation = document.getElementById("quote");
const $author = document.getElementById("author");
const $refreshQuotation = document.getElementById("change");
const $weatherIcon = document.querySelector(".weather-icon");
const $temperature = document.querySelector(".temperature");
const $weatherDescription = document.querySelector(".weather-description");
const $cityWeather = document.querySelector(".city");
const $wind = document.querySelector(".wind");
const $humidity = document.querySelector(".humidity");
const $date = document.getElementById("date");
const $body = document.getElementById("body");
const $leftButton = document.getElementById("prev");
const $rightButton = document.getElementById("next");
const $playBtn = document.querySelector(".play");
const $playMusicList = document.getElementById("check");
const $prevButton = document.getElementById("prev-song");
const $nextButton = document.getElementById("next-song");
const $volumeButton = document.getElementById("volumeButton");
const $volumeLenght = document.getElementById("volumeLenght");
const $SongLenght = document.getElementById("SongLenght");
const $musicTime = document.getElementById("time-music");
const $select = document.querySelector("select");
const $player = document.querySelector(".player");
const $buttonPlayer = document.getElementById("change-player");
const $buttonWeather = document.getElementById("change-weather");
const $weather = document.querySelector(".weather");
const $buttonGroup = document.querySelector(".button-div");

const audio = new Audio();

var playListId = 0;
var link = "";
var message = "";
var bgNum = String(getRandomNum());
var now = new Date();
const allLang = ["en", "ru"];
let lang = "en";
let weatherCode;

function deletePlayer() {
  if ($player.style.display == "") {
    $player.style.display = "none";
    $buttonPlayer.textContent = "return Player";
  } else {
    $player.style.display = "";
    $buttonPlayer.textContent = "delete Player";
  }
}

function deleteWeather() {
  if ($weather.style.display == "") {
    $weather.style.display = "none";
    $buttonWeather.textContent = "return Weather";
  } else {
    $weather.style.display = "";
    $buttonWeather.textContent = "delete Weather";
  }
}

function muteVolume() {
  if (audio.volume == 0) {
    $volumeButton.className = "volume-on player-icon";
    audio.volume = $volumeLenght.value;
  } else {
    $volumeButton.className = "volume-off player-icon";
    audio.volume = 0;
  }
}

function changeVolume() {
  audio.volume = $volumeLenght.value;
}

function changeTimeSong() {
  audio.currentTime = ($SongLenght.value * audio.duration) / 100;
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  $SongLenght.max = Math.ceil(duration);
  $SongLenght.value = currentTime;

  let minutes = String(Math.floor(audio.currentTime / 60));
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  let second = String(Math.floor(audio.currentTime % 60));
  if (second.length == 1) {
    second = "0" + second;
  }

  $musicTime.innerHTML = `${minutes}:${second} `;
}

function playAudio() {
  let newLi = document.getElementsByTagName("li");
  if ($playBtn.classList.contains("pause")) {
    audio.pause();
    $playBtn.className = "play player-icon";
    newLi[playListId].className = "play-item item-active";
  } else {
    audio.src = playList[playListId].src;
    $playBtn.className = "pause player-icon";
    newLi[playListId].className = "play-item item-active";
    audio.currentTime = 0;
    audio.play();
  }
}

function nextSongPlay() {
  let newLi = document.getElementsByTagName("li");
  for (let i = 0; i < newLi.length; i++) {
    newLi[i].className = "play-item";
  }

  if (playListId == playList.length) {
    playListId = 0;
  } else {
    playListId++;
  }
  newLi[playListId].className = "play-item item-active";
  audio.src = playList[playListId].src;
  $playBtn.className = "pause player-icon";
  audio.currentTime = 0;
  audio.play();
}

function prevSongPlay() {
  let newLi = document.getElementsByTagName("li");
  for (let i = 0; i < newLi.length; i++) {
    newLi[i].className = "play-item";
  }

  if (playListId == 0) {
    playListId = playList.length;
  } else {
    playListId = playListId - 1;
  }
  newLi[playListId].className = "play-item item-active";
  audio.src = playList[playListId].src;
  $playBtn.className = "pause player-icon";
  audio.currentTime = 0;
  audio.play();
}

function createMusicList() {
  for (let i = 0; i < playList.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("data", i);
    li.classList.add("play-item");
    li.textContent = playList[i].title;
    $playMusicList.append(li);
  }
}

function randomQuote() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  $quotation.innerText = `“${random.quote}.”`;
  $author.innerText = random.source;
}

function getWeekDay(date) {
  let tegLang = String(location.href).split("#");

  if (tegLang[1] == "ru") {
    let days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];

    return days[date.getDay()];
  } else {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return days[date.getDay()];
  }
}

function getWeekMonth(date) {
  let tegLang = String(location.href).split("#");

  if (tegLang[1] == "ru") {
    let month = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return month[date.getMonth()];
  } else {
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return month[date.getMonth()];
  }
}

function getRandomNum() {
  return Math.ceil(Math.random() * 20);
}

function setBg() {
  let messageId = "";
  let tegLang = String(location.href).split("#");
  if (tegLang[1] == "ru") {
    messageId = ["", "evening"];
  } else {
    messageId = message.toLocaleLowerCase().split(" ");
  }

  if (bgNum.length == 1) {
    bgNum = "0" + bgNum;
  }

  link =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    messageId[1] +
    "/" +
    bgNum +
    ".jpg";
  const img = new Image();
  img.src = link;
  img.onload = () => {
    $body.style.backgroundImage = "url(" + img.src + ")";
  };
}

function bgPlus() {
  let messageId = "";
  let tegLang = String(location.href).split("#");
  if (tegLang[1] == "ru") {
    messageId = ["", "evening"];
  } else {
    messageId = message.toLocaleLowerCase().split(" ");
  }

  bgNum = Number(bgNum);
  if (bgNum > 19) {
    bgNum = 1;
    bgNum = String(bgNum);
  } else {
    bgNum++;
    bgNum = String(bgNum);
  }

  if (bgNum.length == 1) {
    bgNum = "0" + bgNum;
  }

  link =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    messageId[1] +
    "/" +
    bgNum +
    ".jpg";

  const img = new Image();
  img.src = link;
  img.onload = () => {
    $body.style.backgroundImage = "url(" + img.src + ")";
  };
}

function bgMinus() {
  let messageId = "";
  let tegLang = String(location.href).split("#");
  if (tegLang[1] == "ru") {
    messageId = ["", "evening"];
  } else {
    messageId = message.toLocaleLowerCase().split(" ");
  }

  bgNum = Number(bgNum);

  if (bgNum <= 1) {
    bgNum = 20;
    bgNum = String(bgNum);
  } else {
    bgNum = bgNum - 1;
    bgNum = String(bgNum);
  }

  if (bgNum.length == 1) {
    bgNum = "0" + bgNum;
  }

  link =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" +
    messageId[1] +
    "/" +
    bgNum +
    ".jpg";

  const img = new Image();
  img.src = link;
  img.onload = () => {
    $body.style.backgroundImage = "url(" + img.src + ")";
  };
}

async function getWeather() {
  localStorage.setItem("city", $cityWeather.value);

  let tegLang = String(location.href).split("#");

  if (tegLang[1] == "ru") {
    $weatherIcon.className = "weather-icon owf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${$cityWeather.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    $weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    $temperature.textContent = `${Math.round(data.main.temp)}°C`;
    $weatherDescription.textContent = data.weather[0].description;
    $wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} m/s`;
    $humidity.textContent = `Влажность: ${data.main.humidity}%`;
  } else {
    $weatherIcon.className = "weather-icon owf";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${$cityWeather.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    $weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    $temperature.textContent = `${Math.round(data.main.temp)}°C`;
    $weatherDescription.textContent = data.weather[0].description;
    $wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    $humidity.textContent = `Humidity: ${data.main.humidity}%`;
  }
}

setInterval(function dataTime() {
  localStorage.setItem("name", $userName.value);

  var now = new Date();
  var date = now.getDate(),
    hour = String(now.getHours()),
    minute = String(now.getMinutes()),
    second = String(now.getSeconds());

  if (second.length == 1) {
    second = "0" + second;
  }

  if (minute.length == 1) {
    minute = "0" + minute;
  }

  if (hour.length == 1) {
    hour = "0" + hour;
  }

  document.getElementById("time").innerHTML =
    hour + ":" + minute + ":" + second;

  document.getElementById("date").innerHTML =
    getWeekDay(now) + ", " + getWeekMonth(now) + " " + date;
}),
  1000;

function greetingsPerson(hour) {
  let tegLang = String(location.href).split("#");

  if (tegLang[1] == "ru") {
    if (hour <= 6) {
      message = "Доброй ночи";
    } else if (hour <= 12) {
      message = "Доброе утро";
    } else if (hour <= 18) {
      message = "Добрый день";
    } else {
      message = "Добрый вечер";
    }
  } else {
    if (hour <= 6) {
      message = "Good Night";
    } else if (hour <= 12) {
      message = "Good Morning";
    } else if (hour <= 18) {
      message = "Good Afternoon";
    } else {
      message = "Good Evening";
    }
  }

  document.getElementById("greeting").innerHTML = message + ", ";
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substr(1);

  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#en";
    location.reload();
  }
  $select.value = hash;
}

function changeURLLanguage() {
  lang = $select.value;
  console.log(lang);
  location.href = window.location.pathname + "#" + lang;
  greetingsPerson(now.getHours());
  getWeather();
}

$cityWeather.value = localStorage.getItem("city");
$userName.value = localStorage.getItem("name");

getWeather();
randomQuote();
greetingsPerson(now.getHours());
setBg();
createMusicList();
changeLanguage();

$refreshQuotation.addEventListener("click", randomQuote);
$cityWeather.addEventListener("change", getWeather);
$leftButton.addEventListener("click", bgMinus);
$rightButton.addEventListener("click", bgPlus);
$playBtn.addEventListener("click", playAudio);
$prevButton.addEventListener("click", prevSongPlay);
$nextButton.addEventListener("click", nextSongPlay);
$volumeButton.addEventListener("click", muteVolume);
$volumeLenght.addEventListener("change", changeVolume);
$SongLenght.addEventListener("change", changeTimeSong);
audio.addEventListener("timeupdate", updateProgress);
$select.addEventListener("change", changeURLLanguage);
$buttonPlayer.addEventListener("click", deletePlayer);
$buttonWeather.addEventListener("click", deleteWeather);
