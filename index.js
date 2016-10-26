const { MongoClient } = require('mongodb');
const express  = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const app = express();

MongoClient.connect('mongodb://localhost:27017/recime', (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  app.set('port', (process.env.PORT || 5000));

  app.use('/', express.static(__dirname + '/dist/public') );
  app.use(bodyParser.json());
  app.use(routes(db));

  app.listen( (process.env.PORT || 5000), function() {
      console.log('Node app is running on port', (process.env.PORT || 5000) );
  });
});
