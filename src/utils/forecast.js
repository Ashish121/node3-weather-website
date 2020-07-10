const request = require('request');


const url = 'http://api.weatherstack.com/current?access_key=a64da2a12ba642f7d237cdcb96d068e1';
const getWeather = (lat, lng, callback) => {
    console.log(lat, lng);
    request({
        url: `${url}&query=${lat},${lng}&units=m`,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Something went wrong !', undefined)
            return false;
        }
        if (body.error) {
            callback('Unable to find weather details', undefined);
            return false;
        }
        const { weather_descriptions , temperature, feelslike} = body.current;
        callback(undefined, `${weather_descriptions[0]?weather_descriptions[0]:'Unknown'}. It is currenctly ${temperature} degrees out.It feels like ${feelslike} degrees out.'`)
    })
}

module.exports = getWeather ;