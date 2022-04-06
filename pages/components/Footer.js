import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import exploreIcon from '../../images/exploreIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import '../../styles/footer.css';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <footer
        data-testid="footer"
        className="text-center
        bg-gradient-to-b from-purple-500
         to-purple-300 border border-purple-500 fixed bottom-0
       w-full"
      >
        <div className="flex justify-center">
          <Link
            className="px-5 rounded-full"
            to="/drinks"
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
          >
            <img src={ drinkIcon } alt="drinkIcon" />
          </Link>
          <Link
            className="px-5"
            data-testid="food-bottom-btn"
            to="/foods"
            src={ mealIcon }
          >
            <img src={ mealIcon } alt="mealIcon" />
          </Link>
          <Link
            className="px-5"
            data-testid="explore-bottom-btn"
            to="/explore"
            src={ exploreIcon }
          >
            <img src={ exploreIcon } alt="exploreIcon" />
          </Link>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  name: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Footer;
