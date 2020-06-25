import React from 'react';
import './app.scss';
import {Route, Switch } from "react-router-dom";
import {AuthPage, OrderPage} from "../../pages";

function App() {
  return (
    <main>
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
    </main>
  );
}

export default App;
