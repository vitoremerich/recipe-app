import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { exploreFoodIngredients }
from '../../services/exploreIngredientsAPI';
import { ingredientsFiltered } from '../../store/actions';
import { ingredientFoodAPI } from '../../services/IngredientAPI';

class ExploreFoodsIngredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    this.getFoodIngredients();
  }

  getFoodIngredients = async () => {
    const fetchIngredients = await exploreFoodIngredients();
    const filtred = fetchIngredients.map(({ strIngredient }) => strIngredient);
    this.setState({
      ingredients: filtred,
    });
  }

  handleClickFilter = async (ingredient) => { /// func para mandar p store
    const { filterByIngredient, history } = this.props;
    const ingredientRecipes = await ingredientFoodAPI(ingredient);
    filterByIngredient(ingredientRecipes);
    history.push('/foods');
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
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => this.handleClickFilter(card) }
              key={ card }
            >
              <div>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ `https://www.themealdb.com/images/ingredients/${card}-Small.png` }
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

ExploreFoodsIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  filterByIngredient: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({ // mandar p store
  filterByIngredient: (state) => dispatch(ingredientsFiltered(state)),
});

export default connect(null, mapDispatchToProps)(ExploreFoodsIngredients);
