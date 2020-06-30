import React, {Component, useEffect} from 'react';
import {LoginForm} from "../../components/auth";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {default as AuthService} from '../../api/auth';
import {withRouter} from "react-router-dom";
import {gql} from 'apollo-boost';
import {useApolloClient, useMutation} from "@apollo/react-hooks";

const validationSchema = Yup.object({
  email: Yup.string("Enter email")
    .required("Email is required")
    .email('Email isn\'t valid')
    .min(2, 'Email must contain at least 2 characters')
    .max(256, 'Email must contain on more 256 characters'),
  password: Yup.string("Enter password")
    .required("Password is required")
    .min(6, 'Password must contain at least 6 characters')
    .max(256, 'Password must contain on more 256 characters'),
});

const initialFormData = {
  email: '',
  password: '',
};


export const LOGIN_USER = gql`
    mutation Login($email: String!) {
        login(email: $email)
    }
`;

const Login = ({history}) => {

  const client = useApolloClient();

  async function fetchData({email, password}){
    try {
      const intent = await client.mutate({
        mutation: LOGIN_USER,
        variables: {
          email
        }
      });
      const {data: {login}} = intent;
      localStorage.setItem('token', login);
      client.writeData({data: {isLoggedIn: true}});
    } catch (err) {
      console.log(err)
    }
  }

  async function handleSubmit(data) {
    console.log('form submitted', data.email);
    await fetchData(data);
    const isAuth = await AuthService.authenticate();
    isAuth && history.push('/order');
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>An error occurred</p>;

  return (
    <Formik
      initialValues={initialFormData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit.bind(this)}
    >
      {
        (props) => <LoginForm {...props}/>
      }
    </Formik>
  );
};

export default withRouter(Login);