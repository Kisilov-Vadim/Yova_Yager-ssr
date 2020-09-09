import {connect} from 'react-redux';
import WorksCard from './WorksCard';


const mapStateToPros = state => ({
  screenWidth: state.screenWidth,
  language: state.language
})

const newWorksCard = connect(
  mapStateToPros, 
  null
)(WorksCard)

export { newWorksCard as WorksCard };