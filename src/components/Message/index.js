import {connect} from 'react-redux';
import Message from './Message'; 

const mapStateToPros = state => ({
  language: state.language, 
  allText: state.allText
})

const newMessage = connect(
  mapStateToPros, 
  null
)(Message)

export { newMessage as Message };