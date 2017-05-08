import DetailsComponent from './details'

import '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  recordset: state.recordset,
  simpleFields: state.simpleFields,
  recordsetFilter: state.recordsetFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsComponent)

export default Details
