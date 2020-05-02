import Contact from './Contact'
import { connect } from 'react-redux'
import { setContactPage } from '../../store/actions';

const mapStateToProps = state => ({
  contactPage: state.contactPage,
  language: state.language
})

const mapDispatchToProps = {
  setContactPage
}

const newContact = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Contact)

export { newContact as Contact }; 