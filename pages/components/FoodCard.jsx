import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/foods.css';

class FoodCard extends React.Component {
  render() {
    const { allRecipes } = this.props;
    return (
      <div>
        {allRecipes.map((recipe, index) => (
          <div
            className="bg-purple-200"
            key={ recipe.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <p
              className="font-bold flex flex justify-center bg-purple-200"
              data-testid={ `${index}-card-name` }
            >
              {`Como fazer: ${recipe.strMeal} `}

            </p>
            <a
              href={ `/foods/${recipe.idMeal}` }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </a>
          </div>
        ))}
      </div>
    );
  }
}

FoodCard.propTypes = {
  allRecipes: PropTypes.arrayOf,
}.isRequired;

export default FoodCard;
