import React, {PureComponent, createRef} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import {AppRoute, ErrorStyle} from '../../consts';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {onSubmit} = this.props;
    evt.preventDefault();

    onSubmit({
      email: this.loginRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    if (this.props.userEmail) {
      return <Redirect to={AppRoute.ROOT} />;
    }

    return (
      <div className="page page--gray page--login">
        <Header
          userEmail={this.props.userEmail}
          onUserEmailClick={this.props.onUserEmailClick}
        />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              {this.props.isLoginError && (
                <p style={{color: `red`}}>Please, check your data{` `}</p>
              )}
              <form
                className="login__form form"
                action="#"
                method="post"
                onSubmit={this._handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    style={this.props.isLoginError ? ErrorStyle : {}}
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="current-email"
                    required=""
                    ref={this.loginRef}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required=""
                    ref={this.passwordRef}
                  />
                </div>
                <button
                  className="login__submit form__submit button"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>Amsterdam</span>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

SignIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  isLoginError: PropTypes.bool.isRequired,
  onUserEmailClick: PropTypes.func.isRequired,
};

export default SignIn;
