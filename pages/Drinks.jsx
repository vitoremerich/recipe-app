import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';
import DrinkCard from './components/DrinkCard';
import { cocktailsAPIOnLoad } from '../services/APIsOnLoad';
import { categoryCocktailAPI,
  recipesOfCocktailsByCategory } from '../services/categorysAPI';
import { recipeDrinksOnLoad, recipesFiltered } from '../store/actions';
import '../styles/foods.css';

class Drinks extends Component {
  constructor() {
    super();

    this.state = {
      recipesOnLoad: [],
      categorys: [],
      filteredCategory: '',
    };
  }

  async componentDidMount() {
    await this.requestAPIOnLoad();
  }

  requestAPIOnLoad = async () => {
    const { saveFilteredRecipes, filterByIngredient } = this.props;
    const allRecipes = await cocktailsAPIOnLoad();
    const categorys = await categoryCocktailAPI();
    if (filterByIngredient.length > 0) {
      this.setState({
        recipesOnLoad: filterByIngredient,
      });
    } else {
      this.setState({
        recipesOnLoad: allRecipes,
        categorys,
      });
    }
    saveFilteredRecipes(allRecipes);
  }

  sendToRecipePage = (recipes) => {
    const { filteredCategory } = this.state;

    if (recipes.length === 1 && filteredCategory === '') {
      return (
        <div>
          <Redirect to={ `/drinks/${recipes[0].idDrink}` } />
        </div>
      );
    }
  }

  onClickCategory = async (category) => {
    const { searchDrink, saveFilteredRecipes } = this.props;
    const { filteredCategory } = this.state;
    const recipesByCategory = await recipesOfCocktailsByCategory(category);

    if (filteredCategory === category) {
      searchDrink(false);
      this.setState({
        filteredCategory: '',
      });
    } else {
      searchDrink(true);
      this.setState({
        filteredCategory: category,
      });
      saveFilteredRecipes(recipesByCategory);
    }
  }

  render() {
    const { recipesOnLoad, categorys } = this.state;
    const { history, search, searchDrink, filteredRecipes } = this.props;

    return (
      <div>
        <Header
          history={ history }
          name="Drinks"
          hideSearch={ false }
          drinkPage
        />
        <div
          className="bg-purple-200
         px-5 grid grid-cols-2 flex items-center"
        >
          <button
            className="bg-violet-500 hover:bg-violet-800
        rounded flex-col flex items-center w-36 ml-2
        active:bg-violet-700 focus:outline-none text-white font-serif
        focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => searchDrink(false) }
          >
            All
          </button>

          {categorys.map(({ strCategory }) => (
            <button
              className="bg-violet-500 hover:bg-violet-800
            rounded flex-col w-38 flex items-center m-2
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => this.onClickCategory(strCategory) }
            >
              {strCategory}
            </button>
          ))}
        </div>
        {search && filteredRecipes
          ? <DrinkCard allRecipes={ filteredRecipes } />
          : <DrinkCard allRecipes={ recipesOnLoad } />}

        { filteredRecipes && this.sendToRecipePage(filteredRecipes) }

        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  recipes: PropTypes.arrayOf,
  search: PropTypes.bool,
  filterByIngredient: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.getRecipesReducer.recipes,
  search: state.getRecipesReducer.searchDrink,
  filteredRecipes: state.getRecipesReducer.filteredRecipes,
  filterByIngredient: state.getRecipesReducer.ingredientsFilter,
});

const mapDispatchToProps = (dispatch) => ({
  searchDrink: (state) => dispatch(recipeDrinksOnLoad(state)),
  saveFilteredRecipes: (state) => dispatch(recipesFiltered(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);
