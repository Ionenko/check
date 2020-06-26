import React, {Component} from 'react';
import {LoginForm} from "../../components/auth";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {default as AuthService} from '../../api/auth';
import { withRouter  } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string("Enter email")
    .required("Email is required")
    .email('Email isn\'t valid')
    .min(2, 'First name must contain at least 2 characters')
    .max(256, 'First name must contain on more 256 characters'),
  password: Yup.string("Enter password")
    .required("Password is required")
    .min(6, 'Password must contain at least 6 characters')
    .max(256, 'Password must contain on more 256 characters'),
});

const initialFormData = {
  email: '',
  password: '',
};


class Login extends Component {

  async handleSubmit(data){
    console.log('form submitted', data);
    const isAuth = await AuthService.authenticate();
    isAuth && this.props.history.push('/order');
  }

  render() {
    return (
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={this.handleSubmit.bind(this)}
      >
        {
          (props) => <LoginForm {...props}/>
        }
      </Formik>
    );
  }
}

export default withRouter(Login);