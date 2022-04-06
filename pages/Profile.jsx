import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Footer from './components/Footer';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
    this.readLocalStorage = this.readLocalStorage.bind(this);
    this.clearLocalStorage = this.clearLocalStorage.bind(this);
  }

  componentDidMount() {
    this.readLocalStorage();
  }

  clearLocalStorage() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  readLocalStorage() {
    const emailLocal = localStorage.getItem('user');
    const emailObj = JSON.parse(emailLocal);

    if (emailObj !== null) {
      const obj = emailObj.email;
      this.setState({
        email: obj,
      });
    }
  }

  render() {
    const { history } = this.props;
    const { email } = this.state;
    return (
      <div>
        <Header history={ history } name="Profile" hideSearch />
        <div>
          <span
            className="pt-20 text-xl font-bold grid justify-items-center text-red"
            data-testid="profile-email"
            type="email"
            name="email"
          >
            {email}
          </span>
          <div
            className=" p-10
            mb-2.5 flex flex-col gap-4
            bg-white text-xl
            h-screen items-center text-center; "
          >
            <button
              className="bg-violet-500 hover:bg-violet-600 rounded w-20 h-8 mt-3
              active:bg-violet-700 focus:outline-none text-white font-serif
              focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500
              w-full"
              onClick={ () => history.push('/done-recipes') }
              data-testid="profile-done-btn"
              type="button"
            >
              Done Recipes
            </button>
            <button
              className="bg-violet-500 hover:bg-violet-600 rounded w-20 h-8 mt-3
              active:bg-violet-700 focus:outline-none text-white font-serif
              focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500
              w-full"
              onClick={ () => history.push('/favorite-recipes') }
              data-testid="profile-favorite-btn"
              type="button"
            >
              Favorite Recipes
            </button>
            <button
              className="bg-violet-500 hover:bg-violet-600 rounded w-20 h-8 mt-3
              active:bg-violet-700 focus:outline-none text-white font-serif
              focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500
              w-full"
              onClick={ this.clearLocalStorage }
              data-testid="profile-logout-btn"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
