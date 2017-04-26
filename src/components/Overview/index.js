import OverviewComponent from './overview'

import { recordsetAction } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  recordset: state.recordset,
  recordsetFilter: state.recordsetFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  recordsetAction(prop, ...args) {
    dispatch(recordsetAction(prop)(...args))
  },
})

const Overview = connect(mapStateToProps, mapDispatchToProps)(OverviewComponent)

export default Overview
