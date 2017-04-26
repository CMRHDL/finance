import NewRecordsetComponent from './newrecordset'

import {
  updateNewRecordset,
  addedRecordsetAction,
  updateSimpleField,
  updateCodePosition,
} from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  attributions: state.settings.attributions,
  newRecordset: state.newRecordset,
  code: state.code,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNewRecordset(prop, ...args) {
    dispatch(updateNewRecordset(prop)(...args))
  },
  addedRecordsetAction(prop, ...args) {
    dispatch(addedRecordsetAction(prop)(...args))
  },
  updateCodePosition(prop, ...args) {
    dispatch(updateCodePosition())
  },
  updateSimpleField(prop, ...args) {
    dispatch(updateSimpleField(prop)(...args))
  },
})

const NewRecordset = connect(mapStateToProps, mapDispatchToProps)(
  NewRecordsetComponent
)

export default NewRecordset
