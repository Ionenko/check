import React from 'react';
import block from 'bem-cn-lite';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import Field from '../../ui/field';

const f = block('form');

const ResetPasswordForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
  } = props;

  return (
    <Form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      <Field
        id="email"
        type="text"
        name="email"
        label="Email"
        error={touched.email ? errors.email : ''}
        value={values.email}
        onChange={handleChange}
      />
      <p className="text text_sm text_lg-offset">
        Enter your email address below to reset password
      </p>
      <div className="actions">
        <button type="submit" disabled={!isValid} className="btn">Reset Password</button>
      </div>
    </Form>
  );
};

ResetPasswordForm.defaultProps = {
  handleChange: () => null,
  handleSubmit: () => null,
  values: {},
  errors: {},
  touched: {},
  isValid: false,
};

ResetPasswordForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.any),
  touched: PropTypes.objectOf(PropTypes.any),
  isValid: PropTypes.bool,
};

export default ResetPasswordForm;
