import Navigation from './Navigation'; 
import { connect } from 'react-redux';
import {setMenuShow} from '../../store/actions'; 

const mapStateToPros = state => ({
  menuShow: state.menuShow,
  language: state.language
})

const mapToDispatch = dispatch => ({
  setMenuShow: (status) => dispatch(setMenuShow(status)), 
})

const newNavigation = connect(
  mapStateToPros, 
  mapToDispatch
)(Navigation)

export { newNavigation as Navigation };