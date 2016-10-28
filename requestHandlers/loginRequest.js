module.exports =
function loginRequest(db, req, res) {
  let users = db.collection('users');
  users.findOne(
    {username: req.body.username},
    (err, user) => {
      if(user) {
        users.findOne(
          {username: req.body.username, password: req.body.password},
          (err, user) => {
            if(user) {
              return res.json(user);
            } else {
              return res.json('invalid password')
            }
          }
        )
      } else {
        return res.json('invalid username');
      }
  })
}
