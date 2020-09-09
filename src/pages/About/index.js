import About from './About';
import { connect } from 'react-redux';
import {setAboutPage} from '../../store/actions';

const mapStateToPros = state => ({
  language: state.language,
  aboutPage: state.aboutPage
})

const mapDispatchToProps = {
  setAboutPage
}

const newAbout = connect(
  mapStateToPros, 
  mapDispatchToProps
)(About)

export { newAbout as About };