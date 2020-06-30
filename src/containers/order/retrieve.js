import React, {Fragment, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import Heading from "../../components/typography/heading";
import block from "bem-cn-lite";
import Field from "../../components/ui/field";
import Stepper from "../../components/ui/stepper";
import Header from "../../components/header";
import * as Yup from "yup";
import {Formik} from "formik";
import {connect} from "react-redux";
import {fetchOrder} from "../../redux/actions/order";

const c = block('content');
const f = block('form');

const validationSchema = Yup.object({
  number: Yup.string("Order number email")
    .required("Order number is required")
    .min(2, 'Order number must contain at least 2 characters')
    .max(256, 'Order number must contain on more 256 characters'),
});

const initialFormData = {
  number: '',
};

const RetrieveForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isValid
  } = props;

  return (
    <form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      <Field
        id="number"
        type="text"
        name="number"
        label="Order Number"
        error={touched.number ? errors.number : ""}
        value={values.number}
        onChange={handleChange}
      />
      <p className="text text_sm text_lg-offset">
        The order number should be written on the manifest or BOL and typically starts with CO.
      </p>
      <div className="actions">
        <button disabled={!isValid} className="btn">Continue</button>
      </div>
    </form>
  )
};

const RetrieveOrder = ({fetchOrder, loading, error}) => {
  let history = useHistory();

  async function handleSubmit(data){
    await fetchOrder(data.number);
    history.push(`/order/${data.number}`);
  }

  if(loading) return <div>Loading</div>;
  if(error) return <div>Error</div>;

  return (
    <Fragment>
      <Header>
        <Heading variant='primary'>
          <h3>Hi Dascher, Enter an Order Number to Get Started</h3>
        </Heading>
        <Stepper steps={4} active={0} completed={0}/>
      </Header>
      <div className={c('body')}>
        <Heading variant="secondary">
          <h3>Retrieve an Order</h3>
        </Heading>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit.bind(this)}
        >
          {
            (props) => <RetrieveForm {...props}/>
          }
        </Formik>

      </div>
    </Fragment>
  );
};

const mapStateToProps = ({order: {loading, error}}) => {
  return {
    loading,
    error
  }
};

const mapDispatchToProps = {
  fetchOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(RetrieveOrder);