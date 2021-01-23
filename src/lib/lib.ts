import papaparse from 'papaparse'

export type Row = Record<string, string | number>
export type Geocoded = { lat: number; lng: number }

export const APIS = {
  google: geocodeViaGoogle,
  mapbox: geocodeViaMapbox,
  mapboxPermanent: geocodeViaMapboxPermanent,
} as const

export type Handler = (token: string, addresses: string[]) => Promise<Geocoded[]>

export type ApiService = keyof typeof APIS

export function getColumns(data: Row[]): string[] {
  if (data.length === 0) return []
  return Object.keys(data[0])
}

export function asyncParse(file: File): Promise<Row[]> {
  return new Promise((resolve, reject) => {
    const rows = [] as Row[]
    papaparse.parse(file, {
      skipEmptyLines: true,
      worker: true,
      header: true,
      step: (res) => rows.push((res.data as unknown) as Row),
      complete: (end) => resolve(rows),
    })
  })
}

export function extractAddresses(rows: Row[], addressBuilder: string): string[] {
  const addresses = rows.map((r) => {
    const address = Object.entries(r).reduce<string>((acc, [k, v]) => {
      const replaced = acc.replace(`{${k}}`, String(v))
      return replaced
    }, addressBuilder)
    return address
  })
  return addresses
}

function geocodeViaGoogle(token: string, addresses: string[]): Promise<Geocoded[]> {
  return Promise.resolve([])
}

function parseMapboxResult(result: any): Geocoded {
  const feature = result.features[0]
  const [lng, lat] = feature.center as [number, number]
  return { lng, lat }
}

function geocodeViaMapbox(token: string, addresses: string[]): Promise<Geocoded[]> {
  const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const resultPromises = addresses.map((address) => {
    const parsedAddress = encodeURIComponent(address)
    const url = `${MAPBOX_URL}${parsedAddress}.json?access_token=${token}`
    return fetch(url)
      .then((r) => r.json())
      .then(parseMapboxResult)
      .catch((e) => {
        console.error(e)
        return { lng: null, lat: null }
      })
  })
  return Promise.all(resultPromises)
}

function geocodeViaMapboxPermanent(token: string, addresses: string[]): Promise<Geocoded[]> {
  const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/'
  const addressString = addresses.map((a) => encodeURIComponent(a)).join(';')
  const url = `${MAPBOX_URL}${addressString}.json?access_token=${token}`
  return fetch(url)
    .then((r) => r.json())
    .then((r) => r.map(parseMapboxResult))
    .catch((e) => {
      console.error(e)
      return { lng: null, lat: null }
    })
}

export function addCoordsToData(rows: Row[], coords: Geocoded[]): Promise<void> {
  const mixed = rows.map((row, idx) => Object.assign(row, coords[idx]))
}
