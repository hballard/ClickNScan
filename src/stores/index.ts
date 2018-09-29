import BinCountStore from './bincount.store'

const binCount = new BinCountStore()

export interface IStores {
  binCount: BinCountStore
}

export default {
  binCount
}
