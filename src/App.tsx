import React from 'react'
import { Provider } from 'mobx-react'

import AppNavigator from './app.navigator'
import stores from '../src/stores'

export default class App extends React.Component {

  render() {
    return (
      <Provider stores={stores}>
        <AppNavigator />
      </Provider>
    )
  }
}
