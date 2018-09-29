import { observable, action } from 'mobx'

import SessionManager, {
  Bin,
  Session,
  SessionIndex,
  NewProductPicker
} from '../model/bincount.model'

export default class BinCountStore {
  sessionManager: SessionManager

  @observable
  sessionList: SessionIndex[]

  @observable
  activeSession: Session

  @observable
  activeBin: Bin

  constructor() {
    this.sessionManager = new SessionManager()
    this.sessionList = this.sessionManager.sessions

    this.activeSession = this.sessionManager.newSession()
    this.activeBin = this.activeSession.createNewBin()

    // Bind methods to "this"
    this.createNewActiveBin = this.createNewActiveBin.bind(this)
    this.setBarcode = this.setBarcode.bind(this)
    this.setCountQty = this.setCountQty.bind(this)
    this.setAdditionalQty = this.setAdditionalQty.bind(this)
    this.setComments = this.setComments.bind(this)
    this.setNewProduct = this.setNewProduct.bind(this)
  }

  createNewActiveBin() {
    this.activeBin = this.activeSession.createNewBin()
  }

  @action
  setBarcode(text: string) {
    this.activeBin.barcode = text
  }

  @action
  setCountQty(text: string) {
    this.activeBin.countQty = text
  }

  @action
  setAdditionalQty(text: string) {
    this.activeBin.additionalQty = text
  }

  @action
  setComments(text: string) {
    this.activeBin.comments = text
  }

  @action
  setNewProduct(text: NewProductPicker) {
    this.activeBin.newProduct = text
  }
}
