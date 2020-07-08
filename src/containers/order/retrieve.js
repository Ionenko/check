import React from 'react';
import { useHistory } from 'react-router-dom';
import block from 'bem-cn-lite';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from '../../components/typography/heading';
import Field from '../../components/ui/field';
import Stepper from '../../components/ui/stepper';
import Header from '../../components/header';
import {
  orderError,
  orderLoaded,
  orderRequested,
} from '../../redux/actions/order';
import { useOrderQuery } from '../../hooks/order';
import Spinner from '../../components/spinner';

const c = block('content');
const f = block('form');

const validationSchema = Yup.object({
  token: Yup.string('Order number email')
    .required('Order number is required')
    .min(2, 'Order number must contain at least 2 characters')
    .max(256, 'Order number must contain on more 256 characters'),
});

const initialFormData = {
  token: '',
};

const RetrieveForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
  } = props;

  return (
    <Form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      <Field
        id="token"
        type="text"
        name="token"
        label="Order Number"
        error={touched.token ? errors.token : ''}
        value={values.token}
        onChange={handleChange}
      />
      <p className="text text_sm text_lg-offset">
        The order number should be written on the manifest or BOL and typically starts with CO.
      </p>
      <div className="actions">
        <button type="submit" className="btn">Continue</button>
      </div>
    </Form>
  );
};

RetrieveForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
};

const useRedirect = () => {
  const history = useHistory();

  return (state, id) => {
    switch (state) {
      case 'Pending':
        history.push(`/order/${id}`);
        break;
      case 'Received by warehouse':
        history.push(`/order/${id}/inspection`);
        break;
      case 'Checked by buyer':
        history.push(`/order/${id}/complete`);
        break;
      default:
        history.push(`/order/${id}`);
    }
  };
};

const RetrieveOrder = (props) => {
  const {
    loading,
    error,
    orderRequested,
    orderLoaded,
    orderError,
  } = props;

  const fetchOrder = useOrderQuery();
  const redirectTo = useRedirect();

  async function handleSubmit(data) {
    orderRequested();
    try {
      const res = await fetchOrder(data.token);
      orderLoaded(res.data.orderForInspection);
      redirectTo(
        res.data.orderForInspection.state,
        res.data.orderForInspection.id
      );
    } catch (err) {
      orderError(err.message);
    }
  }

  return (
    <>
      {
        loading ? <Spinner /> : null
      }
      <Header>
        <Heading variant="primary">
          <h3>Hi Dascher, Enter an Order Number to Get Started</h3>
        </Heading>
        <Stepper steps={4} active={0} completed={0} />
      </Header>
      <div className={c('body')}>
        <Heading variant="secondary">
          <h3>Retrieve an Order</h3>
        </Heading>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            (props) => <RetrieveForm {...props} />
          }
        </Formik>
        {
          error && (
          <p>
            $
            {error}
          </p>
          )
        }
      </div>
    </>
  );
};

RetrieveOrder.defaultProps = {
  error: '',
};

RetrieveOrder.propTypes = {
  error: PropTypes.string,
  orderRequested: PropTypes.func.isRequired,
  orderLoaded: PropTypes.func.isRequired,
  orderError: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ order: { loading, error } }) => ({
  loading,
  error,
});

const mapDispatchToProps = {
  orderRequested,
  orderLoaded,
  orderError,
};

export default connect(mapStateToProps, mapDispatchToProps)(RetrieveOrder);
