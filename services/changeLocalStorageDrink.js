export const changeFavoritesLocalStorage = (recipes, favorited) => {
  const allFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  let alcoholic = '';

  if (recipes.strAlcoholic === 'Alcoholic') {
    alcoholic = 'Alcoholic';
  } else {
    alcoholic = 'Non alcoholic';
  }

  const favorite = {
    id: recipes.idDrink,
    type: 'drink',
    nationality: '',
    category: recipes.strCategory,
    alcoholicOrNot: alcoholic,
    name: recipes.strDrink,
    image: recipes.strDrinkThumb,
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
        (recipe) => recipe.id !== recipes.idDrink,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([favorite]));
  }
};

export const changeIngredientsInProgressLocalStorage = (recipeId,
  ingredient, inProgress) => {
  // caso ja exista alguma bebida salva no localstorage
  if (inProgress.cocktails) {
    if (inProgress.cocktails[recipeId]) {
      let savedIngredients = inProgress.cocktails[recipeId];
      const isSaved = savedIngredients.some((savedIngredient) => (
        savedIngredient === ingredient));
        // caso ja exista aquele ingrediente salvo no localstorage
      if (isSaved) {
        savedIngredients = [...savedIngredients];
        // caso o ingrediente ainda não eseteja salvo no localstorage
      } else {
        savedIngredients = [...savedIngredients, ingredient];
      }
      const cocktails = { ...inProgress.cocktails, [recipeId]: savedIngredients };
      inProgress = { ...inProgress, cocktails };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      const cocktails = { ...inProgress.cocktails, [recipeId]: [ingredient] };
      inProgress = { ...inProgress, cocktails };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  // caso exista algo salvo no localstorage, mas que não seja alguma bebida
  } else {
    inProgress = { ...inProgress, cocktails: { [recipeId]: [ingredient] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
};

export const changeDoneLocalStorage = (recipe) => {
  const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  let alcoholic = '';

  if (recipe.strAlcoholic === 'Alcoholic') {
    alcoholic = 'Alcoholic';
  } else {
    alcoholic = 'Non alcoholic';
  }

  const newDoneRecipe = {
    id: recipe.idDrink,
    type: 'drink',
    nationality: '',
    category: recipe.strCategory,
    alcoholicOrNot: alcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
    doneDate: 'data',
    tags: [],
  };

  if (allRecipes) {
    allRecipes.push(newDoneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(allRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
  }
};
