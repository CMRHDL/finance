import InputComponent from './input'

import {
  addedRecordsetAction,
  recordsetAction,
  updateSimpleField,
} from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  addedRecordset: state.addedRecordset,
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  addedRecordsetAction(prop, ...args) {
    dispatch(addedRecordsetAction(prop)(...args))
  },
  recordsetAction(prop, ...args) {
    dispatch(recordsetAction(prop)(...args))
  },
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
})

const Input = connect(mapStateToProps, mapDispatchToProps)(InputComponent)

export default Input
