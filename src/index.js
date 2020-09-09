import React from 'react';
import {hydrate} from 'react-dom';
import {App} from './App/index';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter  } from "react-router-dom";

hydrate(
   <BrowserRouter>
      <Provider store={store}>
          <App />
      </Provider>
  </BrowserRouter >
  , document.getElementById("root")
);
