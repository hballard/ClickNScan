import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { observer } from 'mobx-react'
import { Card } from 'react-native-elements'

import { IBin } from '../model/bincount.model'

interface IListCardProps {
  binData: IBin
  borderStyle?: {}
  onPress: (id: number) => void
}

@observer
export default class ListCard extends React.Component<IListCardProps> {
  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.onPress(this.props.binData.id)}
        >
          <Card
            containerStyle={StyleSheet.flatten([
              styles.card,
              this.props.borderStyle
            ])}
          >
            <Text>{this.props.binData.id}</Text>
            <Text>{this.props.binData.barcode}</Text>
            <Text>{this.props.binData.countQty}</Text>
            <Text>{this.props.binData.additionalQty}</Text>
            <Text>{this.props.binData.newProduct}</Text>
            <Text>{this.props.binData.comments}</Text>
            <Text>{this.props.binData.createdDate}</Text>
          </Card>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {}
})
