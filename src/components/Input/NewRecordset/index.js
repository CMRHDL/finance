import NewRecordsetComponent from './newrecordset'

import { updateNewRecordset, updateAddedRecordset, updateCodePosition } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  attributionExpense: state.settings.attributionExpense,
  attributionIncome: state.settings.attributionIncome,
  newRecordset: state.newRecordset,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateNewRecordset(prop, ...args) {
    dispatch(updateNewRecordset(prop)(...args))
  },
  updateAddedRecordset(prop, ...args) {
    dispatch(updateAddedRecordset(prop)(...args))
  },
  updateCodePosition(prop, ...args) {
    dispatch(updateCodePosition())
  },
})

const NewRecordset = connect(mapStateToProps, mapDispatchToProps)(NewRecordsetComponent)

export default NewRecordset
