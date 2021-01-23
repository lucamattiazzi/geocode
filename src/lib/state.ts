import { makeAutoObservable } from 'mobx'
import {
  addCoordsToData,
  APIS,
  ApiService,
  extractAddresses,
  getColumns,
  Handler,
  Row,
} from './lib'

const TABLE_SIZE = 20

class State {
  token: string = ''
  apiService: ApiService = 'mapbox'
  buildAddress: string = ''
  data: Row[] = []
  loading: boolean = true

  constructor() {
    makeAutoObservable(this)
  }

  // GETTERS

  get colNames(): string[] {
    return getColumns(this.data)
  }

  get geocodeHandler(): Handler {
    return APIS[this.apiService]
  }

  get tableData(): Row[] {
    return this.data.slice(0, TABLE_SIZE)
  }

  // FUNCTIONS

  geocode = async () => {
    this.setLoading(true)
    const addresses = extractAddresses(this.data.slice(10), this.buildAddress)
    const coords = await state.geocodeHandler(state.token, addresses)
    addCoordsToData(this.data.slice(10), coords)
  }

  // ACTIONS

  setToken = (token: string) => {
    this.token = token
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
}

export const state = new State()
