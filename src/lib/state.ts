import { makeAutoObservable, reaction } from 'mobx'
import papaparse from 'papaparse'
import fileDownload from 'js-file-download'
import {
  addCoordsToData,
  APIS,
  ApiService,
  extractAddresses,
  getColumns,
  Handler,
  Row,
} from './lib'

const EXAMPLE_SIZE = 20
const PERSISTED_ATTRIBUTES = ['token' as const, 'apiService' as const]

function loadAttributes(obs: State, attributes: string[]) {
  for (const key of attributes) {
    const rawValue = localStorage.getItem(key)
    if (!rawValue) continue
    const { value } = JSON.parse(rawValue)
    obs[key] = value
  }
}

function persistAttributes(obs: State, attributes: string[]) {
  for (const key of attributes) {
    reaction(
      () => obs[key],
      (value) => localStorage.setItem(key, JSON.stringify({ value }))
    )
  }
}

class State {
  token: string = ''
  apiService: ApiService = 'mapbox'
  filename: string = ''
  buildAddress: string = ''
  data: Row[] = []
  loading: boolean = false
  completion: number = 0

  constructor() {
    loadAttributes(this, PERSISTED_ATTRIBUTES)
    makeAutoObservable(this)
    persistAttributes(this, PERSISTED_ATTRIBUTES)
  }

  // GETTERS

  get colNames(): string[] {
    return getColumns(this.data)
  }

  get geocodeHandler(): Handler {
    return APIS[this.apiService]
  }

  get exampleData(): Row[] {
    return this.data.slice(0, EXAMPLE_SIZE)
  }

  get geocodedFilename(): string {
    return this.filename.replace('.csv', '.geocoded.csv')
  }

  get completionPerc(): string {
    return (this.completion * 100).toFixed(2)
  }

  // FUNCTIONS

  geocode = async () => {
    this.setLoading(true)
    const addresses = extractAddresses(this.data, this.buildAddress)
    const coords = await state.geocodeHandler(state.token, addresses, this.setCompletion)
    this.setLoading(false)
    const updated = addCoordsToData(this.data, coords)
    const newCsv = papaparse.unparse(updated)
    console.log('newCsv', newCsv)
    fileDownload(newCsv, this.geocodedFilename)
  }

  // ACTIONS

  setToken = (token: string) => {
    this.token = token
  }

  setFilename = (filename: string) => {
    this.filename = filename
  }

  setLoading = (loading: boolean) => {
    this.loading = loading
  }

  setData = (data: Row[]) => {
    this.data = data
  }

  setApiService = (apiService: ApiService) => {
    this.apiService = apiService
  }

  setBuildAddress = (buildAddress: string) => {
    this.buildAddress = buildAddress
  }

  addColToAddress = (col: string) => {
    this.setBuildAddress(`${this.buildAddress}{${col}} `)
  }

  setCompletion = (completion: number) => {
    this.completion = completion
  }
}

export const state = new State()
