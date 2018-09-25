import BinCountStore from './bincount.store'

const binCount = new BinCountStore()

export interface Store {
  binCount: BinCountStore
}

export default {
  binCount
}
