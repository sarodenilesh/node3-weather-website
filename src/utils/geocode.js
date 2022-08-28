const request = require('request')

// KEY: AIzaSyCmdwBNeTvtcYneLXVtOnjsuKN4mQ7E3nI


const geocode = (address, callback)=>{
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyCmdwBNeTvtcYneLXVtOnjsuKN4mQ7E3nI'

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to service!')
        }else if(response.body.status!=='OK'){
            callback('Unable to find Location. Try another search.')
        }else{
            const latitude = response.body.results[0].geometry.location.lat;
            const longitude = response.body.results[0].geometry.location.lng; 
            const location = response.body.results[0].address_components[0].long_name; 
            callback(undefined,{location, latitude,longitude}) 
        }
    })
}

module.exports = geocode