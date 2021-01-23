import { observer } from 'mobx-react'
import React from 'react'
import { state } from '../lib/state'

const GeocodeComponent = () => {
  return (
    <div className="flex w-100 items-center justify-center">
      <button className="w5 mv4" onClick={state.geocode}>
        Geocode!
      </button>
    </div>
  )
}

export const Geocode = observer(GeocodeComponent)
