import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { exploreDrinkIngredients }
from '../../services/exploreIngredientsAPI';
import { ingredientsFiltered } from '../../store/actions';
import { ingredientCocktailAPI } from '../../services/IngredientAPI';

class ExploreDrinksIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    this.getDrinkIngredients();
  }

  getDrinkIngredients = async () => {
    const fetchIngredients = await exploreDrinkIngredients();
    const filtred = fetchIngredients.map(({ strIngredient1 }) => strIngredient1);
    this.setState({
      ingredients: filtred,
    });
  }

  handleClickFilter = async (ingredient) => { /// func para mandar p store
    const { filterByIngredient, history } = this.props;
    const ingredientRecipes = await ingredientCocktailAPI(ingredient);
    filterByIngredient(ingredientRecipes);
    history.push('/drinks');
  }

  render() {
    const { history } = this.props;
    const { ingredients } = this.state;
    return (
      <div>
        <Header history={ history } name="Explore Ingredients" hideSearch />
        <div className="mx-auto max-w-xs grid grid-cols-3 mb-10">
          {ingredients.map((card, index) => (
            <button
              type="button"
              onClick={ () => this.handleClickFilter(card) }
              data-testid={ `${index}-ingredient-card` }
              key={ card }
            >
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${card}-Small.png` }
                  alt={ card }
                />
                <h1 data-testid={ `${index}-card-name` }>{card}</h1>
              </div>
            </button>
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

ExploreDrinksIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  filterByIngredient: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ // mandar p store
  filterByIngredient: (state) => dispatch(ingredientsFiltered(state)),
});

export default connect(null, mapDispatchToProps)(ExploreDrinksIngredients);
