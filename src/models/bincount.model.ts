import { AsyncStorage } from 'react-native'

import { getCurrentDateTime } from '../util/functions.util'

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
  createdDate: string
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
        this.createdDate = getCurrentDateTime()
        this.updatedDate = this.createdDate
        this.name = initializer.name || `New File`
    }
  }

  createNewBin() {
    const createdDate = getCurrentDateTime()
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
    return newBin
  }

  deleteBin(id: number) {
    const index = this.bins.findIndex(el => el.id === id)
    this.bins.splice(index, 1)
    this.updatedDate = getCurrentDateTime()
    return id
  }

  updateBin(bin: IBin) {
    const index = this.bins.findIndex(el => el.id === bin.id)
    if (index === -1) {
      this.bins.push(bin)
    } else {
      this.bins.splice(index, 1, bin)
    }
    this.updatedDate = getCurrentDateTime()
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

  binsToCsv() {
    if (this.bins.length !== 0) {
      const headers = Object.keys(this.bins[0])
        .slice(1, -2)
        .join()
      const data = this.bins
        .map((obj: IBin) =>
          Object.keys(obj)
            .map((key: string) => obj[key])
            .slice(1, -2)
            .join()
        )
        .join('\n')
      return `${headers}\n${data}`
    } else {
      return 'There is no data. Please scan some inventory.\n'
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
    this.sessions.push({
      id: newSession.id,
      name: newSession.name,
      createdDate: newSession.createdDate
    })
    this.saveSessionManager()
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
      const index = this.sessions.findIndex(el => el.id === s.id)
      const session = this.sessions[index]
      session.name = s.name
      this.sessions.splice(index, 1, session)
      this.saveSessionManager()
      AsyncStorage.setItem(`@Session:${s.id}`, JSON.stringify(s.toJson()))
    } catch (e) {
      console.log(e)
    }
  }

  // TODO: add "mergeItem" flow logic; will probably need to convert storage
  // array into an indexable object or Map
  async deleteSession(id: number) {
    try {
      const index = this.sessions.findIndex(el => el.id === id)
      this.sessions.splice(index, 1)
      this.saveSessionManager()
      AsyncStorage.removeItem(`@Session:${id}`)
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
