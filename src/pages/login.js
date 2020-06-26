import React from 'react';
import Header from "../components/header";
import Heading from "../components/typography/heading";
import block from "bem-cn-lite";
import Login from "../containers/auth/login";

const c = block('content');

const LoginPage = () => {
  return (
    <div className={c('inner')}>
      <Header>
        <Heading variant='primary'>
          <h3>Welcome to Conextion Logistics</h3>
        </Heading>
      </Header>
      <div className={c('body')}>
        <Heading variant="secondary">
          <h3>Login to Access Your Orders</h3>
        </Heading>
        <Login/>
      </div>
    </div>
  );
};

export default LoginPage;