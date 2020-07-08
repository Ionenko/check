import React, { useState } from 'react';
import block from 'bem-cn-lite';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Redirect, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from '../../components/typography/heading';
import Header from '../../components/header';
import {
  InspectionHeadSteps,
  InspectionBodySteps,
  InspectionFormSteps,
} from '../../components/inspection-steps';
import { useCompleteInspection } from '../../hooks/order';
import {
  updateError,
  updateLoaded,
  updateRequested,
} from '../../redux/actions/order';
import Spinner from '../../components/spinner';

const c = block('content');
const f = block('form');

const validationSchema = [
  Yup.object().shape({
    name: Yup.string('Name')
      .required('Name is required')
      .min(2, 'Name must contain at least 2 characters')
      .max(256, 'Name must contain on more 256 characters'),
  }),
  Yup.object().shape({
    orderLines: Yup.array()
      .of(
        Yup.object().shape({
          quantityReceived: Yup.number('Quantity'),
          notes: Yup.string('Notes')
            .required('Notes is required')
            .min(2, 'Notes must contain at least 2 characters')
            .max(256, 'Notes must contain on more 256 characters'),
          packageDamaged: Yup.boolean('Damage')
            .required('Option is required')
            .nullable(true),
          bolMismatch: Yup.boolean('Matches')
            .required('Option is required')
            .nullable(true),
          packageImages: Yup.string('Package Images').required('File is required'),
        }).nullable(true),
      ),
  }).nullable(true),
  Yup.object().shape({
    finalNotes: Yup.string('Final notes')
      .required('Notes is required')
      .min(2, 'Notes must contain at least 2 characters')
      .max(256, 'Notes must contain on more 256 characters'),
  }),
];

const initialItemData = {
  notes: '',
  packageDamaged: null,
  bolMismatch: null,
  quantityReceived: 0,
  packageImages: '',
};
const initialFormData = {
  name: '',
  finalNotes: '',
  orderLines: [
    {
      ...initialItemData,
    },
  ],
};

const InspectionForm = ({ handleSubmit, ...props }) => (
  <Form className={f()} noValidate onSubmit={handleSubmit} autoComplete="off">
    <InspectionFormSteps {...props} />
  </Form>
);

InspectionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const InspectionOrder = (props) => {
  const {
    updateRequested,
    updateLoaded,
    updateError,
    order,
    loading,
  } = props;
  const history = useHistory();
  const completeInspection = useCompleteInspection();

  const [step, setStep] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  const isLastStep = step === 2;

  const backStep = () => setStep((step) => step - 1);
  const nextStep = () => setStep((step) => step + 1);
  const nextItem = () => setCurrentLine((line) => line + 1);

  async function handleSubmit(values, actions) {
    if (isLastStep) {
      try {
        updateRequested();
        const res = await completeInspection({
          token: order.token,
          notes: values.finalNotes,
        });
        updateLoaded(res.data.completeOrderInspection);
        history.push(`/order/${order.id}/complete`);
      } catch (err) {
        console.log(err);
        updateError(err);
      }
    } else {
      nextStep();
    }

    actions.setSubmitting(false);
  }

  if (!order) return <Redirect to="/order" />;

  return (
    <>
      {
        loading ? <Spinner /> : null
      }
      <Header>
        <Heading variant="primary">
          <h3>Order Inspection</h3>
        </Heading>
        <InspectionHeadSteps step={step} />
      </Header>
      <div className={c('body')}>
        <Heading variant="primary" align="center">
          <h3>
            Order { order.token }
          </h3>
        </Heading>
        <InspectionBodySteps
          step={step}
          order={order}
          backStep={backStep}
          currentLine={currentLine}
        />
        <Formik
          initialValues={initialFormData}
          validationSchema={validationSchema[step]}
          onSubmit={handleSubmit}
        >
          {
            (props) => (
              <InspectionForm
                {...props}
                step={step}
                currentLine={currentLine}
                nextItem={nextItem}
                nextStep={nextStep}
                order={order}
              />
            )
          }
        </Formik>
      </div>
    </>
  );
};

InspectionOrder.defaultProps = {
  order: null,
  loading: false,
};

InspectionOrder.propTypes = {
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
  updateRequested: PropTypes.func.isRequired,
  updateLoaded: PropTypes.func.isRequired,
  updateError: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = ({ order: { loading, error, item } }) => ({
  loading,
  error,
  order: item,
});

const mapDispatchToProps = {
  updateRequested,
  updateLoaded,
  updateError,
};

export default connect(mapStateToProps, mapDispatchToProps)(InspectionOrder);
