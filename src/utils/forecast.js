const request = require('request')

const forecast= (latitude, longitude, callback)=>{

    // const url = 'http://api.weatherstack.com/current?access_key=0f24a1a03a6777380e82193c3f880cac&query=-75.7088,44.1545&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=0f24a1a03a6777380e82193c3f880cac&query=' + latitude + ',' + longitude

    request({ url:url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect weather service!')
        }else if(response.body.error){
            callback('Unable to find location')
        }else{
            //console.log(response.body.current.weather_descriptions + '. It is currently ' +  response.body.current.temperature +' degrees out.', 'It feels like '+ response.body.current.feelslike +' degrees out.' )
            const weatherDesc = response.body.current.weather_descriptions
            const Temp = response.body.current.temperature
            const feelsLikeTemp = response.body.current.feelslike
            const humidity = response.body.current.humidity
            callback(undefined,{weatherDesc, Temp, feelsLikeTemp, humidity})
        }
    })
}

module.exports = forecast
