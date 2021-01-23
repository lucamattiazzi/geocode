import React from 'react'
import { Header } from './Header'
import { UploadCsv } from './UploadCsv'
import { BuildAddress } from './BuildAddress'
import { Geocode } from './Geocode'
import { Token } from './Token'
import { Table } from './Table'
import { observer } from 'mobx-react'
import { state } from '../lib/state'
import { Loading } from './Loading'

const AppComponent = () => {
  return (
    <>
      {state.loading && <Loading />}
      <div className="flex flex-column items-center justify-start ph5">
        <Header />
        <div className="flex flex-column w-100 items-center">
          <UploadCsv />
          <BuildAddress />
          <Token />
          <Geocode />
        </div>
        <Table />
      </div>
    </>
  )
}

export const App = observer(AppComponent)
