import SelectLanguage from './SelectLanguage';
import { connect } from 'react-redux';
import {setIsLoaded, changeLanguage, getAllData } from '../../store/actions';

const mapStateToPros = state => ({
  language: state.language
})

const mapToDispatch = {
  changeLanguage,
  getAllData,
  setIsLoaded
}

const newSelectLanguage = connect(
  mapStateToPros, 
  mapToDispatch
)(SelectLanguage)

export { newSelectLanguage as SelectLanguage };