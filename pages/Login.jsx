import React from 'react';
import PropTypes from 'prop-types';
import '../styles/login.css';

const MIN_LENGTH = 7;
const EMAIL_REGEX = /\S+@\S+\.\S+/i; // cod regex, dica do colega Maycon Cabral

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    }, () => this.validateLogin());
  };

  validateLogin = () => {
    const { password, email } = this.state;
    const validatePass = password.length < MIN_LENGTH;
    const validateEmail = !EMAIL_REGEX.test(email);
    // return validateEmail || validatePass;
    this.setState({
      isDisabled: validateEmail || validatePass,
      // os dois precisam ser false para habilitar o botao
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { history } = this.props;
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <form className="flex justify-center items-center h-screen bg-cover bg-[url('https://images.pexels.com/photos/255501/pexels-photo-255501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')]">
        <div
          className="rounded
           py-10 px-10 flex-col flex justify-center items-center"
        >
          <label htmlFor="email">
            <input
              className="inputsLogin"
              data-testid="email-input"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            <input
              className="inputsLogin"
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              name="password"
              value={ password }
              id="password"
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="bg-violet-500 hover:bg-violet-600 rounded w-20 h-8 mt-3
            active:bg-violet-700 focus:outline-none text-white font-serif
            focus:ring focus:ring-violet-300 hover:shadow-lg disabled:bg-slate-500"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Enter
          </button>
        </div>
      </form>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
