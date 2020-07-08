import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ResetPasswordForm } from '../../components/auth';

const validationSchema = Yup.object({
  email: Yup.string('Enter email')
    .required('Email is required')
    .email('Email isn\'t valid')
    .min(2, 'First name must contain at least 2 characters')
    .max(256, 'First name must contain on more 256 characters'),
});

const initialFormData = {
  email: '',
};

const ResetPassword = () => {
  const handleSubmit = (data) => {
    console.log('form submitted', data);
  };

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {
        (props) => <ResetPasswordForm {...props} />
      }
    </Formik>
  );
};

export default ResetPassword;
