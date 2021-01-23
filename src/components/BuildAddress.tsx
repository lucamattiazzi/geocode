import { observer } from 'mobx-react'
import React from 'react'
import { state } from '../lib/state'

const BuildAddressComponent = () => {
  function handleBuildAddress(e: React.ChangeEvent<HTMLInputElement>) {
    state.setBuildAddress(e.target.value)
  }

  return (
    <div className="flex flex-column w-100 items-center justify-center">
      <div className="flex w-100 items-center justify-center">
        <label htmlFor="buildAddress" className="mr2">
          Create address from csv:
        </label>
        <input
          id="buildAddress"
          className="w5 mv4"
          type="text"
          onChange={handleBuildAddress}
          value={state.buildAddress}
        />
      </div>
      <div className="w-100 flex flex-wrap">
        {state.colNames.map((col) => (
          <span
            className="mh2 ph2 pv1 mv1 pointer"
            onClick={() => state.addColToAddress(col)}
            key={col}
          >
            {col}
          </span>
        ))}
      </div>
    </div>
  )
}

export const BuildAddress = observer(BuildAddressComponent)
