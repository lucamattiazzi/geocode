import { observer } from 'mobx-react'
import React from 'react'
import { Row } from '../lib/lib'
import { state } from '../lib/state'

function RowComponent(p: { row: Row; colNames: string[] }) {
  return (
    <tr>
      {p.colNames.map((c) => (
        <td>{p.row[c]}</td>
      ))}
    </tr>
  )
}

const TableComponent = () => {
  return (
    <div className="w-100 overflow-x-auto">
      <table className="">
        <thead>
          <tr>
            {state.colNames.map((colName) => (
              <th
                className="pointer black b bb-3"
                onClick={() => state.addColToAddress(colName)}
                key={colName}
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.exampleData.map((row, idx) => (
            <RowComponent key={idx} row={row} colNames={state.colNames} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Table = observer(TableComponent)
