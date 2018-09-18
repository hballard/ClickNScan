import React from 'react'
import { StyleSheet, View, Image, StatusBar } from 'react-native'
import {
  NavigationStackScreenOptions,
  NavigationScreenProps,
  StackActions,
  NavigationActions
} from 'react-navigation'

import theme from '../config/theme.config'

export default class Splash extends React.Component<NavigationScreenProps> {
  static navigationOptions: NavigationStackScreenOptions = {
    header: null
  }

  splashResetNavigation() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Form' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  componentDidMount() {
    setTimeout(this.splashResetNavigation.bind(this), 3000)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image
          style={styles.img}
          source={require('../assets/images/splash-company-logo.png')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary
  },
  img: {
    width: 300,
    height: 200
  }
})
