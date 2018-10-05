import { AsyncStorage } from 'react-native'

export enum NewProductPicker {
  No = 'No',
  Yes = 'Yes'
}

export interface IBin {
  readonly id: number
  barcode: string
  countQty: string
  newProduct: NewProductPicker.No | NewProductPicker.Yes
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
        const date = new Date()
        this.createdDate = `${date.toDateString()} ${date.toTimeString()}`
        this.updatedDate = this.createdDate
        this.name =
          initializer.name ||
          `File ${initializer.id}`
    }
  }

  createNewBin() {
    const date = new Date()
    const createdDate = `${date.toDateString()} ${date.toTimeString()}`
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
    const date = new Date()
    this.updatedDate = `${date.toDateString()} ${date.toTimeString()}`
    return id
  }

  updateBin(bin: IBin) {
    const date = new Date()
    this.bins = this.bins.map((el: IBin) => {
      if (el.id === bin.id) {
        bin.updatedDate = `${date.toDateString()} ${date.toTimeString()}`
        return bin
      } else {
        return el
      }
    })
    this.updatedDate = `${date.toDateString()} ${date.toTimeString()}`
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

// TODO: make class a more 'generic' db session manager class that could be
// used by other store classes; move db class to different module at that point
export default class SessionManager {
  sessionCounter: number = 1
  sessions: ISessionIndex[] = []

  async init() {
    try {
      const result = await AsyncStorage.getItem('@SessionManager')
      if (result !== null) {
        const savedSessionState: ISessionManagerState = JSON.parse(result)
        this.sessionCounter = savedSessionState.sessionCounter
        this.sessions = savedSessionState.sessions
      } else {
        console.log('No SessionManager object returned')
      }
    } catch (e) {
      console.log(e)
    }
  }

  newSession() {
    const id = this.sessionCounter++
    const newSession = new Session({ kind: 'newSession', id })
    this.sessions.push({ id: newSession.id, name: newSession.name })
    return newSession
  }

  async loadSession(id: number): Promise<Session | void> {
    try {
      const result = await AsyncStorage.getItem(`@Session:${id}`)
      if (result !== null) {
        return new Session(JSON.parse(result))
      } else {
        console.log('No session result returned')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async saveSession(s: Session) {
    try {
      await AsyncStorage.setItem(`@Session:${s.id}`, JSON.stringify(s.toJson()))
    } catch (e) {
      console.log(e)
    }
  }

  // TODO: add "mergeItem" flow logic; will probably need to convert storage
  // array into an indexable object or Map
  async deleteSession(id: number) {
    try {
      await AsyncStorage.removeItem(`@Session:${id}`)
      this.sessions = this.sessions.filter(el => el.id !== id)
    } catch (e) {
      console.log(e)
    }
  }

  async deleteAllSessions() {
    await AsyncStorage.clear()
  }

  async saveSessionManager() {
    try {
      await AsyncStorage.setItem(
        '@SessionManager',
        JSON.stringify({
          sessionCounter: this.sessionCounter,
          sessions: this.sessions
        })
      )
    } catch (e) {
      console.log(e)
    }
  }
}
