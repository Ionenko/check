import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Redirect, withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useApolloClient } from '@apollo/react-hooks';
import { authLogin } from '../../redux/actions/auth';
import { LoginForm } from '../../components/auth';
import Spinner from '../../components/spinner';

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

const Login = (props) => {
  const {
    authLogin,
    loading,
    isLoggedIn,
    location,
  } = props;
  const { addToast } = useToasts();
  const client = useApolloClient();
  const referer = location.state ? location.state.referer : '/';

  async function handleSubmit(data) {
    try {
      await authLogin(client, data);
    } catch (error) {
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
    <>
      { loading && <Spinner /> }
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {
          (props) => <LoginForm {...props} />
        }
      </Formik>
    </>
  );
};

const mapStateToProps = ({ auth: { loading, error, authorizationToken } }) => ({
  isLoggedIn: !!authorizationToken,
  error,
  loading,
});

const mapDispatchToProps = {
  authLogin,
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  authLogin: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(Login);
