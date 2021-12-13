const request = require('postman-request');


const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=edc66d6bf4a9fe058dcf5a5d0529208b&query=${lat},${long}&units=f`;

    request({ url, json: true }, (err, res) => {
        const { error, current } = res.body;
        const { weather_descriptions, temperature, feelslike } = current;

        if (err) {
            callback('Unable to connect to weather services', undefined);
        } else if (typeof(long)  === 'string' || typeof(lat)  === 'string') {
            callback('Coordinate error')
        } else if (error) {
            callback(`Unable to find location: ${error.info}`, undefined)
        } else {
            callback(undefined, `${weather_descriptions[0]}, the temperature is ${temperature}, while the feels-like temperature is ${feelslike}`);
        }
    });
};

module.exports = forecast;