import MainWaveAnimatione from './MainWaveAnimatione';
import { connect } from 'react-redux';

const mapStateToPros = state => ({
  screenWidth: state.screenWidth
})

const newMainWaveAnimatione = connect(
  mapStateToPros, 
  null
)(MainWaveAnimatione)

export { newMainWaveAnimatione as MainWaveAnimatione };