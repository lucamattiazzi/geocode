import { observer } from 'mobx-react'
import React from 'react'
import { state } from '../lib/state'

const LoadingComponent = () => {
  return (
    <div
      className="w-100 h-100 flex justify-center items-center absolute f2"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      Please wait, I'm working for you.
      <br />
      <br />
      Currently at {state.completionPerc}%
      <br />
      <br />
      Moron.
    </div>
  )
}

export const Loading = observer(LoadingComponent)
