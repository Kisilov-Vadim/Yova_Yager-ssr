import SliderMenu from './SliderMenu';
import { connect } from 'react-redux';

const mapStateToPros = state => ({
  menuShow: state.menuShow
})

const newSliderMenu = connect(
  mapStateToPros, 
  null
)(SliderMenu)

export { newSliderMenu as SliderMenu };