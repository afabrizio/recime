const { MongoClient } = require('mongodb');
const express  = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes.js');

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/recime';
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();

MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  app.set('port', PORT);

  app.use('/', express.static(__dirname + '/dist/public') );
  app.use(bodyParser.json());
  app.use(routes(db));

  app.listen( PORT, function() {
      NODE_ENV !== 'production' &&
      console.log('Node app is running on port', PORT );
  });
});
