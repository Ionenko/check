import React, {Fragment, useState} from "react";
import Header from "../../components/header";
import Heading from "../../components/typography/heading";
import Stepper from "../../components/ui/stepper";
import Field from "../../components/ui/field";
import block from "bem-cn-lite";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import {Redirect} from "react-router-dom";
import {receiveOrder} from "../../redux/actions/order";
import {connect} from "react-redux";
import {toDate} from "../../helpers/date";
import InputNumeric from "../../components/ui/numeric";
import RadioGroup from "../../components/ui/radio-group";
import iconPlus from "../../img/plus.svg";
import File from "../../components/ui/file";

const c = block('content');
const f = block('form');

const validationSchema = Yup.object({
  name: Yup.string("Name")
    .required("Name is required")
    .min(2, 'Name must contain at least 2 characters')
    .max(256, 'Name must contain on more 256 characters'),
  notes: Yup.string("Notes")
    .required("Notes is required")
    .min(2, 'Notes must contain at least 2 characters')
    .max(256, 'Notes must contain on more 256 characters'),
  damage: Yup.string("Damage").required("Damage option is required"),
  match: Yup.string("Damage").required("Damage option is required"),
  image: Yup.array()
    .of(
      Yup.object().nullable(true)
    )
    .required('File is required')
    .min(1, 'Minimum of 1 file'),
});

const initialFormData = {
  name: '',
  notes: '',
  damage: '',
  match: '',
  image: undefined,
};

const renderFormSteps = (props) => {
  const {
    handleChange,
    values,
    errors,
    touched,
    step,
    setFieldValue,
    backStep
  } = props;

  switch(step){
    case 1:
      return (
        <Fragment>
          <Field
            id="name"
            type="text"
            name="name"
            label="Your Name"
            error={touched.name ? errors.name : ""}
            value={values.name}
            onChange={handleChange}
          />
          <div className="actions">
            <button type="submit" className="btn">Begin Inspection</button>
          </div>
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
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
              value={values.damage}
              error={errors.damage}
              touched={touched.damage}
              setFieldValue={setFieldValue}
            />
            <RadioGroup
              className={f('radio-buttons')}
              items={[
                {value: 'match', label: 'Matches BOL'},
                {value: 'mismatch', label: 'Product Mismatch'},
              ]}
              name="match"
              value={values.match}
              error={errors.match}
              touched={touched.match}
              setFieldValue={setFieldValue}
            />
            <div className={f('buttons')}>
              <File
                className='btn btn-file'
                onChange={file => setFieldValue('image', file)}
                accepts={['image/*']}
                multiple={false}
                maxFileSize={10000000}
                minFileSize={0}
                value={values.image}
                error={touched.image ? errors.image : ""}
                clickable
                name='image'
              >
                <img src={iconPlus} alt="icon check"/>
                <span>Add image of product</span>
              </File>
            </div>
          </div>
          <Field
            id="notes"
            type="text"
            name="notes"
            multiline
            label="Notes"
            error={touched.notes ? errors.notes : ""}
            value={values.notes}
            onChange={handleChange}
          />
          <div className="actions">
            <button className="btn">Confirm Item</button>
          </div>
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
          <div>Head step 3</div>
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <div>Head step 1</div>
        </Fragment>
      );
  }
};

const renderHeadSteps = (step) => {
  switch(step){
    case 1:
      return (
        <Fragment>
          <p className="text">You will now go through the package contents to ensure each item is as described.</p>
          <Stepper steps={4} active={3} completed={2}/>
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          <p className="text">You will now go through the package contents to ensure each item is as described.</p>
          <Stepper steps={4} active={4} completed={3}/>
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
          <p className="text">Confirm final inspection</p>
          <Stepper steps={4} active={4} completed={4}/>
        </Fragment>
      );
    default:
      return <div>Form step 1</div>;
  }
};

const renderBodySteps = (step, order) => {
  switch(step){
    case 1:
      return (
        <Fragment>
          <div className="notifications notifications_center">
            <div className="notifications__item">
            <span className="text text_primary text_italic">
              Received on {toDate(order.received.date)} <br/> By: {order.received.name}
            </span>
            </div>
          </div>
          <div className="details">
            <div className="details__row">
              <div className="details__col">
                <p className="text text_bold">{order.items} Items</p>
              </div>
              <div className="details__col">
                <p className="text text_bold">{order.boxes} Boxes</p>
              </div>
            </div>
            <div className="details__outside">
              <div className="details__items">
                <div className="details__item">
                  <p className="text text_sm text_info">Delivered From</p>
                  <p className="text text_bold">{order.delivered.from}</p>
                </div>
                <div className="details__item">
                  <p className="text text_sm text_info">Delivered To</p>
                  <p className="text text_bold">{order.delivered.to}</p>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          <a href="/" className="link link_inverse text text_sm">&lt; back</a>
          <div className="details">
            <div className="details__row">
              <div className="details__col">
                <p className="text text_bold">Item 1 of 3</p>
              </div>
            </div>
            <h2 className="text text_bold text_center">27 iPhone X Black, Master Carton</h2>
          </div>
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
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
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <div>Head step 1</div>
        </Fragment>
      );
  }
};

const InspectionForm = ({handleSubmit, ...props}) => {
  return (
    <Form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      {renderFormSteps(props)}
    </Form>
  )
};

const dummyData = {
  id: 'CO817SHV8289',
  number: 'CO817SHV8289',
  delivered: {
    from: 'NCM Wireless Prime Trans, Miami, FL',
    to: 'Conextion Captains, Dubai, UAE'
  },
  tracking: {
    id: '12398712376592',
    company: 'FedEx'
  },
  items: 78,
  boxes: 3,
  received: {
    name: 'qwewqe',
    notes: 'adwqewq',
    date: '2020-06-30T15:15:00.941Z'
  },
  damage: 'no-damage',
  imageBOL: [
    {
      id: 'files-1',
      extension: 'png',
      sizeReadable: '68kB',
      preview: {
        type: 'image',
        url: 'blob:http://localhost:3001/73157560-56b0-4857-95d6-44cd768caebc'
      }
    }
  ],
  imagePackages: [
    {
      id: 'files-1',
      extension: 'png',
      sizeReadable: '2MB',
      preview: {
        type: 'image',
        url: 'blob:http://localhost:3001/94be204a-27f0-4a66-9624-a7aab1857add'
      }
    }
  ]
};

const InspectionOrder = ({prop}) => {

  const [step, setStep] = useState(1);

  const order = dummyData;

  const isLastStep = step === 3;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function submitForm(values, actions) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    setStep(step => step + 1);
  }

  function handleSubmit(values, actions) {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setStep(step => step + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  const backStep = () => setStep(step => step - 1);

  console.log();

  if(!order) return <Redirect to="/order"/>;

  return (
    <Fragment>

      <Header>
        <Heading variant='primary'>
          <h3>Order Inspection</h3>
        </Heading>
        {renderHeadSteps(step)}
      </Header>
      <div className={c('body')}>
        <Heading variant='primary' align="center">
          <h3>Order {order.number}</h3>
        </Heading>
        {renderBodySteps(step, order)}
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit.bind(this)}
        >
          {
            (props) => <InspectionForm backStep={backStep} step={step} {...props}/>
          }
        </Formik>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({loading, error, order: {item}}) => {
  return {
    loading,
    error,
    order: item
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(InspectionOrder);
