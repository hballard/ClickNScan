import BinCountStore from './bincount.store'

const binCount = new BinCountStore()

export interface IStore {
  binCount: BinCountStore
}

export default {
  binCount
}
