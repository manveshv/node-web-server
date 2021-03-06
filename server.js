const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log(err);
    }
  })
  next();
})

//Maintenance Page Code
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle:  'Site Under Maintenance',
//     currentYear: new Date().getFullYear(),
//     bodyContent:'The Site is under maintenance'
//   });
// })

app.get ('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage:'Hello Express!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle:  'Projects',
    bodyContent: 'Current Fiscal Year Projects Information',
    currentYear:  new Date().getFullYear()
  })
})

app.get('/bad', (req, res) => {
  res.send('Bad Page');
})


app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
