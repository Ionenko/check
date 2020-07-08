import React, { useEffect } from 'react';
import './app.scss';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import block from 'bem-cn-lite';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  LoginPage,
  ResetPasswordPage,
  OrderPage,
} from '../../pages';
import overlay from '../../img/bg.jpg';
import PrivateRoute from '../private-route';
import { authSuccess } from '../../redux/actions/auth';

const c = block('content');

const App = ({ authSuccess, isLoggedIn }) => {
  useEffect(() => {
    const data = {
      authorizationToken: localStorage.getItem('auth_token'),
      userToken: localStorage.getItem('user_token'),
      refreshToken: localStorage.getItem('refresh_token'),
    };
    if (data.authorizationToken && !isLoggedIn) {
      authSuccess(data);
    }
  });

  return (
    <main>
      <div className={c()} style={{ backgroundImage: `url(${overlay})` }}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
          <PrivateRoute path="/" component={OrderPage} />
          <Route path="*">
            <div>Page not found</div>
          </Route>
        </Switch>
      </div>
    </main>
  );
};

App.defaultProps = {
  authSuccess: () => null,
  isLoggedIn: false,
};

App.propTypes = {
  authSuccess: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.authorizationToken,
});

const mapDispatchToProps = {
  authSuccess,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
