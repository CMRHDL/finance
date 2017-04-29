import CodeSelectorComponent from './codeselector'

import { updateCode, updateSimpleField } from '../../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({
  code: state.code,
  simpleFields: state.simpleFields,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCode: code => {
    dispatch(updateCode(code))
  },
  updateSimpleField(field, value) {
    dispatch(updateSimpleField(field)(value))
  },
})

const CodeSelector = connect(mapStateToProps, mapDispatchToProps)(
  CodeSelectorComponent
)

export default CodeSelector
