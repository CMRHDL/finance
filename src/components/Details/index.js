import DetailsComponent from './details'

import { } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
})

const Details = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsComponent)

export default Details