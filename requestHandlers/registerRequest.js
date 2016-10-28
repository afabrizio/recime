module.exports =
function registerRequest(db, req, res) {
  let users = db.collection('users');
  users.findOne(
    {username: req.body.username},
    (err, user) => {
      if(user) {
        return res.send('The username already exists, please choose another.');
      } else {
        users.insertOne(
          {username: req.body.username, password: req.body.password},
          (err, insertDetails) => {
            users.findOne(
              {username: req.body.username, password: req.body.password},
              (err, user) => {
                res.json(user);
              }
            )
          }
        )
      }
    }
  )
}
