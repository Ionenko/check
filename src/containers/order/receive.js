import React, {Fragment} from "react";
import Header from "../../components/header";
import Heading from "../../components/typography/heading";
import Stepper from "../../components/ui/stepper";
import RadioGroup from "../../components/ui/radio-group";
import iconPlus from "../../img/plus.svg";
import Field from "../../components/ui/field";
import block from "bem-cn-lite";
import * as Yup from "yup";
import {Form, Formik} from "formik";
import File from "../../components/ui/file";
import {connect} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {receiveOrder} from "../../redux/actions/order";

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
  imageBOL: Yup.array()
    .of(
      Yup.object().nullable(true)
    )
    .required('File is required')
    .min(1, 'Minimum of 1 file'),
  imagePackages: Yup.array()
    .of(
      Yup.object().nullable(true)
    )
    .required('File is required')
    .min(1, 'Minimum of 1 file')
});

const initialFormData = {
  name: '',
  notes: '',
  damage: '',
  imageBOL: undefined,
  imagePackages: undefined,
};

const ReceiveForm = (props) => {

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = props;

  return (
    <Form className={f()} noValidate  onSubmit={handleSubmit} autoComplete="off">
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
        <div className={f('buttons')}>
          <File
            className='btn btn-file'
            onChange={file => setFieldValue('imageBOL', file)}
            accepts={['image/*']}
            multiple={false}
            maxFileSize={10000000}
            minFileSize={0}
            value={values.imageBOL}
            error={errors.imageBOL}
            clickable
            name='imageBOL'
          >
            <img src={iconPlus} alt="icon check"/>
            <span>Add image of BOL</span>
          </File>
          <File
            className='btn btn-file'
            onChange={files => setFieldValue('imagePackages', files)}
            accepts={['image/*']}
            multiple
            maxFiles={3}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
            value={values.imagePackages}
            error={errors.imagePackages}
            name='imagePackages'
          >
            <img src={iconPlus} alt="icon check"/>
            <span>Add image of package(s)</span>
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
        <button type="submit" className="btn">Receive Shipment</button>
      </div>
    </Form>
  )
};

const ReceiveOrder = ({order, receiveOrder}) => {
  let history = useHistory();

  function handleSubmit(data){
    const receivedData = {
      received: {
        name: data.name,
        notes: data.notes,
        date: new Date(),
      },
      damage: data.damage,
      imageBOL: data.imageBOL,
      imagePackages: data.imagePackages,
    };
    receiveOrder(receivedData);
    history.push(`/order/${order.number}/inspection`);
  }

  if(!order) return <Redirect to="/order"/>;

  return (
    <Fragment>
      <Header>
        <Heading variant='primary'>
          <h3>Has the order arrived?</h3>
        </Heading>
        <p className="text">When an order first comes in, it needs to be received.</p>
        <Stepper steps={4} active={1} completed={1}/>
      </Header>
      <div className={c('body')}>
        <Heading align='center' variant='secondary'>
          <h3>Order {order.number}</h3>
        </Heading>
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
            <div className="details__info">
              <p className="text text_sm text_info">Tracking Info</p>
              <p className="text text_bold text_underline">{order.tracking.company} {order.tracking.id}</p>
            </div>
          </div>
        </div>
        <p className="text text_sm text_secondary">Was the package damaged?</p>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit.bind(this)}
        >
          {
            (props) => <ReceiveForm {...props}/>
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
  receiveOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveOrder);