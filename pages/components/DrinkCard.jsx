import React from 'react';
import PropTypes from 'prop-types';

class DrinkCard extends React.Component {
  render() {
    const { allRecipes } = this.props;
    return (
      <div>
        {allRecipes.map((recipe, index) => (
          <div
            className="bg-purple-200"
            data-testid={ `${index}-recipe-card` }
            key={ recipe.idDrink }
          >
            <p
              className="font-bold flex flex justify-center bg-purple-200"
              data-testid={ `${index}-card-name` }
            >
              { ` Como fazer: ${recipe.strDrink}`}

            </p>
            <a href={ `/drinks/${recipe.idDrink}` }>
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
            </a>
          </div>
        ))}
      </div>
    );
  }
}

DrinkCard.propTypes = {
  allRecipes: PropTypes.arrayOf,
}.isRequired;

export default DrinkCard;
