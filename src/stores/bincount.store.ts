import { observable, action } from 'mobx'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import Mailer from 'react-native-mail'

import SessionManager, {
  IBin,
  Session,
  NewProductPicker
} from '../models/bincount.model'

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
    this.createNewActiveBin = this.createNewActiveBin.bind(this)
    this.createNewActiveSession = this.createNewActiveSession.bind(this)
    this.deleteActiveBin = this.deleteActiveBin.bind(this)
    this.deleteSession = this.deleteSession.bind(this)
    this.emailActiveSession = this.emailActiveSession.bind(this)
    this.loadNewActiveSession = this.loadNewActiveSession.bind(this)
    this.renameSession = this.renameSession.bind(this)
    this.saveActiveBin = this.saveActiveBin.bind(this)
    this.setAdditionalQty = this.setAdditionalQty.bind(this)
    this.setBarcode = this.setBarcode.bind(this)
    this.setComments = this.setComments.bind(this)
    this.setCountQty = this.setCountQty.bind(this)
    this.setNewProduct = this.setNewProduct.bind(this)
    this.shareSession = this.shareSession.bind(this)
  }

  async init() {
    try {
      // await this.sessionManager.deleteAllSessions() // Delete this line
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
  }

  @action
  async loadNewActiveSession(id: number) {
    try {
      const result = await this.sessionManager.loadSession(id)
      if (result) {
        this.activeSession = result
        this.activeBin = this.activeSession.createNewBin()
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action
  async renameSession(id: number, name: string) {
    try {
      const session = await this.sessionManager.loadSession(id)
      if (session) {
        session.name = name
        this.sessionManager.saveSession(session)
      }
    } catch (e) {
      console.log(e)
    }
  }

  @action
  async deleteSession(id: number) {
    await this.sessionManager.deleteSession(id)
  }

  async shareSession(id: number) {
    const session = await this.sessionManager.loadSession(id)
    let pathToWrite
    if (session) {
      pathToWrite = `${RNFetchBlob.fs.dirs.CacheDir}/${session.name}.csv`
      const data =
        session.bins.length > 0 ? session.binsToCsv() : 'There is no data'
      await RNFetchBlob.fs.writeFile(pathToWrite, data, 'utf8')
    }
    try {
      await Share.open({
        url: `file://${pathToWrite}`,
        title: 'Share via'
      })
      await RNFetchBlob.fs.unlink(pathToWrite)
    } catch (e) {
      console.log(e)
    }
  }

  async emailActiveSession() {
    const session = await this.sessionManager.loadSession(this.activeSession.id)
    if (session) {
      const pathToWrite = `${RNFetchBlob.fs.dirs.CacheDir}/${session.name}.csv`
      const data =
        session.bins.length > 0 ? session.binsToCsv() : 'There is no data'
      await RNFetchBlob.fs.writeFile(pathToWrite, data, 'utf8')
      Mailer.mail(
        {
          subject: 'Inventory File',
          body: 'See attached inventory file...\n\n',
          isHTML: true,
          attachment: {
            path: `${pathToWrite}`,
            type: 'csv'
          }
        },
        () => RNFetchBlob.fs.unlink(pathToWrite)
      )
    }
    // TODO: re-implement using "Share.shareSingle" once it is ready
    // const response = await Share.shareSingle({
    // url: `file://${pathToWrite}`,
    // social: 'email',
    // title: `${session ? session.name : null}`,
    // message: 'See attached inventory file...\n\n'
    // })
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
