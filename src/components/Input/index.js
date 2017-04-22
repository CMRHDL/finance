import InputComponent from './input'

import '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

const Input = connect(mapStateToProps, mapDispatchToProps)(InputComponent)

export default Input
