const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine',hbs)


app.use((req,res,next)=>{

  var now = new Date().toString()
  var log = `${now} : ${req.method} ${req.url}`
  fs.appendFile('server.log',log + '\n', (err)=>{
    if (err){
      console.log('file error cannot append to server.log')
    }
  })
  next()
})

app.use((req,res,next)=>{
  res.render('maintenance.hbs')
})//don't call nex - stops app, but doesn't work on statu=ic
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})
//hit route and send info back. http get - URL /
//function to run to person who made request
//req  - coming in - body

app.get('/', (req, res) => {
    res.render('home.hbs',{
      pageTitle:'Home page',
      welcomeMessage:'Welcome to my cool website'
  })
})

app.get('/about', (req,res) =>{
  // res.send('about page')
  res.render('about.hbs',{
    pageTitle:'About page'
  })
})

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage:'error sending data'
  })
})

app.listen(3000,() => {
  console.log('server is up on port 3000')
})
