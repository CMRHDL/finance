import RecordsetListComponent from './recordsetlist'

import { updateAddedRecordset } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  addedRecordset: state.addedRecordset,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateAddedRecordset(prop, ...args) {
    dispatch(updateAddedRecordset(prop)(...args))
  },
})

const RecordsetList = connect(mapStateToProps, mapDispatchToProps)(RecordsetListComponent)

export default RecordsetList
