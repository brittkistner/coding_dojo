var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var app = express();
app.use(express.static(path.join(__dirname, "./client")));
app.set('views', path.join(__dirname, "./client/views"));
app.set('view engine', 'ejs');

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the mongoose_dashboard database
mongoose.connect('mongodb://localhost/mongoose_dashboard');

// SCHEMA
var CapybaraSchema = new mongoose.Schema({
  name: String,
  color: String,
  favoriteFood: String
})

mongoose.model('Capybara', CapybaraSchema); // We are setting this Schema in our Models as 'Capybara'
var Capybara = mongoose.model('Capybara'); // Retrieve the Schema from our Models, named 'Capybara'

// Displays all of the Capybaras
app.get('/', function (request, response) {
  Capybara.find({}, function(err, capybaras) {
    if (err) {
      console.log('DB error');
    } else {
      console.log('DB success');
      console.log(capybaras[0]._id.toString())
      response.render('index', {capybaras: capybaras});
    }
  })
})

// Add Capy
app.get('/capybaras/new', function (request, response) {
  response.render('new_capybara');
})

// Should be the action attribute for the form in the above route (GET '/capybaras/new').
app.post('/capybaras', function(request, response) {
  console.log("++++++++++++")
  console.log(request);
  console.log(request.body);
  console.log("++++++++++++")
  var capy = new Capybara({
    name: request.body.name,
    color: request.body.color,
    favoriteFood: request.body.favoriteFood
    })
  capy.save(function(err){
    if(err){
      console.log("DB save error");
    } else {
      console.log("DB save success!");
      response.redirect('/');
    }
  })
})

// Displays information about one capybara.
app.get('/capybaras/:id', function (request, response) {
  var id = request.params.id;
  console.log(id)
  Capybara.findOne({_id: id }, function(err, capybara) {
    if (err){
      console.log("Could not get capy out of the DB");
    } else {
      response.render('capybara', {capybara: capybara});
    }
  })
})

// Should show a form to edit an existing capybara.
app.get('/capybaras/:id/edit', function (request, response) {
  var id = request.params.id;
  console.log(id)
  Capybara.findOne({_id: id }, function(err, capybara) {
    if (err) {
      console.log("Could not get capy out of the DB");
    } else{
      console.log(capybara);
      response.render('edit_capybara', {capybara: capybara});
    }
  })
})

// Should be the action attribute for the form in the above route (GET '/mongooses/:id/edit')
app.post('/capybaras/:id', function (request, response) {
  var id = request.params.id;
  console.log(id)
  Capybara.update(
    {_id: id },
    {
      name: request.body.name,
      color: request.body.color,
      favoriteFood: request.body.favoriteFood
    }, function(err){
      if(err){
        console.log('DB Error Updating');
      } else {
        console.log('DB Updated');
        response.redirect('/');
      }
  })
})

// Should delete the capybara from the database by ID.
app.post('/capybaras/:id/destroy', function (request, response) {
  var id = request.params.id;
  console.log(id)
  Capybara.remove({_id: id}, function(err) {
    if (err){
      console.log('Capy not deleted');
    } else {
      console.log('Capy deleted!');
      response.redirect('/');
    }
  })
})

// RUN SERVER
app.listen(8000, function(){
  console.log("Listening on port 8000");
})
