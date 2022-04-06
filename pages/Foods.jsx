import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { foodsAPIOnLoad } from '../services/APIsOnLoad';
import FoodCard from './components/FoodCard';
import { categoryFoodAPI,
  recipesOfFoodsByCategory } from '../services/categorysAPI';
import { recipeFoodsOnLoad, recipesFiltered } from '../store/actions';
import '../styles/foods.css';

class Foods extends Component {
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
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }

  requestAPIOnLoad = async () => {
    const { saveFilteredRecipes, filterByIngredient } = this.props;
    const allRecipes = await foodsAPIOnLoad();
    const categorys = await categoryFoodAPI();
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
          <Redirect to={ `/foods/${recipes[0].idMeal}` } />
        </div>
      );
    }
  }

  onClickCategory = async (category) => {
    const { searchFood, saveFilteredRecipes } = this.props;
    const { filteredCategory } = this.state;
    const recipesByCategory = await recipesOfFoodsByCategory(category);

    if (filteredCategory === category) {
      searchFood(false);
      this.setState({
        filteredCategory: '',
      });
    } else {
      searchFood(true);
      this.setState({
        filteredCategory: category,
      });
      saveFilteredRecipes(recipesByCategory);
    }
  }

  render() {
    const { recipesOnLoad, categorys } = this.state;
    const { history, search, searchFood, filteredRecipes } = this.props;

    return (
      <div>
        <Header
          history={ history }
          name="Foods"
          hideSearch={ false }
          drinkPage={ false }
        />
        <div className="bg-purple-200 px-5 grid grid-cols-2 flex items-center">
          <button
            className="bg-violet-500 hover:bg-violet-800 w-36 rounded
            justify-center ml-2 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            type="button"
            data-testid="All-category-filter"
            onClick={ () => searchFood(false) }
          >
            All
          </button>

          {categorys.map(({ strCategory }) => (
            <button
              className="bg-violet-500 w-36 hover:bg-violet-800
            rounded w-90 ml-2 h-6 mt-3 justify-center
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
          ? <FoodCard allRecipes={ filteredRecipes } />
          : <FoodCard allRecipes={ recipesOnLoad } />}

        { filteredRecipes && this.sendToRecipePage(filteredRecipes) }
        <Footer />
      </div>
    );
  }
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  recipes: PropTypes.arrayOf,
  search: PropTypes.bool,
  filteredRecipes: PropTypes.arrayOf,
  filterByIngredient: PropTypes.arrayOf,
}.isRequired;

const mapStateToProps = (state) => ({
  recipes: state.getRecipesReducer.recipes,
  search: state.getRecipesReducer.searchFood,
  filteredRecipes: state.getRecipesReducer.filteredRecipes,
  filterByIngredient: state.getRecipesReducer.ingredientsFilter,
});

const mapDispatchToProps = (dispatch) => ({
  searchFood: (state) => dispatch(recipeFoodsOnLoad(state)),
  saveFilteredRecipes: (state) => dispatch(recipesFiltered(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
