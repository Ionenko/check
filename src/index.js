import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from './redux/store';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-mui';
import './index.scss';
import App from './components/app';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from 'apollo-boost';

import {ApolloProvider} from '@apollo/react-hooks';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  }),
  resolvers: {},
});

// cache.writeData({
//   data: {
//     isLoggedIn: !!localStorage.getItem('token'),
//   },
// });

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <AlertProvider template={AlertTemplate}>
            <App />
          </AlertProvider>
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

