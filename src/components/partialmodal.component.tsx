import React from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Dimensions
} from 'react-native'
import { observer } from 'mobx-react'

import theme from '../config/theme.config'

interface IPartialModalProps {
  modalVisible: boolean
  toggleModal: () => void
  floating?: boolean
}

@observer
export default class PartialModal extends React.Component<IPartialModalProps> {
  render() {
    return (
      <Modal
        transparent={true}
        animationType="slide"
        visible={this.props.modalVisible}
      >
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={this.props.toggleModal}>
            <View style={styles.touchableChild} />
          </TouchableWithoutFeedback>
          <View
            style={
              this.props.floating
                ? StyleSheet.flatten([
                    styles.modalForeground,
                    styles.modalForegroundFloating
                  ])
                : styles.modalForeground
            }
          >
            {this.props.children}
          </View>
          <TouchableWithoutFeedback onPress={this.props.toggleModal}>
            <View style={this.props.floating ? { flex: 1 } : {}} />
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: theme.colors.modalBkgrdColor
  },
  touchableChild: {
    flex: 1
  },
  modalForeground: {
    backgroundColor: theme.colors.accent
  },
  modalForegroundFloating: {
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
    padding: 10
  }
})
