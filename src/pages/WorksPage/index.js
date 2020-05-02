import WorksPage from './WorksPage';
import { connect } from 'react-redux';
import {setAllWorks} from '../../store/actions';

const mapStateToPros = state => ({
  works: state.works, 
  language: state.language,
})

const mapDispatchToProps = {
  setAllWorks,
}

const newWorksPage = connect(
  mapStateToPros, 
  mapDispatchToProps
)(WorksPage)

export { newWorksPage as WorksPage };