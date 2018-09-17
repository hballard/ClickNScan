import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationTabScreenOptions } from 'react-navigation'

import theme from '../config/theme.config'

export default class GridView extends React.Component {

  static navigationOptions: NavigationTabScreenOptions = {
    title: 'View Records'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}> GridView!! </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
  }
})
