import React from 'react';
import { Link } from 'react-router-dom';
import block from 'bem-cn-lite';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import Field from '../../ui/field';

const f = block('form');

const LoginForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
  } = props;

  return (
    <Form className={f()} noValidate onSubmit={handleSubmit}>
      <Field
        id="email"
        type="text"
        name="email"
        label="Email"
        error={touched.email ? errors.email : ''}
        value={values.email}
        onChange={handleChange}
      />
      <Field
        id="password"
        type="password"
        name="password"
        label="Password"
        error={touched.password ? errors.password : ''}
        value={values.password}
        onChange={handleChange}
      />
      <Link className="link" to="/reset-password">Forgot Password?</Link>
      <p className="text text_sm text_lg-offset">
        By continuing, you agree to Conextion’s
        {' '}
        <Link to="/terms">
          Terms of Service
        </Link>
        {' '}
        and
        {' '}
        <Link to="/policy">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="actions">
        <button type="submit" disabled={!isValid} className="btn">Continue</button>
      </div>
    </Form>
  );
};

LoginForm.defaultProps = {
  handleChange: () => null,
  handleSubmit: () => null,
  values: {},
  errors: {},
  touched: {},
  isValid: false,
};

LoginForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  isValid: PropTypes.bool,
};

export default LoginForm;
