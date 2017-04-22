import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { bind } from '../../../util'

const SnackbarComponent = ({ message, updateMessage }) => {
  return (
    <Snackbar open={!!message} message={message} autoHideDuration={4000} onRequestClose={bind(updateMessage, '')} />
  )
}

export default SnackbarComponent
