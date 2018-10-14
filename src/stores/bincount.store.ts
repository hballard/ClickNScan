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
    this.saveActiveBin = this.saveActiveBin.bind(this)
    this.deleteActiveBin = this.deleteActiveBin.bind(this)
    this.createNewActiveSession = this.createNewActiveSession.bind(this)
    this.createNewActiveBin = this.createNewActiveBin.bind(this)
    this.loadNewActiveSession = this.loadNewActiveSession.bind(this)
    this.renameSession = this.renameSession.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
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
      console.log(e)
    }
  }

  @action
  createNewActiveSession() {
    this.activeSession = this.sessionManager.newSession()
    this.sessionManager.saveSession(this.activeSession)
    this.activeBin = this.activeSession.createNewBin()
    console.log(this) // Delete this line
  }

  @action
  async loadNewActiveSession(id: number) {
    try {
      const result = await this.sessionManager.loadSession(id)
      if (result) {
        console.log(result) // Delete this line
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
  loadNewActiveBin(id: number) {
    const bin = this.activeSession.getBin(id)
    this.activeBin = bin
  }

  @action
  saveActiveBin() {
    this.activeSession.updateBin(this.activeBin)
    this.sessionManager.saveSession(this.activeSession)
  }

  @action
  deleteActiveBin() {
    this.activeSession.deleteBin(this.activeBin.id)
    this.sessionManager.saveSession(this.activeSession)
  }

  @action
  async renameSession(id: number, name: string) {
    const session = await this.sessionManager.loadSession(id)
    if (session) {
      session.name = name
      this.sessionManager.saveSession(session)
    }
  }

  @action
  async deleteSession(id: number) {
    await this.sessionManager.deleteSession(id)
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
