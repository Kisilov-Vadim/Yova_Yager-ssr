import React from 'react';
import App from './App'; 
import { connect } from 'react-redux';

const mapStateToPros = state => ({
  featured: state.featured, 
  works: state.works,
  isLoaded: state.isLoaded, 
  allSocialities: state.allSocialities,
  language: state.language
})


const newApp = connect(
  mapStateToPros, 
  null
)(App)

export { newApp as App };