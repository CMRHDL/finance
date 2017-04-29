import React from 'react'
import Delete from 'material-ui/svg-icons/action/delete'
import { shortDate, currency, bind } from '../../../util'
import { adjustRecordset } from '../../../util/recordset.util'
import sum from 'lodash/sum'
import { recordsetColumns } from '../../../models'
import { setOrder, getColor, getOrderInfo } from './util'

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

const RecordsetList = props => {
  const {
    recordset,
    recordsetAction,
    recordsetFilter,
    simpleFields,
    updateSimpleField,
  } = props
  const { recordsetOrderColumn, recordsetOrderOrder } = simpleFields
  const _recordset = adjustRecordset({
    recordset,
    recordsetFilter,
    recordsetOrderColumn,
    recordsetOrderOrder,
  })

  return (
    <div>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={style.small}>
              Funktionen
            </TableHeaderColumn>
            {recordsetColumns.map(({ displayName, prop }, i) => (
              <TableHeaderColumn key={i}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={bind(setOrder, prop, props)}
                >
                  {displayName}
                  {' '}
                  {getOrderInfo(prop, props)}
                </div>
              </TableHeaderColumn>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          {_recordset.map((e, i) => {
            return (
              <TableRow
                key={i}
                style={{
                  backgroundColor: getColor(e),
                }}
              >
                <TableRowColumn style={style.small}>
                  <div title="Zeile löschen">
                    <Delete
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        recordsetAction('remove', i)
                      }}
                    />
                  </div>
                </TableRowColumn>
                {recordsetColumns.map(({ displayName, prop, func }, i) => (
                  <TableRowColumn key={i}>
                    {func(e[prop])}
                  </TableRowColumn>
                ))}

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
