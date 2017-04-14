import CodeSelectorComponent from './codeselector'

import { updateCode } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  code: state.code,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCode: (code) => {
    dispatch(updateCode(code));
  },
})

const CodeSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeSelectorComponent)

export default CodeSelector
