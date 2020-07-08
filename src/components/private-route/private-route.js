import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{ pathname: '/login', state: { referer: props.location } }}
      />
    ))}
  />
);

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.authorizationToken,
});

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(PrivateRoute);
