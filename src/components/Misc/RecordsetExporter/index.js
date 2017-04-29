import RecordsetExporterComponent from './recordsetexporter'

import { updateSimpleField } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  recordset: state.recordset,
  recordsetFilter: state.recordsetFilter,
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
})

const RecordsetExporter = connect(mapStateToProps, mapDispatchToProps)(
  RecordsetExporterComponent
)

export default RecordsetExporter
