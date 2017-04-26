import React from 'react'
import Delete from 'material-ui/svg-icons/action/delete'
import { shortDate, currency } from '../../../util'
import { lightGreen100, orange100 } from 'material-ui/styles/colors'
import sum from 'lodash/sum'

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

const style = {
  small: {
    width: 50,
  },
}

const RecordsetList = ({ recordset, recordsetAction, recordsetFilter }) => {
  let _recordset = [...recordset]
  if (recordsetFilter) {
    recordsetFilter.forEach(function(entry) {
      _recordset = _recordset.filter(entry.func)
    })
  }
  return (
    <div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={style.small}>
              Funktionen
            </TableHeaderColumn>
            <TableHeaderColumn>Code</TableHeaderColumn>
            <TableHeaderColumn>Datum</TableHeaderColumn>
            <TableHeaderColumn>Betrag</TableHeaderColumn>
            <TableHeaderColumn>Beschreibung</TableHeaderColumn>
            <TableHeaderColumn>Zuordnung</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {_recordset.map((e, i) => {
            return (
              <TableRow
                key={i}
                style={{
                  backgroundColor: e.attribution.isIncome
                    ? lightGreen100
                    : orange100,
                }}
              >
                <TableRowColumn style={style.small}>
                  <div title="Zeile löschen">
                    <Delete
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        recordsetAction('remove', i)
                      }}
                    />
                  </div>
                </TableRowColumn>
                <TableRowColumn>{e.code}</TableRowColumn>
                <TableRowColumn>{shortDate(e.date)}</TableRowColumn>
                <TableRowColumn>{currency(e.amount)}</TableRowColumn>
                <TableRowColumn>{e.description}</TableRowColumn>
                <TableRowColumn>{e.attribution.attribution}</TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={style.small} />
            <TableHeaderColumn />
            <TableHeaderColumn />
            <TableHeaderColumn>
              {currency(sum(_recordset.map(e => e.amount)))}
            </TableHeaderColumn>
            <TableHeaderColumn />
            <TableHeaderColumn />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

RecordsetList.propTypes = {
  recordset: React.PropTypes.array.isRequired,
  recordsetAction: React.PropTypes.func.isRequired,
}

export default RecordsetList
