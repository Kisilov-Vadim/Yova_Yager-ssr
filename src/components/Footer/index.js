import Footer from './Footer';
import { connect } from 'react-redux';

const mapStateToPros = state => ({
  language: state.language, 
  allText: state.allText
})

const newFooter = connect(
  mapStateToPros, 
  null
)(Footer)

export { newFooter as Footer };