import React from 'react'
import { View,
  Text,
  StyleSheet,
  // FlatList
} from 'react-native'
// import { ListItem, List } from 'react-native-elements'
import { NavigationTabScreenOptions } from 'react-navigation'

import theme from '../config/theme.config'
import { observer, inject } from 'mobx-react'

@inject('stores')
@observer
export default class GridView extends React.Component {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'View Records'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}> GridView!! </Text>
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
  }
})
