import React from 'react';
import './app.scss';
import logo from '../../img/logo.svg';
import overlay from '../../img/content-bg.png';
import InputNumeric from "../ui/input-numeric";
import {Route, Switch} from "react-router-dom";
import Field from "../ui/field";

function handleRadioChange(e){
  console.log('change', e.target.value);
}

const Login = () => {
  return (
    <div className="content-wrapper" style={{backgroundImage: `url(${overlay})`}}>
      <div className="content">
        <div className="content-head">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Connection"/>
            </a>
          </div>
          <h3>
            Welcome to Conextion Logistics
          </h3>
        </div>
        <div className="content-body">
          <h3>
            Login to Access Your Orders
          </h3>
          <form>
            <Field id="email" type="text" name="email" label="Email" />
            <Field id="password" type="password" name="password" label="Password"/>

            <a className="link" href="/forgot-password">Forgot Password?</a>
            <p className="text text--sm">
              By continuing, you agree to Conextion’s <a href="/terms">
              Terms of Service</a> and <a href="/policy">
              Privacy Policy</a>.
            </p>
            <div className="actions">
              <button className="btn">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const RetrieveOrder = () => {
  return (
    <div className="content">
      <div className="content-head">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Connection"/>
          </a>
        </div>
        <h3>
          Hi Dascher, Enter an Order Number to Get Started
        </h3>
      </div>
      <div className="content-body">
        <h3>
          Retrieve an Order
        </h3>
        <form>
          <div className="field">
            <label htmlFor="orderNumber" className="field__label">Order Number</label>
            <input className="field__element" id="orderNumber" type="text" name="orderNumber"/>
          </div>
          <p>
            The order number should be written on the manifest or BOL and typically starts with CO.
          </p>
          <button className="btn">Continue</button>
        </form>
      </div>
    </div>
  );
};

const Order = () => {
  return (
    <div className="content">
      <div className="content-head">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Connection"/>
          </a>
        </div>
        <h3>
          Has the order arrived?
        </h3>
        <p>When an order first comes in, it needs to be received.</p>
      </div>
      <div className="content-body">
        <h3>
          Order CO817SHV8289
        </h3>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text--bold">78 Items</p>
            </div>
            <div className="details__col">
              <p className="text text--bold">3 Boxes</p>
            </div>
          </div>
          <div className="details__outside">
            <div className="details__items">
              <div className="details__item">
                <p className="text text--sm text--info">Delivered From</p>
                <p className="text text--bold">NCM Wireless <br/> Prime Trans, Miami, FL</p>
              </div>
              <div className="details__item">
                <p className="text text--sm text--info">Delivered To</p>
                <p className="text text--bold">Conextion Captains, Dubai, UAE</p>
              </div>
            </div>
            <div className="details__info">
              <p className="text text--sm text--info">Tracking Info</p>
              <p className="text text--bold text--underline" >FedEx 12398712376592</p>
            </div>
          </div>
        </div>
        <p className="text text--sm text--secondary">Was the package damaged?</p>
        <form className="form">
          <div className="form__group">
            <div className="form__radio-buttons">
              <div className="btn-radio btn-radio--active">
                <input id="no-damage" onChange={handleRadioChange} value="no-damage" type="radio" name="damage"/>
                <label htmlFor="no-damage">No Damage</label>
              </div>
              <div className="btn-radio">
                <input id="damaged" onChange={handleRadioChange} value="damage" type="radio" name="damage"/>
                <label htmlFor="damaged">Package Damaged</label>
              </div>
            </div>
            <div className="form__buttons">
              <div className="btn-file">
                <span>Add image of BOL</span>
              </div>
              <div className="btn-file">
                <span>Add image of package(s)</span>
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="notes" className="field__label">Notes</label>
            <textarea className="field__element" id="notes" name="notes"/>
          </div>
          <div className="field">
            <label htmlFor="name" className="field__label">Your Name</label>
            <input className="field__element" id="name" type="text" name="name"/>
          </div>
          <button className="btn">Receive Shipment</button>
        </form>
      </div>
    </div>
  );
};

const Inspection = () => {
  return (
    <div className="content">
      <div className="content-head">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Connection"/>
          </a>
        </div>
        <h3>
          Order Inspection
        </h3>
        <p>You will now go through the package contents to ensure each item is as described.</p>
      </div>
      <div className="content-body">
        <h3>
          Order CO817SHV8289
        </h3>
        <div className="notifications notifications--center">
          <div className="notifications__item">
            <span className="text text--primary text--italic">Received on 6/2/2020 17:36PM EST <br/> By: Mike Sanchez</span>
          </div>
        </div>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text--bold">78 Items</p>
            </div>
            <div className="details__col">
              <p className="text text--bold">3 Boxes</p>
            </div>
          </div>
          <div className="details__outside">
            <div className="details__items">
              <div className="details__item">
                <p className="text text--sm text--info">Delivered From</p>
                <p className="text text--bold">NCM Wireless <br/> Prime Trans, Miami, FL</p>
              </div>
              <div className="details__item">
                <p className="text text--sm text--info">Delivered To</p>
                <p className="text text--bold">Conextion Captains, Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
        <form className="form">
          <div className="field">
            <label htmlFor="name" className="field__label">Your Name</label>
            <input className="field__element" id="name" type="text" name="name"/>
          </div>
          <button className="btn">Begin Inspection</button>
        </form>
      </div>
    </div>
  );
};


const ConfirmItem = () => {
  return (
    <div className="content">
      <div className="content-head">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Connection"/>
          </a>
        </div>
        <h3>
          Order Inspection
        </h3>
        <p>You will now go through the package contents to ensure each item is as described.</p>
      </div>
      <div className="content-body">
        <a href="/">&lt; back</a>
        <h3>
          Order CO817SHV8289
        </h3>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text--bold">Item 1 of 3</p>
            </div>
          </div>
          <h2 className="text text--bold text--center">27 iPhone X Black, Master Carton</h2>
        </div>
        <form className="form">
          <div className="form__row">
            <div className="form__col form__col--center">
              <span className="text text--secondary text--sm">Quantity Received</span>
            </div>
            <div className="form__col form__col--center">
              <InputNumeric onChange={() => console.log('change count')} min={1} max={100} value={'1'} />
            </div>
          </div>
          <div className="form__group">
            <div className="form__radio-buttons">
              <div className="btn-radio btn-radio--active">
                <input id="no-damage" onChange={handleRadioChange} value="no-damage" type="radio" name="damage"/>
                <label htmlFor="no-damage">No Damage</label>
              </div>
              <div className="btn-radio">
                <input id="damaged" onChange={handleRadioChange} value="damage" type="radio" name="damage"/>
                <label htmlFor="damaged">Package Damaged</label>
              </div>
            </div>
            <div className="form__radio-buttons">
              <div className="btn-radio">
                <input id="no-damage" onChange={handleRadioChange} value="match" type="radio" name="match"/>
                <label htmlFor="no-damage">Matches BOL</label>
              </div>
              <div className="btn-radio">
                <input id="damaged" onChange={handleRadioChange} value="mismatch" type="radio" name="match"/>
                <label htmlFor="damaged">Product Mismatch</label>
              </div>
            </div>
            <div className="form__buttons">
              <div className="btn-file">
                <span>Add image of product</span>
              </div>
            </div>
          </div>
          <div className="field">
            <label htmlFor="notes" className="field__label">Notes</label>
            <textarea className="field__element" id="notes" name="notes"/>
          </div>
          <button className="btn">Confirm Item</button>
        </form>
      </div>
    </div>
  );
};

const Confirm = () => {
  return (
    <div className="content">
      <div className="content-head">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Connection"/>
          </a>
        </div>
        <h3>
          Confirm Inspection
        </h3>
        <p>Confirm final inspection</p>
      </div>
      <div className="content-body">
        <h3>
          Order CO817SHV8289
        </h3>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text--bold">78 Items</p>
            </div>
            <div className="details__col">
              <p className="text text--bold">3 Boxes</p>
            </div>
          </div>
          <div className="details__outside">
            <div className="details__items">
              <div className="details__item">
                <p className="text text--sm text--info">Delivered From</p>
                <p className="text text--bold">NCM Wireless <br/> Prime Trans, Miami, FL</p>
              </div>
              <div className="details__item">
                <p className="text text--sm text--info">Delivered To</p>
                <p className="text text--bold">Conextion Captains, Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="notifications">
          <div className="notifications__item">
            <span className="text text--primary text--italic">Received on 6/2/2020 17:36PM EST <br/> By: Mike Sanchez</span>
          </div>
        </div>
        <form className="form">
          <div className="field">
            <label htmlFor="finalNotes" className="field__label">Final Notes</label>
            <textarea className="field__element" id="finalNotes" name="finalNotes"/>
          </div>
          <button className="btn">Confirm Inspection</button>
        </form>
      </div>
    </div>
  );
};


const Complete = () => {
  return (
    <div className="content">
      <div className="content-head">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="Connection"/>
          </a>
        </div>
        <h3>
          Order Complete
        </h3>
        <p>You will now go through the package contents to ensure each item is as described.</p>
      </div>
      <div className="content-body">
        <h3>
          Order CO817SHV8289
        </h3>
        <p className="text text--bold">This order has been RECEIVED and INSPECTED</p>
        <div className="notifications notifications--center">
          <div className="notifications__item">
            <span className="text text--primary text--italic">Received on 6/2/2020 17:36 EST <br/> By: Mike Sanchez</span>
          </div>
          <div className="notifications__item">
            <span className="text text--primary text--italic"> Inspected on 6/7/2020 18:22 EST <br/> By: Louise Marley</span>
          </div>
        </div>
        <form className="form">
          <div className="field">
            <label htmlFor="finalNotes" className="field__label">Final Notes</label>
            <textarea className="field__element" id="finalNotes" name="finalNotes"/>
          </div>
          <div className="actions">
            <button className="btn">Inspect Another</button>
          </div>

        </form>
      </div>
    </div>
  );
};

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/order" >
          <Order/>
        </Route>
        <Route exact path="/" >
          <Login/>
        </Route>
        <Route path="*">
          <div>Page not found</div>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
