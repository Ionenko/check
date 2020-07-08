import React from 'react';
import { Route, Switch } from 'react-router-dom';
import block from 'bem-cn-lite';
import RetrieveOrder from '../containers/order/retrieve';
import {
  ReceiveOrder,
  InspectionOrder,
  CompleteOrder,
} from '../containers/order';

const c = block('content');

const OrderPage = () => (
  <div className={c('inner')}>
    <Switch>
      <Route exact path="/order/:id/complete" component={CompleteOrder} />
      <Route exact path="/order/:id/inspection" component={InspectionOrder} />
      <Route exact path="/order/:id" component={ReceiveOrder} />
      <Route exact path={['/', '/order']} component={RetrieveOrder} />
      <Route path="*">
        <div>Page not found</div>
      </Route>
    </Switch>
  </div>
);

export default OrderPage;
