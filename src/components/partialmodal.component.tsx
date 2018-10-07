import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import { observer } from 'mobx-react'

import theme from '../config/theme.config'

interface IPartialModalProps {
  modalVisible: boolean
  toggleModal: () => void
}

@observer
export default class PartialModal extends React.Component<
  IPartialModalProps,
  {}
> {
  render() {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.props.modalVisible}
      >
        <TouchableWithoutFeedback onPress={this.props.toggleModal}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <View style={styles.modalForeground}>{this.props.children}</View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.modalBkgrdColor
  },
  modalForeground: {
    backgroundColor: theme.colors.accent,
  }
})
