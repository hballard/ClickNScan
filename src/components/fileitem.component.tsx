import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Icon, Text, List, ListItem } from 'react-native-elements'

import theme from '../config/theme.config'
import PartialModal from './partialmodal.component'

interface IFileItemProps {
  key?: string
  id: number
  name?: string
  createdDate?: string
  onPress?: (id: number) => void
  initialModalVisible: boolean
}

interface IFileItemState {
  modalVisible: boolean
}

@observer
export default class FileItem extends React.Component<IFileItemProps, {}> {
  state: IFileItemState = {
    modalVisible: this.props.initialModalVisible || false
  }

  constructor(props: IFileItemProps) {
    super(props)

    this.toggleModal = this.toggleModal.bind(this)
  }

  private toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }
  render() {
    const { onPress } = this.props
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
            if (onPress) {
              onPress(this.props.id)
            }
          }}
          onLongPress={this.toggleModal}
        />
        <PartialModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
        >
          <List containerStyle={styles.listContainer}>
            <ListItem
              leftIcon={{ name: 'edit', type: 'material' }}
              title="Rename"
              hideChevron
            />
            <ListItem
              leftIcon={{ name: 'share', type: 'material' }}
              title="Share"
              hideChevron
            />
            <ListItem
              leftIcon={{ name: 'delete', type: 'material' }}
              title="Delete"
              hideChevron
            />
          </List>
        </PartialModal>
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
  footerText: {},
  listContainer: {
    marginTop: 3,
    borderTopWidth: 0,
    paddingLeft: 5,
  }
})
