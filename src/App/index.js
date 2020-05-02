import React from 'react';
import App from './App'; 
import { connect } from 'react-redux';
import {getAllData} from '../store/actions';

const mapStateToPros = state => ({
  featured: state.featured, 
  works: state.works,
  isLoaded: state.isLoaded, 
  allSocialities: state.allSocialities,
  language: state.language
})

const mapToDispatch = {
   getAllData
}

const newApp = connect(
  mapStateToPros, 
  mapToDispatch
)(App)

export { newApp as App };