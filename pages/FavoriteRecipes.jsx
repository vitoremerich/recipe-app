import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

export default class FavoriteRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorites: [],
      copied: false,
    };
    this.getFavs = this.getFavs.bind(this);
    this.removeFav = this.removeFav.bind(this);
  }

  componentDidMount() {
    this.getFavs();
  }

  getFavs() {
    const local = localStorage.getItem('favoriteRecipes');
    const filters = JSON.parse(local);
    this.setState({
      favorites: filters,
    });
  }

  shareButton = (id, type) => {
    if (type === 'food') {
      type = 'foods';
    } else {
      type = 'drinks';
    }
    navigator.clipboard.writeText(`http://localhost:3000/${type}/${id}`);
    this.setState({ copied: true });
  }

  foodFilter = () => {
    const local = localStorage.getItem('favoriteRecipes');
    const filters = JSON.parse(local);
    const foods = filters.filter((food) => food.type === 'food');
    this.setState({
      favorites: foods,
    });
  }

  drinkFilter = () => {
    const local = localStorage.getItem('favoriteRecipes');
    const filters = JSON.parse(local);
    const drinks = filters.filter((drink) => drink.type === 'drink');
    this.setState({
      favorites: drinks,
    });
  }

  removeFav(id) {
    const local = localStorage.getItem('favoriteRecipes');
    const filters = JSON.parse(local);
    const newFavorites = filters.filter(
      (recipe) => recipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    this.getFavs();
  }

  render() {
    const { history } = this.props;
    const { favorites, copied } = this.state;
    return (
      <div>
        <Header history={ history } name="Favorite Recipes" hideSearch />
        <div className="flex justify-between mx-4">
          <button
            data-testid="filter-by-all-btn"
            className="bg-violet-500 hover:bg-violet-800 w-[30%] rounded
            justify-center mx-1 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            onClick={ this.getFavs }
            type="button"
          >
            All
          </button>
          <button
            data-testid="filter-by-food-btn"
            className="bg-violet-500 hover:bg-violet-800 w-[30%] rounded
            justify-center mx-1 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            onClick={ this.foodFilter }
            type="button"
          >
            Food
          </button>
          <button
            data-testid="filter-by-drink-btn"
            className="bg-violet-500 hover:bg-violet-800 w-[30%] rounded
            justify-center mx-1 h-6 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            onClick={ this.drinkFilter }
            type="button"
          >
            Drink
          </button>
        </div>

        <div className="cards">
          {favorites && favorites.map((favorite, index) => (
            <div key={ favorite.id } className="card">
              <a href={ `/${favorite.type}s/${favorite.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ favorite.image }
                  alt={ favorite.name }
                  className="image"
                />
              </a>
              <section className="flex flex-col justify-between w-40">
                <a href={ `/${favorite.type}s/${favorite.id}` }>
                  <h4
                    data-testid={ `${index}-horizontal-name` }
                    className="text-black text-lg"
                  >
                    {favorite.name}
                  </h4>
                </a>
                {favorite.type === 'food' ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="infos"
                  >
                    {`${favorite.nationality} - ${favorite.category}`}
                  </p>) : null}
                {favorite.alcoholicOrNot.length > 1 ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="infos"
                  >
                    {`${favorite.category} - ${favorite.alcoholicOrNot}`}
                  </p>) : null}
                <button
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => this.removeFav(favorite.id) }
                  type="button"
                  value={ favorite.name }
                  src={ blackHeartIcon }
                  className="self-end"
                >
                  <img src={ blackHeartIcon } alt="favoritado" />
                </button>
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={
                    () => this.shareButton(favorite.id, favorite.type)
                  }
                  type="button"
                  value={ favorite.id }
                  src={ shareIcon }
                  className="self-end"
                >
                  <img src={ shareIcon } alt="shareIcon" />
                </button>
              </section>
            </div>
          ))}
        </div>
        { copied && <p>Link copied!</p>}
      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
