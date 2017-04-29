import DetailsComponent from './details'

import '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  recordset: state.recordset,
})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const Details = connect(mapStateToProps, mapDispatchToProps)(DetailsComponent)

export default Details
