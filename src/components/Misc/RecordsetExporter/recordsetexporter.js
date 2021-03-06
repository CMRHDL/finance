import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { adjustRecordset, buildCsv } from '../../../util/recordset.util'
import downloadjs from 'downloadjs'

const center = {
  display: 'flex',
  justifyContent: 'center',
}

const RecordsetExporter = props => {
  const { simpleFields, updateSimpleField } = props
  const _recordset = adjustRecordset(props)

  return (
    <div style={center}>
      <TextField
        floatingLabelText="Name der Exportdatei"
        value={simpleFields.recordsetExportFilename}
        onChange={({ target: { value } }) => {
          updateSimpleField('recordsetExportFilename', value)
        }}
      />
      <FlatButton
        label="Exportieren"
        primary={true}
        onTouchTap={() => {
          downloadjs(
            new Blob([buildCsv(_recordset)]),
            simpleFields.recordsetExportFilename + '.csv',
            'text/csv'
          )
        }}
      />
    </div>
  )
}

export default RecordsetExporter
