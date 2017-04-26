import RecordsetFilterComponent from './recordsetfilter'

import { updateSimpleField, recordsetFilterAction } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
  recordsetFilterAction(field, ...args) {
    dispatch(recordsetFilterAction(field)(...args))
  },
})

const RecordsetFilter = connect(mapStateToProps, mapDispatchToProps)(RecordsetFilterComponent)

export default RecordsetFilter
