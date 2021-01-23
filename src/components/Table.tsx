import { observer } from 'mobx-react'
import React from 'react'
import { buildAddress, Row } from '../lib/lib'
import { state } from '../lib/state'

const RowComponent = observer((p: { row: Row; colNames: string[]; idx: number }) => {
  const colorClass = p.idx % 2 === 0 ? 'bg-lightest-blue' : 'bg-light-blue'
  const rowValues = p.colNames.map((c) => p.row[c])
  const values = [buildAddress(p.row, state.buildAddress), ...rowValues]
  return (
    <tr className={colorClass}>
      {values.map((c) => (
        <td className="ba w05 pa1">{c}</td>
      ))}
    </tr>
  )
})

const TableComponent = () => {
  if (state.data.length === 0) return null
  const columns = ['Computed Address', ...state.colNames]
  return (
    <div className="w-100 overflow-x-auto pb4">
      <table className="collapse">
        <thead>
          <tr>
            {columns.map((colName) => (
              <th
                className="pointer black ba bw05 pa2 bg-blue"
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
            <RowComponent key={idx} row={row} colNames={state.colNames} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Table = observer(TableComponent)
