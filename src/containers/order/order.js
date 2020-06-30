import React, {Component, Fragment} from "react";
import InputNumeric from "../../components/ui/numeric";
import Heading from "../../components/typography/heading";
import block from "bem-cn-lite";
import Field from "../../components/ui/field";
import Stepper from "../../components/ui/stepper";
import RadioGroup from "../../components/ui/radio-group";
import Header from "../../components/header";

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
        <a href="/" className="link link_inverse text text_sm">&lt; back</a>
        <Heading align='center' variant='secondary'>
          <h3>Order CO817SHV8289</h3>
        </Heading>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text_bold">Item 1 of 3</p>
            </div>
          </div>
          <h2 className="text text_bold text_center">27 iPhone X Black, Master Carton</h2>
        </div>
        <form className={f()}>
          <div className={f('row')}>
            <div className={f('col', {center: true})}>
              <span className="text text_secondary text_sm">Quantity Received</span>
            </div>
            <div className={f('col', {center: true})}>
              <InputNumeric onChange={() => console.log('change count')} min={1} max={100} value={'1'}/>
            </div>
          </div>
          <div className={f('group')}>
            <RadioGroup
              className={f('radio-buttons')}
              items={[
                {value: 'no-damage', label: 'No Damage'},
                {value: 'damage', label: 'Package Damaged'},
              ]}
              name="damage"
              setValue={setDamage}
              value={damage}
            />
            <RadioGroup
              className={f('radio-buttons')}
              items={[
                {value: 'match', label: 'Matches BOL'},
                {value: 'mismatch', label: 'Product Mismatch'},
              ]}
              name="match"
              setValue={setMatch}
              value={match}
            />
            <div className={f('buttons')}>
              <div className="btn-file">
                <span>Add image of product</span>
              </div>
            </div>
          </div>
          <Field id="notes" type="text" name="notes" multiline label="Notes"/>
          <div className="actions">
            <button className="btn">Confirm Item</button>
          </div>
        </form>
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
        <div className="notifications">
          <div className="notifications__item">
            <span
              className="text text_primary text_italic">Received on 6/2/2020 17:36PM EST <br/> By: Mike Sanchez</span>
          </div>
        </div>
        <form className={f()}>
          <Field id="finalNotes" type="text" name="finalNotes" multiline label="Final Notes"/>
          <div className="actions">
            <button className="btn">Confirm Inspection</button>
          </div>
        </form>
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