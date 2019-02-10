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
import { IBin } from '../models/bincount.model'

interface IGridViewProps {
  navigation: NavigationScreenProp<{}>
  stores: IStores
}

@inject('stores')
@observer
class GridView extends React.Component<IGridViewProps> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'View Records'
  }

  render() {
    const { bins } = this.props.stores.binCount.activeSession
    return (
      <View style={styles.container}>
        <FlatList
          data={bins}
          extraData={bins.length}
          keyExtractor={(item: IBin) => JSON.stringify(item.id)}
          renderItem={({ item, index }) => (
            <ListCard
              binData={item}
              binIndex={index + 1}
              borderStyle={
                this.props.stores.binCount.activeBin.id === item.id
                  && { borderWidth: 1, borderColor: theme.colors.primary }
              }
              onPress={(id: number) => {
                this.props.stores.binCount.loadNewActiveBin(id)
                this.props.navigation.navigate('FormInput')
              }}
            />
          )}
        />
      </View>
    )
  }
}

export default withNavigationFocus(GridView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary
  }
})
