import React from 'react'
import { asyncParse } from '../lib/lib'
import { state } from '../lib/state'

export function UploadCsv() {
  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files[0]
    if (!file) return
    asyncParse(file).then(state.setData)
  }

  return (
    <div className="flex w-100 items-center justify-center">
      <label htmlFor="upload" className="mr2">
        Upload CSV file:
      </label>
      <input id="upload" className="w5 mv4" type="file" onChange={handleUpload} />
    </div>
  )
}
