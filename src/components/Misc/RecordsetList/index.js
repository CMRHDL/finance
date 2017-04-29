import RecordsetListComponent from './recordsetlist'

import { updateSimpleField } from '../../../actions'
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
})

const RecordsetList = connect(mapStateToProps, mapDispatchToProps)(
  RecordsetListComponent
)

export default RecordsetList
