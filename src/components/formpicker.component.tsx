import React from 'react'
import {
  Picker,
  TouchableOpacity,
  View,
} from 'react-native'
import { FormInput } from 'react-native-elements'
import { observer } from 'mobx-react'

import { IStores } from '../stores'
import { NewProductPicker } from '../model/bincount.model'
import PartialModal from './partialmodal.component'

interface IDropdownItems {
  label: NewProductPicker.No | NewProductPicker.Yes
  value: NewProductPicker.No | NewProductPicker.Yes
}

interface IFormPickerProps {
  items: IDropdownItems[]
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
    modalVisible: false
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
        <PartialModal
          modalVisible={this.state.modalVisible}
          toggleModal={this.toggleModal}
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
        </PartialModal>
      </View>
    )
  }
}
