import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../styles/explore.css';

export default class Explore extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header history={ history } name="Explore" hideSearch />
        <div className="explore-container">
          <button
            className="w-full px-4 py-2 border-2 bg-violet-500 hover:bg-violet-600
            hover:border-purple-500 active:bg-violet-700 focus:outline-none
            border-slate-400 mb-2.5 rounded text-white"
            onClick={ () => history.push('/explore/foods') }
            data-testid="explore-foods"
            type="button"
          >
            Explore Foods
          </button>
          <button
            className="w-full px-4 py-2 border-2 bg-violet-500 hover:bg-violet-600
            hover:border-purple-500 active:bg-violet-700 focus:outline-none
            border-slate-400 mb-2.5 rounded text-white"
            onClick={ () => history.push('/explore/drinks') }
            data-testid="explore-drinks"
            type="button"
          >
            Explore Drinks
          </button>
        </div>

        <Footer />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
