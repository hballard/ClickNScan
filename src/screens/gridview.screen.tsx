import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import {
  NavigationTabScreenOptions,
  NavigationScreenProp,
  withNavigationFocus
} from 'react-navigation'
import { observer, inject } from 'mobx-react'

import theme from '../config/theme.config'
import ListCard from '../components/listcard.component'
import { IStores } from '../stores'
import { IBin } from '../model/bincount.model'

interface IGridViewProps {
  navigation: NavigationScreenProp<{}>
  stores: IStores
}

@inject('stores')
@observer
class GridView extends React.Component<IGridViewProps, {}> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'View Records'
  }

  render() {
    const { bins } = this.props.stores.binCount.activeSession
    return (
      <View style={styles.container}>
        <FlatList
          data={bins.slice(0,-1)}
          keyExtractor={(item: IBin) => JSON.stringify(item.id)}
          renderItem={({ item }) => <ListCard binData={item} />}
        />
      </View>
    )
  }
}

export default withNavigationFocus(GridView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary
  },
  list: {
    flex: 1
  }
})
