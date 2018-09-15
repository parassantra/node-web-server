const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();//new Date().getFullYear();
});
app.get('/', (req, res) => {
  //res.send("Hello, Express!!");
  //res.send("<h1>Hello, Express!!</h1>");
  // res.send({
  //   name: 'paras',
  //   likes: ['Biking', 'Travel'],
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page!',
    welcomeMessage: 'Hi, Welcome to my Website!!',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page!',
  });
});

app.get('/projects', (req, res) => {
  res.render('project.hbs', {
    pageTitle: 'Project Page!',
  });
});

app.get('/bad', (req, res) => {
  res.send('Unable to handle this request!!');
});

app.listen(port, () => {
  console.log('Server is up and running on Port: 3000');
});
