import AttributionComponent from './attribution'

import {
  updateSettingsAttributionInput,
  addSettingsAttributionIncome,
  addSettingsAttributionExpense,
} from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  attributionInput: state.settings.attributionInput,
  attributionIncome: state.settings.attributionIncome,
  attributionExpense: state.settings.attributionExpense,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSettingsAttributionInput({ target: { value } }) {
    dispatch(updateSettingsAttributionInput(value))
  },
  addSettingsAttributionIncome(value) {
    dispatch(updateSettingsAttributionInput(''))
    dispatch(addSettingsAttributionIncome(value))
  },
  addSettingsAttributionExpense(value) {
    dispatch(updateSettingsAttributionInput(''))
    dispatch(addSettingsAttributionExpense(value))
  },
})

const Attribution = connect(mapStateToProps, mapDispatchToProps)(AttributionComponent)

export default Attribution
