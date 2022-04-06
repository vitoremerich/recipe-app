import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { detailsDrinkFetch } from '../../services/detailsAPI';
import { foodsAPIOnLoad } from '../../services/APIsOnLoad';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { changeFavoritesLocalStorage } from '../../services/changeLocalStorageDrink';
import '../../styles/doneRecipes.css';

export default class DrinkRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      ingredients: [],
      // videoID: '',
      recomendation: [],
      disableStartButton: false,
      showStartButton: true,
      buttonInnerText: 'Iniciar Receita',
      copied: false,
      favorited: false,
    };
  }

  componentDidMount() {
    this.getIdAndApi();
    this.getRecomendationFoods();
  }

  checkFavorited = () => {
    const { recipes } = this.state;
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      this.setState({
        favorited: favorites.find((favorite) => favorite.id === recipes.idDrink),
      });
    }
  }

  getIdAndApi = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchDrink = await detailsDrinkFetch(id);
    const ingredients = [];
    const MAX_INGREDIENTS = 20;
    for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
      if (
        fetchDrink[0][`strIngredient${i}`] !== ''
        && fetchDrink[0][`strIngredient${i}`] !== null
        && fetchDrink[0][`strIngredient${i}`] !== undefined
      ) {
        ingredients.push(
          [fetchDrink[0][`strIngredient${i}`], fetchDrink[0][`strMeasure${i}`]],
        );
      }
    }
    this.setState({
      recipes: fetchDrink[0],
      ingredients,
    });
    this.checkFavorited();
    this.recipeInProgress();
    this.alreadyDone();
  }

  getRecomendationFoods = async () => {
    const MAX_RECOMENDATION = 6;
    const response = await foodsAPIOnLoad();
    const foods = response.slice(0, MAX_RECOMENDATION);
    this.setState({ recomendation: foods });
  }

  alreadyDone = () => {
    const { recipes } = this.state;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      console.log(doneRecipes);
      console.log(recipes.idDrink);
      const check = doneRecipes.find((recipe) => recipe.id === recipes.idDrink);
      if (check) {
        this.setState({ showStartButton: false });
      }
    }
  }

  recipeInProgress = () => {
    const { recipes } = this.state;
    const doneRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let ids = [];
    if (doneRecipes && doneRecipes.cocktails) {
      ids = Object.keys(doneRecipes.cocktails);
      const check = ids.some((id) => id === recipes.idDrink);
      if (check) {
        this.setState({ buttonInnerText: 'Continue Recipe' });
      }
    }
  }

  shareButton = () => {
    const { recipes } = this.state;
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${recipes.idDrink}`);
    this.setState({ copied: true });
  }

  favoriteRecipe = () => {
    this.setState(({ favorited }) => ({ favorited: !favorited }),
      this.setLocalStorage());
  }

  setLocalStorage = () => {
    const { recipes, favorited } = this.state;
    changeFavoritesLocalStorage(recipes, favorited);
  };

  render() {
    const {
      recipes, ingredients, recomendation, disableStartButton,
      buttonInnerText, copied, favorited, showStartButton,
    } = this.state;
    const { history } = this.props;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ recipes.strDrinkThumb }
          alt={ recipes.strDrink }
          className="mx-auto max-w-full"
        />
        <div className="mx-auto max-w-xs flex justify-between px-4 mt-2.5">
          <h1
            data-testid="recipe-title"
            className="text-3xl font-bold"
          >
            { recipes.strDrink }
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
            { copied && <p>Link copied!</p>}
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
        { recipes.strAlcoholic === 'Alcoholic'
          ? (
            <h2
              data-testid="recipe-category"
              className="mx-auto max-w-xs pl-5 mb-2.5 text-2xl"
            >
              Alcoholic
            </h2>)
          : (
            <h2
              data-testid="recipe-category"
              className="mx-auto max-w-xs pl-5 mb-2.5 text-2xl"
            >
              Non alcoholic
            </h2>)}
        <h3 className="mx-auto max-w-xs pl-5 text-xl font-bold">Ingredients</h3>
        <div className="mx-auto max-w-xs py-2.5 px-5 bg-violet-200">
          {ingredients.map((ingredient, index) => (
            <div key={ index }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                {`- ${ingredient[0]} - ${ingredient[1]}`}
              </p>
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
        <section className="mx-auto max-w-xs overflow-x-hidden">
          <h3 className="pl-5 mt-2.5 text-xl font-bold">Recommended</h3>
          <section className="mx-auto max-w-x flex gap-2.5 overflow-x-scroll">
            { recomendation.map((recipe, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ recipe.strMeal }
                className="min-w-[48%] mb-5"
              >
                <img
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${index}-card-img` }
                  className="rounded"
                />
                <p>{ recipe.strCategory }</p>
                <p data-testid={ `${index}-recomendation-title` }>{ recipe.strMeal }</p>
              </div>
            )) }
          </section>
        </section>
        <footer>
          {showStartButton && (
            <button
              data-testid="start-recipe-btn"
              type="button"
              disabled={ disableStartButton }
              onClick={ () => history.push(`/drinks/${recipes.idDrink}/in-progress`) }
              className="flex mx-auto w-80 rounded mt-5 text-xl disabled:bg-slate-500
                font-bold items-center justify-center h-10 bg-violet-500 text-white"
            >
              {buttonInnerText}
            </button>)}
        </footer>
      </div>
    );
  }
}

DrinkRecipe.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
