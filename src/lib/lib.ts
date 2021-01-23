import { chunk, noop } from 'lodash-es'
import papaparse from 'papaparse'

export type Row = Record<string, string | number>
export type Geocoded = { lat: number; lng: number }

export type Handler = (
  token: string,
  addresses: string[],
  cb: (val: number) => void
) => Promise<Geocoded[]>

export const APIS: Record<string, Handler> = {
  google: geocodeViaGoogle,
  mapbox: geocodeViaMapbox,
  mapboxPermanent: geocodeViaMapboxPermanent,
} as const

export type ApiService = keyof typeof APIS

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

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

function geocodeViaGoogle(
  token: string,
  addresses: string[],
  cb: (val: number) => void = noop
): Promise<Geocoded[]> {
  return Promise.resolve([])
}

function parseMapboxResult(result: any): Geocoded {
  const feature = result.features[0]
  const [lng, lat] = feature.center as [number, number]
  return { lng, lat }
}

async function geocodeViaMapbox(
  token: string,
  addresses: string[],
  cb: (val: number) => void = noop
): Promise<Geocoded[]> {
  const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
  const chunkedAddresses = chunk(addresses, 6)
  const results: Geocoded[] = []
  const total = addresses.length || 1
  for (const chunk of chunkedAddresses) {
    const resultPromises = chunk.map((address) => {
      const parsedAddress = encodeURIComponent(address)
      const url = `${MAPBOX_URL}${parsedAddress}.json?access_token=${token}`
      return fetch(url)
        .then((r) => r.json())
        .then(parseMapboxResult)
        .catch((e) => {
          console.error(e)
          return {
            lng: null,
            lat: null,
          } as Geocoded
        })
    })
    const chunkResults = await Promise.all(resultPromises)
    results.push(...chunkResults)
    cb(results.length / total)
    await sleep(100)
  }
  return results
}

function geocodeViaMapboxPermanent(
  token: string,
  addresses: string[],
  cb: (val: number) => void = noop
): Promise<Geocoded[]> {
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

export function addCoordsToData(rows: Row[], coords: Geocoded[]): Row[] {
  return rows.map((row, idx) => Object.assign(row, coords[idx]))
}
