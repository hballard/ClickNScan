import BinCountStore from './bincount.store'

const binCount = new BinCountStore()
binCount.init()

export interface IStores {
  binCount: BinCountStore
}

export default {
  binCount
}
