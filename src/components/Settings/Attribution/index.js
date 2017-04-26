import AttributionComponent from './attribution'

import { settingsAction, updateSimpleField } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  attributions: state.settings.attributions,
  attributionInput: state.simpleFields.attributionInput,
  addAttributionFailure: state.simpleFields.addAttributionFailure,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  settingsAction(prop, ...args) {
    dispatch(settingsAction(prop)(...args))
  },
  updateAttributionInput: value => {
    dispatch(updateSimpleField('attributionInput')(value))
  },
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
})

const Attribution = connect(mapStateToProps, mapDispatchToProps)(
  AttributionComponent
)

export default Attribution
