import React from 'react';
import block from 'bem-cn-lite';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';
import Header from '../../components/header';
import Heading from '../../components/typography/heading';
import Stepper from '../../components/ui/stepper';
import RadioGroup from '../../components/ui/radio-group';
import iconPlus from '../../img/plus.svg';
import Field from '../../components/ui/field';
import File from '../../components/ui/file';
import {
  confirmOrder,
  updateError,
  updateLoaded,
  updateRequested,
} from '../../redux/actions/order';
import { getTotalItems } from '../../helpers/orderUtils';
import { useConfirmOrderReceived } from '../../hooks/order';
import Spinner from '../../components/spinner';

const c = block('content');
const f = block('form');

const validationSchema = Yup.object({
  name: Yup.string('Name')
    .required('Name is required')
    .min(2, 'Name must contain at least 2 characters')
    .max(256, 'Name must contain on more 256 characters'),
  notes: Yup.string('Notes')
    .required('Notes is required')
    .min(2, 'Notes must contain at least 2 characters')
    .max(256, 'Notes must contain on more 256 characters'),
  packageDamaged: Yup.boolean('Damage')
    .required('Option is required')
    .nullable(true),
  bolImages: Yup.string('BOL Images').required('File is required'),
  packageImages: Yup.string('Package Images').required('File is required'),
});

const initialFormData = {
  name: '',
  notes: '',
  packageDamaged: null,
  bolImages: '',
  packageImages: '',
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
    <Form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
      <div className={f('group')}>
        <RadioGroup
          className={f('radio-buttons')}
          items={[
            { value: false, label: 'No Damage' },
            { value: true, label: 'Package Damaged' },
          ]}
          name="packageDamaged"
          value={values.packageDamaged}
          error={errors.packageDamaged}
          touched={touched.packageDamaged}
          setFieldValue={setFieldValue}
        />
        <div className={f('buttons')}>
          <File
            className="btn btn-file"
            onChange={(file) => setFieldValue('bolImages', file)}
            accepts={['image/*']}
            multiple={false}
            maxFileSize={10000000}
            minFileSize={0}
            value={values.bolImages}
            error={errors.bolImages}
            clickable
            name="bolImages"
          >
            <img src={iconPlus} alt="icon check" />
            <span>Add image of BOL</span>
          </File>
          <File
            className="btn btn-file"
            onChange={(files) => setFieldValue('packageImages', files)}
            accepts={['image/*']}
            multiple={false}
            maxFiles={3}
            maxFileSize={10000000}
            minFileSize={0}
            clickable
            value={values.packageImages}
            error={errors.packageImages}
            name="packageImages"
          >
            <img src={iconPlus} alt="icon check" />
            <span>Add image of package(s)</span>
          </File>
        </div>
      </div>
      <Field
        id="notes"
        type="text"
        name="notes"
        multi
        label="Notes"
        error={touched.notes ? errors.notes : ''}
        value={values.notes}
        onChange={handleChange}
      />
      <Field
        id="name"
        type="text"
        name="name"
        label="Your Name"
        error={touched.name ? errors.name : ''}
        value={values.name}
        onChange={handleChange}
      />
      <div className="actions">
        <button type="submit" className="btn">Receive Shipment</button>
      </div>
    </Form>
  );
};

ReceiveForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  touched: PropTypes.objectOf(PropTypes.any).isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

const ReceiveOrder = (props) => {
  const {
    order,
    loading,
    confirmOrder,
  } = props;

  const history = useHistory();
  const client = useApolloClient();
  const { addToast } = useToasts();

  async function handleSubmit(data) {
    try {
      const order = await confirmOrder(client, {
        token: props.match.params.id,
        packageDamaged: data.packageDamaged,
        bolImages: data.bolImages,
        packageImages: data.packageImages,
        notes: data.notes,
      });
      history.push(`/order/${order.id}/inspection`);
    } catch (err) {
      console.log(err);
      addToast(
        err,
        {
          appearance: 'error',
        },
      );
    }
  }

  if (!order) return <Redirect to="/" />;

  return (
    <>
      {
        loading ? <Spinner /> : null
      }
      <Header>
        <Heading variant="primary">
          <h3>Has the order arrived?</h3>
        </Heading>
        <p className="text">When an order first comes in, it needs to be received.</p>
        <Stepper steps={4} active={1} completed={1} />
      </Header>
      <div className={c('body')}>
        <Heading align="center" variant="secondary">
          <h3>
            Order
            {order.token}
          </h3>
        </Heading>
        <div className="details">
          <div className="details__row">
            <div className="details__col">
              <p className="text text_bold">{pluralize('Item', getTotalItems(order.orderLines), true)}</p>
            </div>
            <div className="details__col">
              <p className="text text_bold">{pluralize('Box', order.orderLines.length, true)}</p>
            </div>
          </div>
          {
            0 ? (
              <div className="details__outside">
                <div className="details__items">
                  <div className="details__item">
                    <p className="text text_sm text_info">Delivered From</p>
                    <p className="text text_bold">order.delivered.from</p>
                  </div>
                  <div className="details__item">
                    <p className="text text_sm text_info">Delivered To</p>
                    <p className="text text_bold">order.delivered.to</p>
                  </div>
                </div>
                <div className="details__info">
                  <p className="text text_sm text_info">Tracking Info</p>
                  <p className="text text_bold text_underline">
                    order.tracking.company
                    {' '}
                    order.tracking.id
                  </p>
                </div>
              </div>
            ) : null
          }
        </div>
        <p className="text text_sm text_secondary">Was the package damaged?</p>
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            (props) => <ReceiveForm {...props} />
          }
        </Formik>
      </div>
    </>
  );
};

ReceiveOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    state: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
    token: PropTypes.string,
    freightInfo: PropTypes.object,
  }).isRequired,
  confirmOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ order: { loading, error, item } }) => ({
  loading,
  error,
  order: item,
});

const mapDispatchToProps = {
  confirmOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveOrder);
