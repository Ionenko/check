import React from 'react';
import {Route, Switch} from "react-router-dom";
import RetrieveOrder from "../containers/order/retrieve";
import block from "bem-cn-lite";
import ReceiveOrder from "../containers/order/receive";
import InspectionOrder from "../containers/order/inspection";

const c = block('content');

const OrderPage = () => {
  return (
    <div className={c('inner')}>
      <Switch>
        <Route exact path="/order/:id/inspection" component={InspectionOrder} />
        <Route path="/order/:id" component={ReceiveOrder} />
        <Route exact path={['/', '/order']} component={RetrieveOrder} />
      </Switch>
    </div>
  );
};

export default OrderPage;