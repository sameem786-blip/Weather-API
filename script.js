const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000;


app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/index.html`)

})
app.post("/", (req, res) => {
    console.log(req.body.cityName);
    query = req.body.cityName;
    apiKey = process.env.APIKEY;
    unit = `metric`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon = weatherData.weather[0].icon;
            const imgUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<p>The weather is ${weatherDescription}</p>  `);
            res.write(`<h1>The temperature in ${query} is ${temp} degree C</h1>`);
            res.write(`<img src=${imgUrl}>`)
            res.send();
        })
    })
})
app.listen(port, () => console.log(`Running on port: ${port}`));