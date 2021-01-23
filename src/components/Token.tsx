import { observer } from 'mobx-react'
import React from 'react'
import { APIS, ApiService } from '../lib/lib'
import { state } from '../lib/state'

const TokenComponent = () => {
  function handleChangeToken(e: React.ChangeEvent<HTMLInputElement>) {
    state.setToken(e.target.value)
  }

  function handleChangeApi(e: React.ChangeEvent<HTMLSelectElement>) {
    state.setApiService(e.target.value as ApiService)
  }

  const SERVICES = Object.keys(APIS)

  return (
    <div className="flex w-100 items-center justify-center">
      <div className="flex w-100 items-center justify-center">
        <label htmlFor="token" className="mr2">
          Token API:
        </label>
        <input id="token" type="text" value={state.token} onChange={handleChangeToken} />
      </div>
      <div className="flex w-100 items-center justify-center">
        <label htmlFor="token" className="mr2">
          Token API:
        </label>
        <select id="service" value={state.apiService} onChange={handleChangeApi}>
          {SERVICES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export const Token = observer(TokenComponent)
