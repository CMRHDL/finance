import SimpleBarComponent from './simplebar'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
})

const SimpleBar = connect(mapStateToProps, mapDispatchToProps)(
  SimpleBarComponent
)

export default SimpleBar
