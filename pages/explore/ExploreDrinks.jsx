import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { randomDrink } from '../../services/randomRecipeAPI';
import '../../styles/explore.css';

export default class ExploreDrinks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }

  componentDidMount() {
    this.randomApiDrink();
  }

  randomApiDrink = async () => {
    const fetchDrink = await randomDrink();
    const randomIdDrink = fetchDrink[0].idDrink;
    this.setState({
      id: randomIdDrink,
    });
  }

  render() {
    const { history } = this.props;
    const { id } = this.state;
    return (
      <div>
        <Header history={ history } name="Explore Drinks" hideSearch />
        <div className="explore-container">
          <button
            className="w-full px-4 py-2 border-2 bg-violet-500 hover:bg-violet-600
            hover:border-purple-500 active:bg-violet-700 focus:outline-none
            border-slate-400 mb-2.5 rounded text-white"
            onClick={ () => history.push('/explore/drinks/ingredients') }
            data-testid="explore-by-ingredient"
            type="button"
          >
            By Ingredient
          </button>
          <button
            className="w-full px-4 py-2 border-2 bg-violet-500 hover:bg-violet-600
            hover:border-purple-500 active:bg-violet-700 focus:outline-none
            border-slate-400 mb-2.5 rounded text-white"
            onClick={ () => history.push(`/drinks/${id}`) }
            data-testid="explore-surprise"
            type="button"
          >
            Surprise me!
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
