import React, {Component, Fragment} from "react";
import InputNumeric from "../../components/ui/numeric";
import Heading from "../../components/typography/heading";
import block from "bem-cn-lite";
import Field from "../../components/ui/field";
import Stepper from "../../components/ui/stepper";
import RadioGroup from "../../components/ui/radio-group";
import Header from "../../components/header";
import {Form} from "formik";

const c = block('content');
const f = block('form');

const OrderConfirmItem = ({setDamage, setMatch, match, damage}) => {
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

        <Form className={f()}>

        </Form>
      </div>
    </Fragment>
  );
};

const OrderConfirm = () => {
  return (
    <Fragment>
      <Header>
        <Heading variant='primary'>
          <h3>Confirm Inspection</h3>
        </Heading>
        <p className="text">Confirm final inspection</p>
        <Stepper steps={4} active={1} completed={0}/>
      </Header>
      <div className={c('body')}>
        <Heading align="center" variant='primary'>
          <h3>Order CO817SHV8289</h3>
        </Heading>

        <Form className={f()}>
          <Field id="finalNotes" type="text" name="finalNotes" multiline label="Final Notes"/>
          <div className="actions">
            <button className="btn">Confirm Inspection</button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

const OrderComplete = () => {
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
          <button className="btn">Inspect Another</button>
        </div>
      </div>
    </Fragment>
  );
};

class Order extends Component {
  state = {
    damage: null,
    match: null
  };

  setDamage(value){
    this.setState({damage: value})
  }

  setMatch(value){
    this.setState({match: value})
  }

  render() {
    return (
      <div className={c('inner')}>

        <RetrieveOrder/>

        <ReceiveOrder
          setDamage={this.setDamage.bind(this)}
          damage={this.state.damage}
        />

        <OrderInspection/>

        <OrderConfirmItem
          setDamage={this.setDamage.bind(this)}
          setMatch={this.setMatch.bind(this)}
          damage={this.state.damage}
          match={this.state.match}
        />

        <OrderConfirm/>

        <OrderComplete/>
      </div>
    );
  }
}

export default Order;