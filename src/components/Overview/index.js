import OverviewComponent from './overview'

import {
  recordsetAction,
  updateSimpleField,
  updateNewRecordset,
  updateCode,
} from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  recordset: state.recordset,
  recordsetFilter: state.recordsetFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  updateSimpleField(prop, ...args) {
    dispatch(updateSimpleField(prop)(...args))
  },
  updateNewRecordset(prop, ...args) {
    dispatch(updateNewRecordset(prop)(...args))
  },
  updateCode(...args) {
    dispatch(updateCode(...args))
  },
  recordsetAction(prop, ...args) {
    dispatch(recordsetAction(prop)(...args))
  },
  deleteAction(prop, ...args) {
    dispatch(recordsetAction(prop)(...args))
  },
})

const Overview = connect(mapStateToProps, mapDispatchToProps)(OverviewComponent)

export default Overview
