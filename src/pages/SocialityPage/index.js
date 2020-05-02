import SocialityPage from './SocialityPage';
import { connect } from 'react-redux';
import { setAllSocialities } from '../../store/actions';

const mapStateToPros = state => ({
  screenWidth: state.screenWidth,
  allSocialities: state.allSocialities,
  language: state.language,
  allText: state.allText,
})

const mapDispatchToProps = {
  setAllSocialities,
}

const newSocialityPage = connect(
  mapStateToPros, 
  mapDispatchToProps
)(SocialityPage)

export { newSocialityPage as SocialityPage };