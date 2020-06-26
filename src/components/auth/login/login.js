import React from 'react';
import Field from "../../ui/field";
import {Link} from "react-router-dom";
import block from "bem-cn-lite";

const f = block('form');

const LoginForm = (props) => {

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isValid
  } = props;

  return (
    <form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      <Field
        id="email"
        type="text"
        name="email"
        label="Email"
        error={touched.email ? errors.email : ""}
        value={values.email}
        onChange={handleChange}
      />
      <Field
        id="password"
        type="password"
        name="password"
        label="Password"
        error={touched.password ? errors.password : ""}
        value={values.password}
        onChange={handleChange}
      />
      <Link className="link" to="/forgot-password">Forgot Password?</Link>
      <p className="text text_sm text_lg-offset">
        By continuing, you agree to Conextion’s <Link to="/terms">
        Terms of Service</Link> and <Link to="/policy">
        Privacy Policy</Link>.
      </p>
      <div className="actions">
        <button disabled={!isValid} className="btn">Continue</button>
      </div>
    </form>
  );
};

export default LoginForm;