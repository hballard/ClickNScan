import { AsyncStorage } from 'react-native'

export enum NewProductPicker {
  No = 'No',
  Yes = 'Yes'
}

export interface Bin {
  readonly id: number
  barcode: string
  countQty: string
  newProduct: NewProductPicker
  additionalQty: string
  comments: string
  createdDate: string
  updatedDate: string
}

export interface NewSessionInitializer {
  kind: 'newSession'
  readonly id: number
  name?: string
}

export interface SessionIndex {
  readonly id: number
  name: string
}

export interface SessionState extends SessionIndex {
  kind: 'sessionState'
  createdDate: string
  updatedDate: string
  binCounter: number
  bins: Bin[]
}

export interface SessionManagerState {
  sessionCounter: number
  sessions: SessionIndex[]
}

export class Session {
  binCounter: number = 1
  readonly id: number
  name: string
  createdDate: string
  updatedDate: string
  bins: Bin[] = []

  constructor(initializer: SessionState | NewSessionInitializer) {
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
    this.bins = this.bins.filter((el: Bin) => el.id !== id)
    this.updatedDate = Date()
    return id
  }

  updateBin(bin: Bin) {
    this.bins = this.bins.map((el: Bin) => {
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

  getBin(id: number) {
        return this.bins.filter((el: Bin) => el.id === id)[0]
  }

  toJson(): SessionState {
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

export default class SessionManager {
  sessionCounter: number = 1
  sessions: SessionIndex[] = []

  constructor() {
    AsyncStorage.getItem('@SessionManager')
    .then(result => {
      if (result) {
        const savedSessionState: SessionManagerState = JSON.parse(result)
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
      .then((result: SessionState) => new Session(result))
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
