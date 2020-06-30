import React, {useEffect, useState} from 'react';
import {Redirect, Route} from "react-router-dom";
import {default as AuthService} from '../../api/auth';
import {gql} from "apollo-boost";
import {useApolloClient} from "@apollo/react-hooks";

// const IS_LOGGED_IN = gql`
//     query IsUserLoggedIn {
//         isLoggedIn @client
//     }
// `;
//
// async function fetchIsLoggedIn(client) {
//   return await client.query({
//     query: IS_LOGGED_IN,
//   });
// }
//
// const client = useApolloClient();
//
// useEffect(() => {
//   let isSubscribed = true;
//
//   fetchIsLoggedIn(client)
//     .then(({data: {isLoggedIn}}) => {
//       console.log(isLoggedIn);
//       return isSubscribed ? setIsLoggedIn(isLoggedIn) : null
//     })
//     .catch(err => {
//       return isSubscribed ? setError(err.toString()) : null
//     });
//
//   return () => (isSubscribed = false);
// });
//
// useEffect(() => {
//   console.log('isLoggedIn', isLoggedIn)
// }, [isLoggedIn]);

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;