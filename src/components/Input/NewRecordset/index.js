import NewRecordsetComponent from './newrecordset'

import {
  updateNewRecordset,
  addedRecordsetAction,
  updateSimpleField,
  updateCodePosition,
} from '../../../actions'
import { connect } from 'react-redux'
import curryN from 'ramda/src/curryN'

const mapStateToProps = (state, ownProps) => ({
  attributions: state.settings.attributions,
  newRecordset: state.newRecordset,
  addedRecordset: state.addedRecordset,
  code: state.code,
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNewRecordset: curryN(2, (prop, ...args) => {
    dispatch(updateNewRecordset(prop)(...args))
  }),
  addedRecordsetAction(prop, ...args) {
    dispatch(addedRecordsetAction(prop)(...args))
  },
  updateCodePosition(...args) {
    dispatch(updateCodePosition(...args))
  },
  updateSimpleField(prop, ...args) {
    dispatch(updateSimpleField(prop)(...args))
  },
})

const NewRecordset = connect(mapStateToProps, mapDispatchToProps)(
  NewRecordsetComponent
)

export default NewRecordset
