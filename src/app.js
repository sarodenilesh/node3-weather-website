const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view locations
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',
        name: 'Nilesh Sarode'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Nilesh Sarode'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        helpText:'help text',
        title: 'Help',
        name: 'Nilesh Sarode'
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        errorText: 'Help article not found',
        name: 'Nilesh Sarode'
    })
})


app.get('/weather', (req, res)=>{
    address = req.query.address
    if(!address){
        return res.send({
            error: 'Provide correct address'
        })
    }
    
    geocode(address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: data,
                location,
                address
            })
        })
        
    })
    // res.send({
    //             Forecast: 'Sunny',
    //             Location: req.query.address
    //         })
})

app.get('/products', (req, res) => {

    if(!req.query.search){
       return  res.send({
            error : 'you must provide serach term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404',
        errorText: 'My 404 page',
        name: 'Nilesh Sarode'
    })
})

app.listen(3000, (req, res)=>{
    console.log('server is running on port 3000')
})