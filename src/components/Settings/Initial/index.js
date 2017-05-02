import InitialComponent from './initial'

import { updateSimpleField, settingsAction } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  simpleFields: state.simpleFields,
  initialAmount: state.settings.initialAmount,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
  settingsAction(key, ...args) {
    dispatch(settingsAction(key)(...args))
  },
})

const Initial = connect(mapStateToProps, mapDispatchToProps)(InitialComponent)

export default Initial
