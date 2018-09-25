import React from 'react'
import { Modal, Picker, TouchableOpacity, View } from 'react-native'
import { FormInput } from 'react-native-elements'
import { inject, observer } from 'mobx-react'

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
}

interface State {
  modalVisible: boolean
}

@inject('stores')
@observer
export default class FormPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      modalVisible: this.props.initialModalVisible || false
    }
  }

  private toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  render() {
    const { activeBin } = this.props.stores.binCount
    return (
      <View>
        <TouchableOpacity onPress={this.toggleModal.bind(this)}>
          <FormInput
            editable={false}
            placeholder={activeBin.newProduct}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Picker
            selectedValue={activeBin.newProduct}
            onValueChange={itemValue => {
              activeBin.newProduct = itemValue
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
