import SimpleLineComponent from './simpleline'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  ...ownProps,
})

const SimpleLine = connect(mapStateToProps, mapDispatchToProps)(
  SimpleLineComponent
)

export default SimpleLine
