import RecordsetListComponent from './recordsetlist'

import {
  updateSimpleField,
  updateNewRecordset,
  updateCode,
} from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
  updateSimpleField(prop, ...args) {
    dispatch(updateSimpleField(prop)(...args))
  },
  updateRemoveRowFeedback: value => {
    dispatch(updateSimpleField('removeRowFeedback')(value))
  },
  updateNewRecordset(prop, ...args) {
    dispatch(updateNewRecordset(prop)(...args))
  },
  updateCode(...args) {
    dispatch(updateCode(...args))
  },
})

const RecordsetList = connect(mapStateToProps, mapDispatchToProps)(
  RecordsetListComponent
)

export default RecordsetList
