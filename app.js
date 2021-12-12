//const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


geocode('lagos', (err, data) => {
    if (err) {
        console.log('Error:', err)
    } else {
        forecast(data[0], data[1], data[2], (error, new_data) => {
            if (error) {
                console.log('Error:', error)
            } else {
                console.log(new_data)
            }
        })
    }
    //console.log('Data:', data)
})
