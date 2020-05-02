import MainPage from './MainPage';
import { connect } from 'react-redux';
import {setAllSocialities, setAllWorks} from '../../store/actions';

const mapStateToPros = state => ({
  works: state.works,
  allSocialities: state.allSocialities, 
  allText: state.allText,
  language: state.language,
})

const mapDispatchToProps = {
  setAllSocialities,
  setAllWorks,
}

const newMainPage = connect(
  mapStateToPros, 
  mapDispatchToProps
)(MainPage)

export { newMainPage as MainPage };