import { observer } from 'mobx-react'
import React from 'react'
import { extractAddresses } from '../lib/lib'
import { state } from '../lib/state'

const GeocodeComponent = () => {
  function geocode() {
    const rows = state.data.slice(0, 10)
    const addresses = extractAddresses(rows, state.buildAddress)
    state.geocodeHandler(state.token, addresses).then(console.log)
  }

  return (
    <div className="flex w-100 items-center justify-center">
      <button className="w5 mv4" onClick={geocode}>
        Geocode!
      </button>
    </div>
  )
}

export const Geocode = observer(GeocodeComponent)
