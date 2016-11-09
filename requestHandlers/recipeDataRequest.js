module.exports =
function recipeDataRequest(db, req, res) {
  const users = db.collection('users');
  var targetRecipeData = {};

  users.findOne({username: req.body.username}, (err, user) => {
    if(err) {
      process.exit(1);
    }
    user.recipes.forEach(recipe => {
      if(recipe.recipeId === req.body.recipeId) {
        targetRecipeData = recipe;
        res.json(targetRecipeData);
        return;
      }
    })
  });
}
