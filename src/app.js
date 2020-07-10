const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 8080 ;

console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname,'../public'));
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');
app.use(express.static(publicDirPath));

app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Use this site to get your weather!',
        name: 'Ashish Kumar',
        commonTitle:"Node Js tutorial"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Hello Ashish ! . Welcome to about Page.',
        name: 'Ashish Kumar',
        commonTitle:"Node Js tutorial"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Hello Ashish ! . Welcome to help page.',
        name: 'Ashish Kumar',
        commonTitle:"Node Js tutorial"
    })
})
app.get('/weather',(req, res) =>{
    if(!req.query.address) {
        return res.send({
            error : 'Please provide address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {})=> {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, foreCast) => {
            if(error) { return res.send({error})}
            res.send({
                foreCast,
                location,
                address: req.query.address
            })
        })
    })
    // console.log('address: ', req.query.address);
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'India',
    //     address:req.query.address 
    // })
    
})
app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'Please pass search query'
        })
    }
    console.log('Search query: ', req.query.search);
    res.send({
        products : []
    })
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorTitle: 'Could not found page inside help',
        title: 'Hello Ashish ! . I am ready to help you.',
        name: 'Ashish Kumar',
        commonTitle:"Node Js tutorial"
    })
})

app.get('*', (req, res)=> {
    res.render('404',{
        errorTitle: 'Page not found',
        title: 'Hello Ashish ! Page is not availble',
        name: 'Ashish Kumar',
        commonTitle:"Node Js tutorial"
    })
})
app.listen(port,() => {
    console.log('Serve is up and running on post ', port);
    
})