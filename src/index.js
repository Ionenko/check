import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import './index.scss';
import { ApolloProvider } from '@apollo/react-hooks';
import store from './redux/store';
import App from './components/app';
import client from './apollo';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <ToastProvider placement="top-center">
            <App />
          </ToastProvider>
        </Router>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
