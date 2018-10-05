import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Icon } from 'react-native-elements'

import theme from '../config/theme.config'

interface IFileItemProps {
  key?: string
  id: number
  name?: string
  onClick?: (id: number) => void
}

@observer
export default class FileItem extends React.Component<IFileItemProps, {}> {
  render() {
    const { onClick } = this.props
    return (
      <View key={this.props.id} style={styles.container}>
        <Text style={styles.titleText}>{`File ${this.props.id}`}</Text>
          <Icon
            underlayColor={theme.colors.secondary}
            name="file-text"
            type="font-awesome"
            size={90}
            color={theme.colors.accent}
            onPress={() => {
              if (onClick) {
                onClick(this.props.id)
              }
            }}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    fontSize: 25,
    alignItems: 'center',
    marginRight: 37,
    marginBottom: 30
  },
  titleText: {
    marginBottom: 10
  }
})
