import {connect} from 'react-redux';
import WorksPageNav from './WorksPageNav';

const mapStateToPros = state => ({
  language: state.language
})


const newWorksPageNav = connect(
  mapStateToPros, 
  null
)(WorksPageNav)

export { newWorksPageNav as WorksPageNav };