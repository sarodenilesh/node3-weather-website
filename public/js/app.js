console.log('Client side JS file')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Test'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    // console.log(Location)
    messageOne.textContent = 'loading..'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }else{
                // console.log(data.location)
                 console.log(data.forecast)
                 messageOne.textContent = 'Location: '+ data.location 
                 messageTwo.textContent = 'Temprature: '+ data.forecast.Temp + ' Feels Like: ' +data.forecast.feelsLikeTemp
            }
        })
    })
})