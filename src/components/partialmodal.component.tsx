import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native'
import { observer } from 'mobx-react'

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
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000080'
  },
  modalForeground: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  }
})
