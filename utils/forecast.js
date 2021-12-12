const request = require('postman-request');


const forecast = (location, long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=edc66d6bf4a9fe058dcf5a5d0529208b&query=${lat},${long}&units=f`

    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to weather services', undefined);
        } else if (res.body.error) {
            callback(`Unable to find location: ${res.body.error.info}`, undefined)
        } else {
            callback(undefined, `${location} is ${res.body.current.weather_descriptions[0]}, the temperature is ${res.body.current.temperature}, while the feels like temperature is ${res.body.current.feelslike}`);
        }
    })
}

module.exports = forecast;