import Header from './Header';
import { connect } from 'react-redux';
import {setMenuShow, changeLanguage, setScreenWidth} from '../../store/actions';

const mapStateToPros = state => ({
  screenWidth: state.screenWidth,
  menuShow: state.menuShow,
  language: state.language 
})

const mapToDispatch = dispatch => ({
  setScreenWidth: (width) => dispatch(setScreenWidth(width)),
  setMenuShow: (status) => dispatch(setMenuShow(status)), 
  changeLanguage: (language) => dispatch(changeLanguage(language))
})

const newHeader = connect(
  mapStateToPros, 
  mapToDispatch
)(Header)

export { newHeader as Header };