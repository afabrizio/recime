const router = require('express').Router();
const path = require('path');
const loginRequest = require('./requestHandlers/loginRequest.js');
const registerRequest = require('./requestHandlers/registerRequest.js');
const saveRecipeRequest = require('./requestHandlers/saveRecipeRequest.js');

module.exports = function routes(db) {

  router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  router.post('/users', function(req, res) {loginRequest(db, req, res)} );

  router.post('/register', function(req, res) {registerRequest(db, req, res)} );

  router.put('/users', function(req, res) {saveRecipeRequest(db, req, res)} );

  return router;
}
