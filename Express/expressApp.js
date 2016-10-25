const { MongoClient } = require('mongodb');
const express  = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

MongoClient.connect('mongodb://localhost:27017/recime', (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }
  console.log('express server request identified')
  express()
    .use(bodyParser.json())
    .use(routes(db))
    .listen(3300, () => {
      console.log('express server listening on port 3300...')
    });

});
