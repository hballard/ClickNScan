import React from 'react'
import { Modal, Picker, TouchableOpacity, View } from 'react-native'
import { FormInput } from 'react-native-elements'

interface DropdownItems {
  label: string
  value: string
}

interface Props {
  items: DropdownItems[]
  initialItemDefault?: string
  initialModalVisible?: boolean
}

interface State {
  newItem: string
  modalVisible: boolean
}

export default class FormPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      newItem: this.props.initialItemDefault || this.props.items[0].value,
      modalVisible: this.props.initialModalVisible || false
    }
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
            placeholder={this.state.newItem}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Picker
            selectedValue={this.state.newItem}
            onValueChange={(itemValue) => {
              this.setState({ newItem: itemValue })
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
