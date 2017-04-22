import SettingsComponent from './settings'

import '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const Settings = connect(mapStateToProps, mapDispatchToProps)(SettingsComponent)

export default Settings
