import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'

// interface IListCardProps {

// }

@observer
export default class ListCard extends React.Component {
  // constructor() {
  // super(props: ListCardProps)
  // }

  render() {
    return (
      <View>
        <Text style={styles.container}>Hello World!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20
  }
})
