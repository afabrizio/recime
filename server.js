const express = require('express');
const path = require('path');
const compression = require('compression');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const loginRequest = require('./requestHandlers/loginRequest.js');
const registerRequest = require('./requestHandlers/registerRequest.js');

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/recime';
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI;
var PORT = process.env.PORT || 8080;



MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  const app = express();

  app.use(compression());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());

  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.post( '/users', function(req, res) {loginRequest(db, req, res)} );

  app.post('/register', function(req, res) {registerRequest(db, req, res)} );

  app.listen(PORT, () => {
    NODE_ENV !== 'production' &&
    console.log('Server is running at localhost: ' + PORT);
  })

});
