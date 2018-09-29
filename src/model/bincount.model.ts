import { AsyncStorage } from 'react-native'

export enum NewProductPicker {
  No = 'No',
  Yes = 'Yes'
}

export interface IBin {
  readonly id: number
  barcode: string
  countQty: string
  newProduct: NewProductPicker
  additionalQty: string
  comments: string
  createdDate: string
  updatedDate: string
}

export interface INewSessionInitializer {
  kind: 'newSession'
  readonly id: number
  name?: string
}

export interface ISessionIndex {
  readonly id: number
  name: string
}

export interface ISessionState extends ISessionIndex {
  kind: 'sessionState'
  createdDate: string
  updatedDate: string
  binCounter: number
  bins: IBin[]
}

// TODO: compose SessionManager inside of Session class and changes methods to
// reflect that.  Will present a simpler API to use in app.
export interface ISessionManagerState {
  sessionCounter: number
  sessions: ISessionIndex[]
}

export class Session {
  binCounter: number = 1
  readonly id: number
  name: string
  createdDate: string
  updatedDate: string
  bins: IBin[] = []

  constructor(initializer: ISessionState | INewSessionInitializer) {
    switch (initializer.kind) {
      case 'sessionState':
        this.id = initializer.id
        this.name = initializer.name
        this.createdDate = initializer.createdDate
        this.updatedDate = initializer.createdDate
        this.binCounter = initializer.binCounter
        this.bins = initializer.bins
        break

      default:
        this.id = initializer.id
        const createdDate = Date()
        this.createdDate = createdDate
        this.updatedDate = createdDate
        this.name =
          initializer.name ||
          `Session ${initializer.id} created on ${createdDate}`
    }
  }

  createNewBin() {
    const createdDate = Date()
    const newBin = {
      id: this.binCounter++,
      barcode: '',
      countQty: '',
      newProduct: NewProductPicker.No,
      additionalQty: '',
      comments: '',
      createdDate,
      updatedDate: createdDate
    }
    this.bins.push(newBin)
    return newBin
  }

  deleteBin(id: number) {
    this.bins = this.bins.filter((el: IBin) => el.id !== id)
    this.updatedDate = Date()
    return id
  }

  updateBin(bin: IBin) {
    this.bins = this.bins.map((el: IBin) => {
      if (el.id === bin.id) {
        bin.updatedDate = Date()
        return bin
      } else {
        return el
      }
    })
    this.updatedDate = Date()
    return bin.id
  }

  // TODO: change this method to use Array.find method
  getBin(id: number) {
        return this.bins.filter((el: IBin) => el.id === id)[0]
  }

  toJson(): ISessionState {
    return {
      kind: 'sessionState',
      id: this.id,
      name: this.name,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      binCounter: this.binCounter,
      bins: this.bins
    }
  }
}

// TODO: convert Promises to async / await method syntax
// TODO: make class a more 'generic' db session manager class that could be
// used by other store classes; move db class to different module at that point
export default class SessionManager {
  sessionCounter: number = 1
  sessions: ISessionIndex[] = []

  constructor() {
    AsyncStorage.getItem('@SessionManager')
    .then(result => {
      if (result) {
        const savedSessionState: ISessionManagerState = JSON.parse(result)
        this.sessionCounter = savedSessionState.sessionCounter
        this.sessions = savedSessionState.sessions
      }
    }).catch(e => console.log(e))
  }

  newSession() {
    const id = this.sessionCounter++
    const newSession = new Session({ kind: 'newSession', id })
    this.sessions.push({ id: newSession.id, name: newSession.name })
    return newSession
  }

  loadSession(id: number): Session | void {
    AsyncStorage.getItem(`@Session:${id}`)
      .then(
        result =>
          result ? JSON.parse(result) : console.log('No session result returned')
      )
      .then((result: ISessionState) => new Session(result))
      .catch(e => console.log(e))
  }

  saveSession(s: Session) {
    AsyncStorage.setItem(`@Session:${s.id}`, JSON.stringify(s.toJson()))
  }

  // TODO: add "mergeItem" flow logic; will probably need to convert storage
  // array into an indexable object or Map
  deleteSession(id: number) {
    AsyncStorage.removeItem(`@Session:${id}`)
      .then(() => (this.sessions = this.sessions.filter(el => el.id !== id)))
      .catch(e => console.log(e))
  }

  deleteAllSessions() {
    AsyncStorage.clear()
  }

  saveSessionManager() {
    AsyncStorage.setItem(
      '@SessionManager',
      JSON.stringify({
        sessionCounter: this.sessionCounter,
        sessions: this.sessions
      })
    )
  }
}
