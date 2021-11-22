import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { ChakraProvider } from "@chakra-ui/react"
import {BrowserRouter as Router} from 'react-router-dom'


ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
    <Router>
      <App />
    </Router>
    </Provider >,
  </ChakraProvider >,
  document.getElementById('root')
);

