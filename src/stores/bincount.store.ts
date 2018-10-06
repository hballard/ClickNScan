import { observable, action } from 'mobx'

import SessionManager, {
  IBin,
  Session,
  NewProductPicker
} from '../model/bincount.model'

export default class BinCountStore {
  @observable
  sessionManager: SessionManager

  @observable
  activeSession!: Session

  @observable
  activeBin!: IBin

  constructor() {
    this.sessionManager = new SessionManager()

    // Bind methods to "this" in current context
    this.init = this.init.bind(this)
    this.createNewActiveSession = this.createNewActiveSession.bind(this)
    this.createNewActiveBin = this.createNewActiveBin.bind(this)
    this.loadNewActiveSession = this.loadNewActiveSession.bind(this)
    this.setBarcode = this.setBarcode.bind(this)
    this.setCountQty = this.setCountQty.bind(this)
    this.setAdditionalQty = this.setAdditionalQty.bind(this)
    this.setComments = this.setComments.bind(this)
    this.setNewProduct = this.setNewProduct.bind(this)
  }

  async init() {
    try {
      await this.sessionManager.deleteAllSessions() // Delete this line
      await this.sessionManager.init()
    } catch (e) {
      console.log(e) // Delete this line
    }
  }

  @action
  createNewActiveSession() {
    this.activeSession = this.sessionManager.newSession()
    this.sessionManager.saveSessionManager()
    this.sessionManager.saveSession(this.activeSession)
    this.activeBin = this.activeSession.createNewBin()
    console.log(this) // Delete this line
  }

  @action
  async loadNewActiveSession(id: number) {
    try {
      const result = await this.sessionManager.loadSession(id)
      if (result) {
        console.log(result)
        this.activeSession = result
        this.activeBin = this.activeSession.createNewBin()
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action
  createNewActiveBin() {
    this.activeSession.updateBin(this.activeBin)
    this.sessionManager.saveSession(this.activeSession)
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
  setNewProduct(text: NewProductPicker.No | NewProductPicker.Yes) {
    this.activeBin.newProduct = text
  }
}
