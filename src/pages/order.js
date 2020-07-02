import React from 'react';
import {Route, Switch} from "react-router-dom";
import RetrieveOrder from "../containers/order/retrieve";
import block from "bem-cn-lite";
import ReceiveOrder from "../containers/order/receive";
import InspectionOrder from "../containers/order/inspection";
import CompleteOrder from "../containers/order/complete";

const c = block('content');

const OrderPage = () => {
  return (
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
};

export default OrderPage;