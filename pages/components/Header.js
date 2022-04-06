import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ingredientFoodAPI, ingredientCocktailAPI } from '../../services/IngredientAPI';
import { nameFoodAPI, nameCocktailAPI } from '../../services/nameAPI';
import { firstLetterFoodAPI,
  firstLetterCocktailAPI } from '../../services/firstLetterAPI';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import {
  recipeDrinksOnLoad,
  recipeFoodsOnLoad,
  recipesFiltered,
  responseAPI,
} from '../../store/actions';
import '../../styles/header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBar: '',
      showBar: false,
      searchRadio: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    this.setState(({ showBar }) => ({
      showBar: !showBar,
    }));
  }

  sendToProfile = () => {
    const { history } = this.props;
    history.push('/profile');
  }

  searchRecipe = async () => {
    const { drinkPage, searchFood, searchDrink } = this.props;

    if (drinkPage) {
      await this.cocktailsAPI();
      searchDrink(true);
    } else {
      await this.foodsAPI();
      searchFood(true);
    }
  }

  foodsAPI = async () => {
    const { searchBar, searchRadio } = this.state;
    const { saveRecipesFiltered } = this.props;
    let response = [];

    if (searchRadio === 'ingredient') {
      response = await ingredientFoodAPI(searchBar);
      saveRecipesFiltered(response);
    } else if (searchRadio === 'name') {
      response = await nameFoodAPI(searchBar);
      saveRecipesFiltered(response);
    } else if (searchRadio === 'first-letter') {
      if (searchBar.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        response = await firstLetterFoodAPI(searchBar);
        saveRecipesFiltered(response);
      }
    }

    if (!response) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  cocktailsAPI = async () => {
    const { searchBar, searchRadio } = this.state;
    const { saveRecipesFiltered } = this.props;
    let response = [];

    if (searchRadio === 'ingredient') {
      response = await ingredientCocktailAPI(searchBar);
      saveRecipesFiltered(response);
    } else if (searchRadio === 'name') {
      response = await nameCocktailAPI(searchBar);
      saveRecipesFiltered(response);
    } else if (searchRadio === 'first-letter') {
      if (searchBar.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        response = await firstLetterCocktailAPI(searchBar);
        saveRecipesFiltered(response);
      }
    }

    if (!response) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  render() {
    const { searchBar, showBar } = this.state;
    const { name, hideSearch } = this.props;
    return (
      <header
        className="bg-gradient-to-b from-purple-400
      to-purple-200 border-purple-500"
      >
        <div>
          <h1 className="font-bold ml-40" data-testid="page-title">{name}</h1>
          <div className="flex-col">
            <button
              className="ml-20"
              type="button"
              onClick={ this.sendToProfile }
              data-testid="profile-top-btn"
              src={ profileIcon }
            >
              <img src={ profileIcon } alt="profileIcon" />
            </button>
            {!hideSearch && (
              <button
                className="ml-36"
                onClick={ this.handleClick }
                type="button"
                data-testid="search-top-btn"
                src={ searchIcon }
              >
                <img src={ searchIcon } alt="searchIcon" />
              </button>
            )}
            {showBar ? (
              <div className="flex-col flex items-center">
                <input
                  className="mx-auto px-4 py-2 border-2 mb-2.5
                  text-gray-700 bg-white border-slate-200
                  rounded focus:border-purple-500 focus:bg-white leading-tight
                  focus:border-purple-500 focus:outline-none"
                  data-testid="search-input"
                  type="text"
                  name="searchBar"
                  value={ searchBar }
                  onChange={ this.handleChange }
                />
                <label className="font-bold" htmlFor="ingredient">
                  <input
                    type="radio"
                    id="ingredient"
                    name="searchRadio"
                    value="ingredient"
                    data-testid="ingredient-search-radio"
                    onChange={ this.handleChange }
                  />
                  Ingredient
                </label>
                <label className="mr-8 font-bold" htmlFor="name">
                  <input
                    type="radio"
                    id="name"
                    name="searchRadio"
                    value="name"
                    data-testid="name-search-radio"
                    onChange={ this.handleChange }
                  />
                  Name
                </label>
                <label className="font-bold" htmlFor="first-letter">
                  <input
                    type="radio"
                    id="first-letter"
                    name="searchRadio"
                    value="first-letter"
                    data-testid="first-letter-search-radio"
                    onChange={ this.handleChange }
                  />
                  First letter
                </label>
                <button
                  className="bg-violet-500 hover:bg-violet-600 rounded my-2 w-20 h-8 mt-3
                  active:bg-violet-700 focus:outline-none text-white font-serif
                  focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
                  type="button"
                  data-testid="exec-search-btn"
                  onClick={ this.searchRecipe }
                >
                  Search
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveRecipes: PropTypes.func,
  searchDrink: PropTypes.func,
  searchFood: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  saveRecipes: (state) => dispatch(responseAPI(state)),
  searchFood: (state) => dispatch(recipeFoodsOnLoad(state)),
  searchDrink: (state) => dispatch(recipeDrinksOnLoad(state)),
  saveRecipesFiltered: (state) => dispatch(recipesFiltered(state)),
});

export default connect(null, mapDispatchToProps)(Header);
