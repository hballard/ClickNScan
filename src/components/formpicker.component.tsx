import React from 'react'
import {
  Modal,
  Picker,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { FormInput } from 'react-native-elements'
import { observer } from 'mobx-react'

import { IStores } from '../stores'
import { NewProductPicker } from '../model/bincount.model'

interface IDropdownItems {
  label: NewProductPicker.No | NewProductPicker.Yes
  value: NewProductPicker.No | NewProductPicker.Yes
}

interface IFormPickerProps {
  items: IDropdownItems[]
  initialModalVisible?: boolean
  stores: IStores
  value: NewProductPicker.No | NewProductPicker.Yes
  onSelect: (param: NewProductPicker.No | NewProductPicker.Yes) => void
}

interface IFormPickerState {
  modalVisible: boolean
}

@observer
export default class FormPicker extends React.Component<
  IFormPickerProps,
  IFormPickerState
> {
  state: IFormPickerState = {
    modalVisible: this.props.initialModalVisible || false
  }

  constructor(props: IFormPickerProps) {
    super(props)

    this.toggleModal = this.toggleModal.bind(this)
  }

  private toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal.bind(this)}>
          <FormInput
            editable={false}
            placeholder={this.props.value}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <Modal
          transparent={true}
          animationType="slide"
          visible={this.state.modalVisible}
        >
          <TouchableWithoutFeedback onPress={this.toggleModal}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          <View style={styles.modalForeground}>
            <Picker
              selectedValue={this.props.value}
              onValueChange={itemValue => {
                this.props.onSelect(itemValue)
                this.toggleModal()
              }}
            >
              {this.props.items.map(item => {
                return (
                  <Picker.Item
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                )
              })}
            </Picker>
          </View>
        </Modal>
      </View>
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
