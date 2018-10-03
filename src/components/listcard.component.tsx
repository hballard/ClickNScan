import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Card } from 'react-native-elements'

import { IBin } from '../model/bincount.model'

interface IListCardProps {
  binData: IBin
}

@observer
export default class ListCard extends React.Component<IListCardProps, {}> {
  render() {
    return (
      <View style={styles.container}>
        <Card>
            <Text>{this.props.binData.id}</Text>
            <Text>{this.props.binData.barcode}</Text>
            <Text>{this.props.binData.countQty}</Text>
            <Text>{this.props.binData.additionalQty}</Text>
            <Text>{this.props.binData.newProduct}</Text>
            <Text>{this.props.binData.comments}</Text>
            <Text>{this.props.binData.createdDate}</Text>
            <Text>{this.props.binData.updatedDate}</Text>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    alignContent: 'center',
    justifyContent: 'center'
  },
  card: {}
})
