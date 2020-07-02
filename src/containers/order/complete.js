import React, { Fragment} from "react";
import Heading from "../../components/typography/heading";
import block from "bem-cn-lite";
import Stepper from "../../components/ui/stepper";
import Header from "../../components/header";
import {Link} from "react-router-dom";

const c = block('content');

const CompleteOrder = () => {
  return (
    <Fragment>
      <Header>
        <Heading variant='primary'>
          <h3>Order Complete</h3>
        </Heading>
        <p className="text">This order has been succesfully processed.</p>
        <Stepper steps={4} active={4} completed={4}/>
      </Header>
      <div className={c('body')}>
        <Heading align="center" variant='secondary'>
          <h3>Order CO817SHV8289</h3>
        </Heading>
        <p className="text text_bold text_center">This order has been RECEIVED and INSPECTED</p>
        <div className="notifications notifications_center">
          <div className="notifications__item">
            <span
              className="text text_primary text_italic">Received on 6/2/2020 17:36 EST <br/> By: Mike Sanchez</span>
          </div>
          <div className="notifications__item">
            <span
              className="text text_primary text_italic"> Inspected on 6/7/2020 18:22 EST <br/> By: Louise Marley</span>
          </div>
        </div>
        <div className="actions">
          <Link to='/' className="btn">Inspect Another</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default CompleteOrder;