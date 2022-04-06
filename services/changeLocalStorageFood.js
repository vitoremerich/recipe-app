export const changeFavoritesLocalStorage = (recipes, favorited) => {
  const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const favorite = {
    id: recipes.idMeal,
    type: 'food',
    nationality: recipes.strArea,
    category: recipes.strCategory,
    alcoholicOrNot: '',
    name: recipes.strMeal,
    image: recipes.strMealThumb,
  };

  if (allFavorites !== null) {
    if (!favorited) {
      if (allFavorites.length > 0) {
        allFavorites.push(favorite);
        localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
      }
    } else {
      const newFavorites = allFavorites.filter(
        (recipe) => recipe.id !== recipes.idMeal,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
  }
};

export const changeIngredientsInProgressLocalStorage = (recipeId,
  ingredient, inProgress) => {
  // caso ja exista alguma comida salva no localstorage
  if (inProgress.meals) {
    if (inProgress.meals[recipeId]) {
      let savedIngredients = inProgress.meals[recipeId];
      const isSaved = savedIngredients.some((savedIngredient) => (
        savedIngredient === ingredient));
        // caso ja exista aquele ingrediente salvo no localstorage
      if (isSaved) {
        savedIngredients = [...savedIngredients];
        // caso o ingrediente ainda não eseteja salvo no localstorage
      } else {
        savedIngredients = [...savedIngredients, ingredient];
      }
      const meals = { ...inProgress.meals, [recipeId]: savedIngredients };
      inProgress = { ...inProgress, meals };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      const meals = { ...inProgress.meals, [recipeId]: [ingredient] };
      inProgress = { ...inProgress, meals };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  // caso exista algo salvo no localstorage, mas que não seja alguma bebida
  } else {
    inProgress = { ...inProgress, meals: { [recipeId]: [ingredient] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
};

export const changeDoneLocalStorage = (recipe) => {
  const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const newDoneRecipe = {
    id: recipe.idMeal,
    type: 'food',
    nationality: recipe.strArea,
    category: recipe.strCategory,
    alcoholicOrNot: '',
    name: recipe.strMeal,
    image: recipe.strMealThumb,
    doneDate: 'data',
    tags: recipe.strTags.split(', '),
  };

  if (allRecipes) {
    allRecipes.push(newDoneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(allRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
  }
};
