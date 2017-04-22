import React from 'react'
import moment from 'moment'
import Delete from 'material-ui/svg-icons/action/delete'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

const RecordsetList = ({ addedRecordset, updateAddedRecordset }) => {
  return (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Funktionen</TableHeaderColumn>
          <TableHeaderColumn>Datum</TableHeaderColumn>
          <TableHeaderColumn>Betrag</TableHeaderColumn>
          <TableHeaderColumn>Beschreibung</TableHeaderColumn>
          <TableHeaderColumn>Zuordnung</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {addedRecordset.map((e, i) => {
          return (
            <TableRow key={i}>
              <TableRowColumn>
                <div title="Zeile löschen">
                  <Delete
                    onClick={() => {
                      updateAddedRecordset('remove', i)
                    }}
                  />
                </div>
              </TableRowColumn>
              <TableRowColumn>{moment(e.date).format('L')}</TableRowColumn>
              <TableRowColumn>{e.amount}</TableRowColumn>
              <TableRowColumn>{e.description}</TableRowColumn>
              <TableRowColumn>{e.attribution}</TableRowColumn>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default RecordsetList

// amount: -5,
// attribution: '',
// date: moment().toDate(),
// description: 'Miete Januar 2017',
// isIncome: true,
