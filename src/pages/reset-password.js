import React from 'react';
import block from 'bem-cn-lite';
import Header from '../components/header';
import Heading from '../components/typography/heading';
import ResetPassword from '../containers/auth/reset-password';

const c = block('content');

const ResetPasswordPage = () => (
  <div className={c('inner')}>
    <Header>
      <Heading variant="primary">
        <h3>Welcome to Conextion Logistics</h3>
      </Heading>
    </Header>
    <div className={c('body')}>
      <Heading variant="secondary">
        <h3>Forgot Password?</h3>
      </Heading>
      <ResetPassword />
    </div>
  </div>
);

export default ResetPasswordPage;
