module.exports =
function saveRecipeRequest(db, req, res) {
  const users = db.collection('users');
  let userId = null;
  let updatingRecipeIndex = null;
  users.findOne(
    {username: req.body.username},
    (err, user) => {
      if(err) {
        process.exit(1);
      }
      userId = user._id;
      switch (req.body.saving) {
        case 'Recipe Content : overview':
          user.recipes.forEach( (recipe, index) => {
            if(recipe.recipeId === req.body.recipeContent.recipeId) {
              updatingRecipeIndex = index;
              return;
            }
          });
          let newRecipes = user.recipes.concat();
          if(updatingRecipeIndex !== null) {
            newRecipes.splice(updatingRecipeIndex, 1, req.body.recipeContent);
            users.updateOne(
              {_id: userId},
              {
                $set: {recipes: newRecipes}
              }
            );
          } else {
            newRecipes.push(req.body.recipeContent);
            users.updateOne(
              {_id: userId},
              {
                $set: {recipes: newRecipes}
              }
            );
          }
          res.json(newRecipes[updatingRecipeIndex || 0]);
          break;

        case 'Recipe Content : ingredients':
          user.recipes.forEach( (recipe, index) => {
            if(req.body.recipeContent[0].updateRecipe
            && recipe.recipeId === req.body.recipeContent[0].updateRecipe) {
              updatingRecipeIndex = index;
              return;
            }
          });
          res.json({});
          break;

        default:

      }
    }
  )
}
