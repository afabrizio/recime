const router = require('express').Router();
const path = require('path');
const loginRequest = require('./requestHandlers/loginRequest.js');
const registerRequest = require('./requestHandlers/registerRequest.js');
const loadUserDashboard = require('./requestHandlers/loadUserDashboard.js');

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

  router.post( '/users', function(req, res) {loginRequest(db, req, res)} );

  router.post('/register', function(req, res) {registerRequest(db, req, res)} );

  router.get('/:user/dashboard', function(req, res) {loadUserDashboard(db, req, res)} );

  return router;
}
