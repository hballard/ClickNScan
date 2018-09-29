import React from 'react'
import { Modal, Picker, TouchableOpacity, View } from 'react-native'
import { FormInput } from 'react-native-elements'

import { IStores } from '../stores'
import { NewProductPicker } from '../model/bincount.model'

interface IDropdownItems {
  label: NewProductPicker
  value: NewProductPicker
}

interface IFormPickerProps {
  items: IDropdownItems[]
  initialModalVisible?: boolean
  stores: IStores
  value: NewProductPicker
  onSelect: (param: NewProductPicker) => void
}

interface IFormPickerState {
  modalVisible: boolean
}

export default class FormPicker extends React.Component<
  IFormPickerProps,
  IFormPickerState
> {
  state: IFormPickerState = {
    modalVisible: this.props.initialModalVisible || false
  }

  constructor(props: IFormPickerProps) {
    super(props)
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
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
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
        </Modal>
      </View>
    )
  }
}
