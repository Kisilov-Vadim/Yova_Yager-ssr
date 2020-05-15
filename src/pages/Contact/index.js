import Contact from './Contact'
import { connect } from 'react-redux'
import { setContactPage } from '../../store/actions';

const mapStateToProps = state => ({
  contactPage: state.contactPage,
  language: state.language
})

const newContact = connect(
  mapStateToProps, 
  null
)(Contact)

export { newContact as Contact }; 