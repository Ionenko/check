import React from 'react';
import './app.scss';
import {Route, Switch } from "react-router-dom";
import {AuthPage, OrderPage} from "../../pages";
import overlay from "../../img/bg.jpg";
import block from "bem-cn-lite";

const c = block('content');

function App() {
  return (
    <main>
      <div className={c()} style={{backgroundImage: `url(${overlay})`}}>
        <Switch>
          <Route exact path="/order" >
            <OrderPage/>
          </Route>
          <Route exact path="/auth" >
            <AuthPage/>
          </Route>
          <Route path="*">
            <div>Page not found</div>
          </Route>
        </Switch>
      </div>
    </main>
  );
}

export default App;
