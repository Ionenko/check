import React, {Component} from 'react';
import logo from "../../img/logo.svg";
import Heading from "../../components/typography/heading";
import Field from "../../components/ui/field";
import {Link} from "react-router-dom";
import block from 'bem-cn-lite';

const c = block('content');
const f = block('form');

class Auth extends Component {
  render() {
    return (
      <div className={c('inner')}>
        <div className={c('head')}>
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Connection"/>
            </a>
          </div>
          <Heading variant="primary">
            <h3>Welcome to Conextion Logistics </h3>
          </Heading>
        </div>
        <div className={c('body')}>
          <Heading variant="secondary">
            <h3>Login to Access Your Orders</h3>
          </Heading>
          <form className={f()}>
            <Field id="email" type="text" name="email" label="Email" />
            <Field id="password" type="password" name="password" label="Password"/>
            <Link className="link" to="/forgot-password">Forgot Password?</Link>
            <p className="text text_sm text_lg-offset">
              By continuing, you agree to Conextion’s <Link to="/terms">
              Terms of Service</Link> and <Link to="/policy">
              Privacy Policy</Link>.
            </p>
            <div className="actions">
              <button className="btn">Continue</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;