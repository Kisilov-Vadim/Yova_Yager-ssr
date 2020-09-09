import MainSociality from './MainSociality';
import { connect } from 'react-redux';

const mapStateToPros = state => ({
  allSocialities: state.allSocialities, 
  language: state.language,
  allText: state.allText
})

const newMainSociality = connect(
  mapStateToPros, 
  null
)(MainSociality)

export { newMainSociality as MainSociality };