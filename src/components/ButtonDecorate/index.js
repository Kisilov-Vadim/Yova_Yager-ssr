import ButtonDecorate from './ButtonDecorate';
import { connect } from 'react-redux';

const mapStateToPros = state => ({
  language: state.language,
  screenWidth: state.screenWidth
})

const newButtonDecorate = connect(
  mapStateToPros, 
  null
)(ButtonDecorate)

export { newButtonDecorate as ButtonDecorate };