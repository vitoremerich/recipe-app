import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

export default class DoneRecipes extends Component {
  constructor() {
    super();

    this.state = {
      allRecipes: [],
      copied: false,
    };
  }

  componentDidMount() {
    this.getRecipesFromStorage();
  }

  getRecipesFromStorage = () => {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    this.setState({ allRecipes });
    console.log(allRecipes);
  }

  filterFoodsOrDrinks = (type) => {
    const { allRecipes } = this.state;
    const filter = allRecipes.filter((recipe) => recipe.type === type);
    this.setState({ allRecipes: filter });
  }

  shareButton = (id) => {
    navigator.clipboard.writeText(
      `http://localhost:3000/foods/${id}`,
    );
    this.setState({ copied: true });
  };

  render() {
    const { allRecipes, copied } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } name="Done Recipes" hideSearch />
        <div className="flex justify-between mx-4">
          <button
            data-testid="filter-by-all-btn"
            className="bg-violet-500 hover:bg-violet-800 w-[30%] rounded
            justify-center mx-1 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            type="button"
            onClick={ this.getRecipesFromStorage }
          >
            All
          </button>

          <button
            data-testid="filter-by-food-btn"
            className="bg-violet-500 hover:bg-violet-800 w-[30%] rounded
            justify-center mx-1 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            type="button"
            onClick={ () => this.filterFoodsOrDrinks('food') }
          >
            Foods
          </button>

          <button
            data-testid="filter-by-drink-btn"
            className="bg-violet-500 hover:bg-violet-800 w-[30%] rounded
            justify-center mx-1 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            type="button"
            onClick={ () => this.filterFoodsOrDrinks('drink') }
          >
            Drinks
          </button>
        </div>

        {copied && <p>Link copied!</p>}

        <div className="cards">
          {allRecipes && allRecipes.map((recipe, index) => {
            if (recipe.type === 'food') {
              return (
                <div key={ recipe.name } className="card">
                  <a
                    href={ `/foods/${recipe.id}` }
                  >
                    <img
                      src={ recipe.image }
                      alt={ recipe.name }
                      data-testid={ `${index}-horizontal-image` }
                      className="image"
                    />
                  </a>
                  <section className="flex flex-col justify-between">
                    <a href={ `/foods/${recipe.id}` }>
                      <h4
                        data-testid={ `${index}-horizontal-name` }
                        className="text-black text-lg"
                      >
                        {recipe.name}
                      </h4>
                    </a>
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="infos"
                    >
                      {`${recipe.nationality} - ${recipe.category}`}
                    </p>
                    <p data-testid={ `${index}-horizontal-done-date` } className="infos">
                      {recipe.doneDate}
                    </p>
                    {recipe.tags && (
                      <div>
                        <p
                          data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
                          className="infos"
                        >
                          {recipe.tags[0]}
                        </p>
                        <p
                          data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
                          className="infos"
                        >
                          {recipe.tags[1]}
                        </p>
                      </div>
                    )}

                    <button
                      data-testid={ `${index}-horizontal-share-btn` }
                      type="button"
                      onClick={ () => this.shareButton(recipe.id) }
                      src={ shareIcon }
                      className="ml-24 self-end"
                    >
                      <img src={ shareIcon } alt="share" />
                    </button>
                  </section>
                </div>
              );
            }
            return (
              <div key={ recipe.name } className="card">
                <a
                  href={ `/drinks/${recipe.id}` }
                >
                  <img
                    src={ recipe.image }
                    alt={ recipe.name }
                    data-testid={ `${index}-horizontal-image` }
                    className="image"
                  />
                </a>
                <section>
                  <a href={ `/drinks/${recipe.id}` }>
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                      className="text-black text-lg"
                    >
                      {recipe.name}
                    </h4>
                  </a>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="infos"
                  >
                    {`${recipe.category} - ${recipe.alcoholicOrNot}`}
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="infos"
                  >
                    {recipe.doneDate}
                  </p>
                  <button
                    data-testid={ `${index}-horizontal-share-btn` }
                    type="button"
                    onClick={ () => this.shareButton(recipe.id) }
                    src={ shareIcon }
                    className="ml-24"
                  >
                    <img src={ shareIcon } alt="share" />
                  </button>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
