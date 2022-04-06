import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { detailsFoodFetch } from '../../services/detailsAPI';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../../styles/progRecipe.css';
import { changeDoneLocalStorage, changeFavoritesLocalStorage,
  changeIngredientsInProgressLocalStorage } from '../../services/changeLocalStorageFood';

export default class ProgFoodRecipe extends Component {
  constructor() {
    super();
    this.state = { recipes: [],
      ingredients: [],
      copied: false,
      favorited: false,
      disable: true };
  }

  componentDidMount() {
    this.getIdAndApi();
    this.isChecked();
  }

  checkFavorited = () => {
    const { recipes: { idMeal } } = this.state;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      this.setState({ favorited: favorites.find((favorite) => favorite.id === idMeal) });
    }
  }

  getIdAndApi = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchFood = await detailsFoodFetch(id);
    let ingredients = [];
    const MAX_INGREDIENTS = 20;
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (
        fetchFood[0][`strIngredient${i}`] === ''
        || fetchFood[0][`strIngredient${i}`] === null
      ) {
        ingredients = [...ingredients];
      } else {
        ingredients.push([
          fetchFood[0][`strIngredient${i}`],
          fetchFood[0][`strMeasure${i}`],
        ]);
      }
    }
    this.setState({ recipes: fetchFood[0], ingredients });
    this.getRecipesInProgress();
    this.checkFavorited();
  };

  getRecipesInProgress = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { recipes } = this.state;
    const id = recipes.idMeal;
    if (inProgress !== null) this.isChecked(inProgress.meals[id]);
  };

  isChecked = (checkboxes) => {
    const { ingredients } = this.state;
    const checkboxChecked = checkboxes;
    if (checkboxChecked) {
      const ingredientsLocalstorage = ingredients.map((ingredient) => {
        if (checkboxChecked.includes(ingredient[0])) return [...ingredient, true];
        return [...ingredient, false];
      });
      this.setState({ ingredients: ingredientsLocalstorage,
      }, this.disabledButton(true));
    }
  };

  shareButton = () => {
    const { recipes } = this.state;
    navigator.clipboard.writeText(
      `http://localhost:3000/foods/${recipes.idMeal}`,
    );
    this.setState({ copied: true });
  };

  favoriteRecipe = () => {
    this.setState(({ favorited }) => ({ favorited: !favorited }),
      this.setLocalStorage());
  };

  setLocalStorage = () => {
    const { recipes, favorited } = this.state;
    changeFavoritesLocalStorage(recipes, favorited);
  };

  saveIngredients = ({ target }) => {
    const recipeId = target.id;
    const ingredient = target.name;
    const addFirstMeal = { meals: { [recipeId]: [ingredient] } };
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    this.disabledButton(false);
    // caso ja exista algo salvo no localstorage em progresso
    if (inProgress !== null) {
      changeIngredientsInProgressLocalStorage(recipeId, ingredient, inProgress);
      // caso não exista nada salvo no localstorage ainda
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(addFirstMeal));
    }
  };

  disabledButton = (onLoad) => {
    const { ingredients, recipes } = this.state;
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let result = true;
    if (inProgress) {
      if (onLoad) {
        result = inProgress.meals[recipes.idMeal].length !== (ingredients.length);
      } else if (inProgress.meals[recipes.idMeal]) {
        result = inProgress.meals[recipes.idMeal].length !== (ingredients.length - 1);
      }
    }
    this.setState({ disable: result });
  }

  finishRecipe = () => {
    const { recipes } = this.state;
    const { history } = this.props;
    changeDoneLocalStorage(recipes);
    history.push('/done-recipes');
  }

  render() {
    const { recipes, ingredients, copied, favorited, disable } = this.state;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipes.strMealThumb }
          alt={ recipes.strMeal }
          className="mx-auto max-w-full"
        />
        <div className="mx-auto max-w-xs flex justify-between px-4 mt-2.5">
          <h1
            data-testid="recipe-title"
            className="text-3xl font-bold"
          >
            {recipes.strMeal}
          </h1>
          <div>
            <button
              data-testid="share-btn"
              type="button"
              onClick={ this.shareButton }
              className="mr-5"
            >
              <img src={ shareIcon } alt="share" />
            </button>
            {copied && <p>Link copied!</p>}
            {favorited ? (
              <button
                data-testid="favorite-btn"
                type="button"
                onClick={ this.favoriteRecipe }
                src={ blackHeartIcon }
              >
                <img src={ blackHeartIcon } alt="favoritado" />
              </button>
            ) : (
              <button
                data-testid="favorite-btn"
                type="button"
                onClick={ this.favoriteRecipe }
                src={ whiteHeartIcon }
              >
                <img src={ whiteHeartIcon } alt="não favoritado" />
              </button>
            )}
          </div>
        </div>
        <h2
          data-testid="recipe-category"
          className="mx-auto max-w-xs pl-5 mb-2.5 text-2xl"
        >
          {recipes.strCategory}
        </h2>
        <h3 className="mx-auto max-w-xs pl-5 text-xl font-bold">Ingredients</h3>
        <div className="mx-auto max-w-xs py-2.5 px-5 bg-violet-200">
          {ingredients.map((ingredient, index) => (
            <div key={ ingredient }>
              <label
                htmlFor={ recipes.idMeal }
                data-testid={ `${index}-ingredient-step` }
              >
                {ingredient[2] === true ? (
                  <input
                  /* fonte: https://stackoverflow.com/questions/30975459/add-strikethrough-to-checked-checkbox */
                    type="checkbox"
                    id={ recipes.idMeal }
                    name={ ingredient[0] }
                    className="ingredients"
                    onChange={ this.saveIngredients }
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    id={ recipes.idMeal }
                    name={ ingredient[0] }
                    className="ingredients"
                    onChange={ this.saveIngredients }
                  />
                )}
                <span>
                  { `${ingredient[0]} - ${ingredient[1]}`}
                </span>
              </label>
            </div>
          ))}
        </div>
        <h3 className="mx-auto max-w-xs pl-5 mt-2.5 text-xl font-bold">Instructions</h3>
        <p
          data-testid="instructions"
          className="mx-auto max-w-xs py-2.5 px-5 bg-violet-200"
        >
          { recipes.strInstructions }
        </p>
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ disable }
          onClick={ this.finishRecipe }
          className="flex mx-auto w-80 rounded mt-5 text-xl disabled:bg-slate-500
            font-bold items-center justify-center h-10 bg-violet-500 text-white"
        >
          Finish Recipe
        </button>
      </div>
    );
  }
}

ProgFoodRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
