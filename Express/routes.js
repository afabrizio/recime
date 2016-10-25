module.exports = function routes(db) {
  const recime = db.collection('recime');
  const router = require('express').Router();
  const { ObjectId } = require('mongodb');

  router.get('/login', (req, res) => {
    recime.find({}).toArray( (err, documents) => {
      res.json(documents);
    });
  });

  return router;
}
