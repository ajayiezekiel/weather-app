const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWpheWllemVraWVsIiwiYSI6ImNrY2F2Ymk1NzBjd2sycXVuZ3prcWFqYzUifQ.O8mn_cUTgWI_VjYuKVVWwQ&limit=1`
    
    request({ url, json: true }, (err, res) => {
        if (err) {
            return callback('Unable to connect to location services')
        } 
        const { features, message } = res.body;
        const [longitude, latitude] = features[0].center;
        const location = features[0].place_name;
        
        if (message === 'Not Found') {
            callback('Found No Location Match')
        } else if (features.length === 0) {
            callback('Unable to find location, try another search')
        } else {
            callback(undefined, {
                    latitude,
                    longitude,
                    location
                })
            //`This location ${location} has Longitude ${long} and Latitude ${lat}`)
        }
    })
}

module.exports = geocode;