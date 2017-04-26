import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Save from 'material-ui/svg-icons/content/save'
import axios from 'axios'

import { bind } from '../../util'
import { attributionId } from '../../util/recordset.util'

import CodeSelector from './CodeSelector'
import NewRecordset from './NewRecordset'
import RecordsetList from '../Misc/RecordsetList'
import Snackbar from '../Misc/Snackbar'
import Attribution from '../Settings/Attribution'

const Input = ({
  addedRecordset,
  addedRecordsetAction,
  recordsetAction,
  simpleFields,
  updateSimpleField,
}) => {
  return (
    <div style={{ padding: 25 }}>
      <CodeSelector />
      <NewRecordset />
      <RecordsetList
        recordset={addedRecordset}
        recordsetAction={addedRecordsetAction}
      />
      {!!addedRecordset.length &&
        <RaisedButton
          label="Hinzugefügte Datensätze speichern"
          labelPosition="before"
          containerElement="label"
          icon={<Save />}
          onTouchTap={() => {
            axios
              .all(
                addedRecordset
                  .map(attributionId)
                  .map(bind(axios.post, '/api/recordset'))
              )
              .then(e => {
                recordsetAction('add', addedRecordset)
                addedRecordsetAction('reset')
                updateSimpleField(
                  'addedNewRecordsetSuccess',
                  'Datensätze erfolgreich hinzugefügt'
                )
              })
              .catch(console.log)
          }}
        />}
      <Snackbar
        bodyStyle={{ background: 'green' }}
        message={simpleFields.addedNewRecordsetSuccess}
        updateMessage={bind(updateSimpleField, 'addedNewRecordsetSuccess', '')}
      />
      <Dialog
        title="Zuordnungen"
        actions={
          <FlatButton
            label="Schließen"
            primary={true}
            onTouchTap={bind(updateSimpleField, 'openAttributionDialog', '')}
          />
        }
        modal={true}
        autoScrollBodyContent={true}
        open={!!simpleFields.openAttributionDialog}
      >
        <Attribution />
      </Dialog>
    </div>
  )
}

// axios.delete('/api/recordset');

export default Input
