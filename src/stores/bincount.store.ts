import { observable } from 'mobx'

import SessionManager, {
  Bin,
  Session,
  SessionIndex
} from '../model/bincount.model'

export default class BinCountStore {
  sessionManager: SessionManager
  @observable
  sessionList: SessionIndex[]
  @observable
  activeSession: Session | undefined
  @observable
  activeBin: Bin | undefined

  constructor() {
    this.sessionManager = new SessionManager()
    this.sessionList = this.sessionManager.sessions

    this.activeSession = this.sessionManager.newSession()
    this.activeBin = this.activeSession.createNewBin()
  }
}
