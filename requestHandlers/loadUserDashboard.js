module.exports =
function loadUserDashboard(db, req, res) {
  let users = db.collection('users');
  users.findOne(
    {username: req.params.user},
    (err, user) => {
      res.json(user);
  })
}
