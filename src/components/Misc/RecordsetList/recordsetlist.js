import React from 'react'
import Edit from 'material-ui/svg-icons/editor/border-color'
import { currency, bind, parseCode, abs } from '../../../util'
import { adjustRecordset } from '../../../util/recordset.util'
import sum from 'lodash/sum'
import get from 'lodash/get'
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
  const { recordsetAction, updateNewRecordset, updateCode } = props
  const _recordset = adjustRecordset(props)

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
                  <div title="Zeile anpassen">
                    <Edit
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        recordsetAction('edit', i)
                        updateNewRecordset('set', abs(e))
                        updateCode(parseCode(e.code))
                      }}
                    />
                  </div>
                </TableRowColumn>
                {recordsetColumns.map(({ displayName, prop, display }, i) => (
                  <TableRowColumn key={i}>
                    {display(get(e, prop))}
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
