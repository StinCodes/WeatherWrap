const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();

const API_KEY = process.env.API_KEY;
const port = 3000;

app.get("/", (req, res) => {
  const location = req.query.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  axios.get(url).then((res) => {
    const data = res.data;
    const cityName = data.name;
    const celsiusTemperature = data.main.temp;
    // const celsiusToFahrenheit = (celsiusTemperature) => {
    //   (celsiusTemperature * 9) / 5 + 32;
    // };
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    const weatherMessage = `City: ${cityName} <br> Temperature: ${celsiusTemperature} <br> Sunset Time: ${sunsetTime}`;

    res
      .send(
        `<html><body><div id ='container'><h1>${weatherMessage}</h1></div></body></html>`
      )
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error...");
      });
  });
});

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}`);
});
