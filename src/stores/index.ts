import BinCountStore from './bincount.store'

const binCount = new BinCountStore()
// Retrieve persisted state from AsyncStorage
binCount.init()

export interface IStores {
  binCount: BinCountStore
}

export default {
  binCount
}
