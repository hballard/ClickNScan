import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Icon, Text } from 'react-native-elements'

import theme from '../config/theme.config'

interface IFileItemProps {
  key?: string
  id: number
  name?: string
  createdDate?: string
  onClick?: (id: number) => void
}

@observer
export default class FileItem extends React.Component<IFileItemProps, {}> {
  render() {
    const { onClick } = this.props
    return (
      <View key={this.props.id} style={styles.container}>
        <Text style={styles.titleText}>{this.props.name}</Text>
        <Icon
          underlayColor={theme.colors.secondary}
          name="file-text"
          type="font-awesome"
          size={90}
          color={theme.colors.accent}
          containerStyle={styles.iconContainer}
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
    margin: 20
  },
  iconContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  titleText: {
    marginBottom: 10
  },
  footerText: {}
})
