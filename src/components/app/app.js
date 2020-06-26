import React from 'react';
import './app.scss';
import {Route, Switch } from "react-router-dom";
import {
  LoginPage,
  ResetPasswordPage,
  OrderPage} from "../../pages";
import overlay from "../../img/bg.jpg";
import block from "bem-cn-lite";
import PrivateRoute from "../private-route";

const c = block('content');

function App() {
  return (
    <main>
      <div className={c()} style={{backgroundImage: `url(${overlay})`}}>
        <Switch>
          <Route exact path={['/auth', '/auth/login']}  component={LoginPage} />
          <Route exact path='/auth/reset-password'  component={ResetPasswordPage} />
          <PrivateRoute exact path={['/','/order']} component={OrderPage}/>
          <Route path="*">
            <div>Page not found</div>
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default App;
