import React, {Fragment, useState} from "react";
import Header from "../../components/header";
import Heading from "../../components/typography/heading";
import Stepper from "../../components/ui/stepper";
import Field from "../../components/ui/field";
import block from "bem-cn-lite";
import * as Yup from "yup";
import {FieldArray, Form, Formik} from "formik";
import {Redirect, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {toDate} from "../../helpers/date";
import InputNumeric from "../../components/ui/numeric";
import RadioGroup from "../../components/ui/radio-group";
import iconPlus from "../../img/plus.svg";
import File from "../../components/ui/file";
import pluralize from 'pluralize';
import {getBoxProductsArray} from "../../helpers/orderUtils";

const c = block('content');
const f = block('form');

const validationSchema = [
  Yup.object().shape({
    name: Yup.string("Name")
      .required("Name is required")
      .min(2, 'Name must contain at least 2 characters')
      .max(256, 'Name must contain on more 256 characters')
  }),
  Yup.object().shape({
    receivedItems: Yup.array()
      .of(
        Yup.object().shape({
          quantity: Yup.number('Quantity'),
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
        }).nullable(true)
      )
  }).nullable(true),
  Yup.object().shape({
    finalNotes: Yup.string("Final notes")
      .required("Notes is required")
      .min(2, 'Notes must contain at least 2 characters')
      .max(256, 'Notes must contain on more 256 characters'),
  }),
];

const initialItemData = {
  notes: '',
  damage: '',
  match: '',
  quantity: 0,
  image: undefined,
};

const initialFormData = {
  name: '',
  finalNotes: '',
  receivedItems: [
    {
      ...initialItemData
    }
  ]
};


const renderFormSteps = (props) => {
  const {
    handleChange,
    values,
    errors,
    touched,
    step,
    setFieldValue,
    isValid
  } = props;

  function handleConfirmItem(push){
    // console.log(props);
    if(isValid) {
      push(initialFormData)
    }
  }

  switch(step){
    case 0:
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
    case 1:
      return (
        <Fragment>
          <FieldArray name="receivedItems" render={({ insert, push }) => (
            <Fragment>
              {
                values.receivedItems.length > 0 &&
                values.receivedItems.map((item, index) => (
                  <Fragment key={index}>
                    <div className={f('row')}>
                      <div className={f('col', {center: true})}>
                        <span className="text text_secondary text_sm">Quantity Received</span>
                      </div>
                      <div className={f('col', {center: true})}>
                        <InputNumeric
                          onChange={ value => setFieldValue(`receivedItems.${index}.quantity`, value)}
                          name={`receivedItems.${index}.quantity`}
                          min={0}
                          max={100}
                          value={values.receivedItems[index].quantity}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className={f('group')}>
                      <RadioGroup
                        className={f('radio-buttons')}
                        items={[
                          {value: 'no-damage', label: 'No Damage'},
                          {value: 'damage', label: 'Package Damaged'},
                        ]}
                        name={`receivedItems.${index}.damage`}
                        value={values.receivedItems[index].damage}
                        error={errors.receivedItems && errors.receivedItems[index].damage }
                        // touched={touched.receivedItems && touched.receivedItems[index].damage}
                        setFieldValue={setFieldValue}
                      />
                      <RadioGroup
                        className={f('radio-buttons')}
                        items={[
                          {value: 'match', label: 'Matches BOL'},
                          {value: 'mismatch', label: 'Product Mismatch'},
                        ]}
                        name={`receivedItems.${index}.match`}
                        value={values.receivedItems[index].match}
                        error={errors.receivedItems && errors.receivedItems[index].match}
                        // touched={touched.receivedItems && touched.receivedItems[index].match}
                        setFieldValue={setFieldValue}
                      />
                      <div className={f('buttons')}>
                        <File
                          className='btn btn-file'
                          onChange={file => setFieldValue(`receivedItems.${index}.image`, file)}
                          accepts={['image/*']}
                          multiple={false}
                          maxFileSize={10000000}
                          minFileSize={0}
                          value={values.receivedItems[index].image}
                          error={errors.receivedItems && errors.receivedItems[index].image}
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
                      name={`receivedItems.${index}.notes`}
                      multiline
                      label="Notes"
                      error={errors.receivedItems && errors.receivedItems[index].notes}
                      value={values.receivedItems[index].notes}
                      onChange={handleChange}
                    />
                  </Fragment>
                ))
              }
              <div className="actions">
                <button type="button" onClick={() => handleConfirmItem(push)} className="btn">Confirm Item</button>
              </div>
            </Fragment>
          )}>
          </FieldArray>
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          <Field
            id="finalNotes"
            name="finalNotes"
            multiline
            label="Final Notes"
            error={touched.finalNotes ? errors.finalNotes : ""}
            value={values.finalNotes}
            onChange={handleChange}
          />
          <div className="actions">
            <button type="submit" className="btn">Confirm Item</button>
          </div>
        </Fragment>
      );
    default:
      return null;
  }
};

const renderHeadSteps = (step) => {
  switch(step){
    case 0:
      return (
        <Fragment>
          <p className="text">You will now go through the package contents to ensure each item is as described.</p>
          <Stepper steps={4} active={3} completed={2}/>
        </Fragment>
      );
    case 1:
      return (
        <Fragment>
          <p className="text">You will now go through the package contents to ensure each item is as described.</p>
          <Stepper steps={4} active={4} completed={3}/>
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          <p className="text">Confirm final inspection</p>
          <Stepper steps={4} active={4} completed={4}/>
        </Fragment>
      );
    default:
      return null;
  }
};


const renderBodySteps = (step, order, handleBack, currentBox) => {

  switch(step){
    case 0:
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
                <p className="text text_bold">{pluralize('Item', order.items.length, true)}</p>
              </div>
              <div className="details__col">
                <p className="text text_bold">{pluralize('Box', order.boxes.length, true)}</p>
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
    case 1:

      const orderItems = getBoxProductsArray(order, currentBox);

      return (
        <Fragment>
          <span onClick={handleBack} className="link link_inverse text text_sm">&lt; back</span>
          <div className="details">
            <div className="details__row">
              <div className="details__col">
                <p className="text text_bold">Item {currentBox + 1} of {order.boxes.length}</p>
              </div>
            </div>
            {
              orderItems.map( item => (
                <h2 key={item.id} className="text text_bold text_center">
                  {`${item.count} ${item.name}`}
                </h2>
              ))
            }
          </div>
        </Fragment>
      );
    case 2:
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
      return null;
  }
};

const InspectionForm = ({handleSubmit, ...props}) => {
  return (
    <Form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      {renderFormSteps(props)}
      <h3>Errors:</h3>
      {JSON.stringify(props.errors, null, 2)}
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
  items: [
    {
      id: 'idx-1',
      name: 'IPhone X Black, Master Carton',
      count: 27,
    },
    {
      id: 'idx-2',
      name: 'Apple Watch Nike 44mm',
      count: 21,
    },
    {
      id: 'idx-3',
      name: 'MackBook Pro 2020',
      count: 30,
    }
  ],
  boxes: [
    {
      id: 'idx-b-1',
      items: [
        'idx-1',
      ]
    },
    {
      id: 'idx-b-2',
      items: [
        'idx-2',
        'idx-3',
      ]
    },{
      id: 'idx-b-3',
      items: [
        'idx-3',
      ]
    }
  ],
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

const InspectionOrder = () => {
  let history = useHistory();

  const [step, setStep] = useState(0);
  const [currentBox, setCurrentBox] = useState(2);

  const order = dummyData;

  const isLastStep = step === 2;

  function handleSubmit(values, actions) {
    if (isLastStep) {
      console.log('submitForm');
      alert(JSON.stringify(values, null, 2));
      history.push(`/order/${order.number}/complete`);
    } else {
      setStep(step => step + 1);
    }

    actions.setSubmitting(false);
  }

  const handleBack = () => setStep(step => step - 1);

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
        {renderBodySteps(step, order, handleBack, currentBox, setCurrentBox)}
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema[step]}
          onSubmit={handleSubmit.bind(this)}
          render={(props) => (
            <InspectionForm
              step={step}
              {...props}
            />
          )}
        />
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