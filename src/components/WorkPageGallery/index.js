import {connect} from 'react-redux';
import WorkPageGallery from './WorkPageGallery';

const mapStateToPros = state => ({
  language: state.language
})

const newWorkPageGallery = connect(
  mapStateToPros, 
  null
)(WorkPageGallery)

export { newWorkPageGallery as WorkPageGallery };