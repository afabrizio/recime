const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/recime';
const NODE_ENV = process.env.NODE_ENV || 'development';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGO_URI;
var PORT = process.env.PORT || 5000;


MongoClient.connect(MONGODB_URI, (err, db) => {
  if(err) {
    console.error(err);
    process.exit(1);
  }

  const dbRequests = express();
  dbRequests.use(bodyParser.json());

  dbRequests.get('/users', (req, res) => {
    let users = db.collection('users');
    users.find({}).toArray( (err, documents) => {
      res.json(documents);
    })
  })

  dbRequests.listen(PORT, () => {
    NODE_ENV !== 'production' &&
    console.log('Database request server is running at localhost: ' + PORT);
  })
})
