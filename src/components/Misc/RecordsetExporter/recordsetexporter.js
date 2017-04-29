import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { adjustRecordset, buildCsv } from '../../../util/recordset.util'
import downloadjs from 'downloadjs'

const RecordsetExporter = ({
  recordset,
  recordsetFilter,
  simpleFields,
  updateSimpleField,
}) => {
  const { recordsetOrderColumn, recordsetOrderOrder } = simpleFields
  const _recordset = adjustRecordset({
    recordset,
    recordsetFilter,
    recordsetOrderColumn,
    recordsetOrderOrder,
  })

  return (
    <div>
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
          console.log(buildCsv(_recordset))
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
