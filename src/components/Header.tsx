import React from 'react'

export function Header() {
  return (
    <div className="w-100 flex items-center flex-column pb4">
      <h1>Geocode DIY</h1>
      <div className="flex">
        <div className="flex flex-column w-50 pr3">
          <h3>What</h3>
          <div className="pb2">Geocode DIY is a website that geocodes your csv for you.</div>
          <div className="pb2">
            It's BYOT (Bring Your Own Token): generate a token for mapbox/google and use it to
            geocode your data.
          </div>
          <div>
            Even if I will save your token on your browser, no data will be sent to any server of
            mine, or any server at all (with the obvious exception of the mapbox/google one).
          </div>
        </div>
        <div className="flex flex-column w-50 ph3">
          <h3>How</h3>
          <div className="pb2">
            Upload your csv to this page. You will be able to se a sample of the rows.
          </div>
          <div className="pb2">
            Use columns and any other word you need to extract the address from each row. For
            example the code: <i>{'Foggia, {address} {street_number}'}</i> will extract for each row
            the address using <i>Foggia</i> for every row, then their values at columns{' '}
            <i>address</i> and <i>street_number</i>. You can click on a column to add it to your
            string.
          </div>
          <div>
            Insert then the token you generated for the service you want to use and simply click
            'Geocode'.
          </div>
        </div>
        <div className="flex flex-column w-50 pl3">
          <h3>Who</h3>
          <div className="pb2">
            <a
              href="https://github.com/lucamattiazzi"
              className="no-underline black"
              target="_blank"
              rel="noopener noreferrer"
            >
              I
            </a>{' '}
            did this.
          </div>
        </div>
      </div>
    </div>
  )
}
