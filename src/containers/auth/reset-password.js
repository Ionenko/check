import React, {Component} from 'react';
import {ResetPasswordForm} from "../../components/auth";
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string("Enter email")
    .required("Email is required")
    .email('Email isn\'t valid')
    .min(2, 'First name must contain at least 2 characters')
    .max(256, 'First name must contain on more 256 characters'),
});

const initialFormData = {
  email: '',
};

class ResetPassword extends Component {

  handleSubmit(data){
    console.log('form submitted', data)
  }

  render() {
    return (
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit.bind(this)}
      >
        {
          (props) => <ResetPasswordForm {...props}/>
        }
      </Formik>
    );
  }
}

export default ResetPassword;