const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWpheWllemVraWVsIiwiYSI6ImNrY2F2Ymk1NzBjd2sycXVuZ3prcWFqYzUifQ.O8mn_cUTgWI_VjYuKVVWwQ&limit=1`
    
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to location services')
        } else if (res.body.message === 'Not Found') {
            callback('Found No Location Match')
        } else if (res.body.features.length === 0) {
            callback('Unable to find location, try another search')
        } else {
            [long, lat] = res.body.features[0].center;
            location = res.body.features[0].place_name;
            callback(undefined, [location, long, lat])
            //`This location ${location} has Longitude ${long} and Latitude ${lat}`)
        }
    })
}

module.exports = geocode;