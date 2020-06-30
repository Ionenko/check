import React, {Fragment} from "react";
import Header from "../../components/header";
import Heading from "../../components/typography/heading";
import Stepper from "../../components/ui/stepper";
import Field from "../../components/ui/field";
import block from "bem-cn-lite";

const c = block('content');
const f = block('form');

const InspectionOrder = () => {
  return (
    <Fragment>
      <Header>
        <Heading variant='primary'>
          <h3>Order Inspection</h3>
        </Heading>
        <p className="text">You will now go through the package contents to ensure each item is as described.</p>
        <Stepper steps={4} active={1} completed={0}/>
      </Header>
      <div className={c('body')}>
        <Heading variant='primary' align="center">
          <h3>Order CO817SHV8289</h3>
        </Heading>
        <div className="notifications notifications_center">
          <div className="notifications__item">
            <span className="text text_primary text_italic">
              Received on 6/2/2020 17:36PM EST <br/> By: Mike Sanchez
            </span>
          </div>
        </div>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text_bold">78 Items</p>
            </div>
            <div className="details__col">
              <p className="text text_bold">3 Boxes</p>
            </div>
          </div>
          <div className="details__outside">
            <div className="details__items">
              <div className="details__item">
                <p className="text text_sm text_info">Delivered From</p>
                <p className="text text_bold">NCM Wireless <br/> Prime Trans, Miami, FL</p>
              </div>
              <div className="details__item">
                <p className="text text_sm text_info">Delivered To</p>
                <p className="text text_bold">Conextion Captains, Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
        <form className={f()}>
          <Field id="name" type="text" name="name" label="Your Name"/>
          <div className="actions">
            <button className="btn">Begin Inspection</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default InspectionOrder;