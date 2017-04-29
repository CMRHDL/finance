import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import { bind } from '../../../util'

const SnackbarComponent = ({
  message,
  updateMessage,
  contentStyle,
  bodyStyle,
}) => {
  return (
    <Snackbar
      contentStyle={{ textAlign: 'center' }}
      bodyStyle={bodyStyle}
      open={!!message}
      message={message}
      autoHideDuration={5000000}
      onRequestClose={bind(updateMessage, '')}
    />
  )
}

export default SnackbarComponent
