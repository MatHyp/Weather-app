'use strict';

//Containers
const bigCardContainer = document.querySelector('.big-card');
const smallCardContainer = document.querySelector('.all-small');
//btns
const btnFind = document.querySelector('.btn-find');
//inputs
const inputFindCity = document.querySelector('.city-input');
let test = 0;

const linkData = {
  key: '634ef6dda72944aba0ead2fc037cdd9a',
  baseUrl: 'https://api.weatherbit.io/v2.0/forecast/daily?',
};

const renderWeatherData = function (dataa) {
  //render big card today data
  const bigCard = `
  <div class="table-header">
    <p>${dataa.data[0].valid_date}</p>
  </div>

  <div class="items">
    <h2>${dataa.city_name}</h2>

    <div class="temp">
      <h1>${dataa.data[0].temp}<sup>o</sup>C</h1>
      <img src="icons/${dataa.data[0].weather.icon}.svg" alt="" />
    </div>

    <div class="elements">
      <img src="img/icon-umberella.png" alt="" />
      <p>20%</p>
      <img src="img/icon-umberella.png" alt="" />
      <p>${dataa.data[0].wind_spd}km/h</p>
      <img src="img/icon-umberella.png" alt="" />
      <p>${dataa.data[0].wind_cdir_full}</p>
    </div>
  </div>
  `;

  // render 7 days small cards
  for (let i = 6; i >= 0; i--) {
    let smallCard = `
    <div class="small-cards" id=small-card-${i}>
      <div class="table-header">
        <p>${dataa.data[i].valid_date}</p>
      </div>
      <img src="icons/${dataa.data[i].weather.icon}.svg" alt="" />
      <h1>${dataa.data[i].high_temp}<sup>o</sup>C</h1>
      <h2>${dataa.data[i].min_temp}<sup>o</sup></h2>
    </div>
    `;
    smallCardContainer.insertAdjacentHTML('afterbegin', smallCard);
  }

  bigCardContainer.insertAdjacentHTML('afterbegin', bigCard);
};

//get weather data from API

const getWeatherData = async function (city) {
  try {
    const response = await fetch(
      `${linkData.baseUrl}city=${city}&key=${linkData.key}`
    );

    if (!response.ok) {
      throw new Error('Sth wrong');
    }

    const data = await response.json();
    console.log(data);
    renderWeatherData(data);
    test = 1;
  } catch (err) {
    alert(`Propably you enter wrong city name${err}`);
    console.log('Propably you enter wrong city name');
    test = 0;
  }
};

btnFind.addEventListener('click', function (e) {
  e.preventDefault();

  let city = inputFindCity.value;
  if (test === 1) {
    document.querySelector('.items').remove();
    document
      .querySelectorAll('.table-header')
      .forEach((table) => table.remove());
    document.querySelectorAll('.small-cards').forEach((el) => el.remove());
  }
  getWeatherData(city);

  inputFindCity.value = ' ';
});

getWeatherData('szczecin');

// Get windy map
const options = {
  // Required: API key
  key: '8SNGWcbw2DNAet5SzhiXgMGj7yu7QGpo',
  verbose: true,

  lat: 50.4,
  lon: 14.3,
  zoom: 5,
};

// Initialize Windy API
windyInit(options, (windyAPI) => {
  const { map } = windyAPI;
});

// ?key=8SNGWcbw2DNAet5SzhiXgMGj7yu7QGpo

// `https://api.windy.com/api/webcams/v2/list?show=countries/nearby=40.70260914910875,-74.14104998205934,5?key=8SNGWcbw2DNAet5SzhiXgMGj7yu7QGpo`

// const getWeatherData = async function () {
//   try {
//     const response = await fetch(
//       `https://api.windy.com/api/webcams/v2/list/country=IT?show=webcams?key=8SNGWcbw2DNAet5SzhiXgMGj7yu7QGpo`
//     );

//     if (!response.ok) {
//       throw new Error('Sth wrong');
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (err) {
//     alert(`Propably you enter wrong city name${err}`);
//     console.log('Propably you enter wrong city name');
//   }
// };

// getWeatherData();
