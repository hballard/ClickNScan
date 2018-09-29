import React from 'react'
import { Modal, Picker, TouchableOpacity, View } from 'react-native'
import { FormInput } from 'react-native-elements'

import { Store } from '../stores'
import { NewProductPicker } from '../model/bincount.model'

interface DropdownItems {
  label: NewProductPicker
  value: NewProductPicker
}

interface Props {
  items: DropdownItems[]
  initialModalVisible?: boolean
  stores: Store
  value: NewProductPicker
  onSelect: (param: NewProductPicker) => void
}

interface State {
  modalVisible: boolean
}

export default class FormPicker extends React.Component<Props, State> {
  state: State = {
    modalVisible: this.props.initialModalVisible || false
  }

  constructor(props: Props) {
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
