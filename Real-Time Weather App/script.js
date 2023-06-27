const city = document.getElementById('city');
const button = document.querySelector('button');
const container = document.getElementById('container');

function getData() {

  const data = new XMLHttpRequest();

  data.open("GET", `https://api.weatherapi.com/v1/current.json?key=e346fcf427b149d0a2090941232706&q=${city.value}&aqi=no`);

  data.onload = function () {
    if (data.status === 200 && data.readyState === 4) {

      // console.log(data.responseText);

      let objectData = JSON.parse(data.responseText);
      let name = city.value;

      container.innerHTML = `
      <h1>${name[0].toUpperCase()}${name.slice(1)}</h2>
      <div style="display:flex; justify-content:space-between;">
        <h3>${objectData['current']['temp_c']} <sup>°</sup>C</h3>
        <img src="${objectData['current']['condition']['icon']}" alt="weather icon">
      </div>
      <h3>${objectData['current']['condition']['text']}</h3>
    `;

      // console.log(objectData);
      // console.log(objectData['current']);
      // console.log(`Temperature in Celsius: ${objectData['current']['temp_c']}`);
      // console.log(`Temperature in Fahrenheit: ${objectData['current']['temp_f']}`);
      // console.log(`Condition Description: ${objectData['current']['condition']['text']}`);
      // console.log(`Condition Icon: ${objectData['current']['condition']['icon']}`);
    }
  };

  data.send();

}

button.addEventListener('click', getData);