module.exports =
function saveRecipeRequest(db, req, res) {
  const users = db.collection('users');
  users.findOne(
    {username: req.body.username},
    (err, user) => {

      if(err) {
        process.exit(1);
      }

      var userId = user._id;
      var updatedRecipes = user.recipes.concat();
      var responseToClient = {};

      switch (req.body.saving) {
        case 'recipe-content : overview':
          let found = false;
          updatedRecipes.forEach( (recipe, index) => {
            if(recipe.recipeId === req.body.recipeContent.recipeId) {
              found = true;
              updatedRecipes[index] = req.body.recipeContent;
            }
          });
          if(found === false) {
            updatedRecipes.push(req.body.recipeContent);
            responseToClient = updatedRecipes[updatedRecipes.length-1];
          }
          break;

        case 'recipe-content : ingredients':
          updatedRecipes.forEach( recipe => {
            if(recipe.recipeId === req.body.currentRecipe) {
              recipe.createStage = 'ingredients';
              recipe.ingredients = req.body.recipeContent;
              responseToClient = recipe;
            }
          })
          break;

        case 'recipe-content : steps':
          updatedRecipes.forEach( recipe => {
            if(recipe.recipeId === req.body.currentRecipe) {
              recipe.steps = req.body.recipeContent;
              recipe.createStage = 'steps'
              responseToClient = recipe;
            }
          })
          break;

        case 'recipe-content : completed':
          updatedRecipes.forEach( recipe => {
            if(recipe.recipeId === req.body.currentRecipe) {
              recipe.steps = req.body.recipeContent;
              recipe.createStage = 'completed'
              responseToClient = recipe;
            }
          })
          break;

        default:

      }

      //update the database:
      users.updateOne(
        {_id: userId},
        {
          $set: {recipes: updatedRecipes}
        }
      )

      //respond to the client:
      res.json(responseToClient);
    }
  )
}
