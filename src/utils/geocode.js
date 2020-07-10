const request = require('request');

const getLocationCoordinates = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYXNoaXNoc2luaGEzMzUiLCJhIjoiY2s5bzVqdWRnMDVkczNscDJvaHFyaHp6MCJ9.4mBF3wt5Ncd4zfFR00OILA&limit=1`;
    request({
        url,
        json: true
    }, ( error , {body}) => {
        if (error) {
            callback(`Unbale to connect to the server ${error.hostname}. Kinldy connect to the wifi to proceed further.`, undefined);
            return false;
        }
        if (body.features.length === 0) {
            callback('Unable to find coordinates.', undefined)
            return false;
        }
        // console.log(response.body.features);
        const { features } = body;
        const lat = features[0].center[1];
        const lng = features[0].center[0];
        const placename = features[0].place_name;
        // console.log('Received lat as: ' + lat + ' and lng as : ' + lng);
        callback(null, { latitude: lat, longitude: lng, location: placename});
    });
}

module.exports = getLocationCoordinates ;