import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Redirect, withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLogin } from '../../hooks/auth';
import { authSuccess } from '../../redux/actions/auth';
import { LoginForm } from '../../components/auth';

const validationSchema = Yup.object({
  email: Yup.string('Enter email')
    .required('Email is required')
    .email('Email isn\'t valid')
    .min(2, 'Email must contain at least 2 characters')
    .max(256, 'Email must contain on more 256 characters'),
  password: Yup.string('Enter password')
    .required('Password is required')
    .min(6, 'Password must contain at least 6 characters')
    .max(256, 'Password must contain on more 256 characters'),
});

const initialFormData = {
  email: '',
  password: '',
};

const Login = ({ authSuccess, isLoggedIn, location }) => {
  const login = useLogin();
  const referer = location.state ? location.state.referer : '/';
  const { addToast } = useToasts();

  async function handleSubmit(data) {
    try {
      const res = await login(data);
      if (res.data.login) {
        authSuccess(res.data.login);
      }
    } catch (err) {
      addToast(
        'This error occurs when login credentials are not provided, or the credentials are incorrect.',
        {
          appearance: 'error',
        },
      );
    }
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {
        (props) => <LoginForm {...props} />
      }
    </Formik>
  );
};

const mapDispatchToProps = {
  authSuccess,
};

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.auth.authorizationToken,
});

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authSuccess: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
