import React from 'react'
import { Text, TextInput } from 'react-native'
import { observer } from 'mobx-react'

interface IEditableTextProps {
  onBlur: (text: string) => void
}

interface IEditableTextState {
  editable: boolean
  editableText: string
}

@observer
export default class EditableText extends React.Component<
  IEditableTextProps,
  IEditableTextState
> {
  state = {
    editable: false,
    editableText: this.props.children as string
  }

  constructor(props: IEditableTextProps) {
    super(props)

    this.toggleEdit = this.toggleEdit.bind(this)
    this.updateText = this.updateText.bind(this)
  }

  private toggleEdit() {
    this.setState({ editable: !this.state.editable })
  }

  private updateText(text: string) {
    this.setState({ editableText: text })
  }

  render() {
    const { onBlur, children, style, ...props } = this.props
    if (!this.state.editable) {
      return (
        <Text onPress={this.toggleEdit} style={style} {...props}>
          {this.state.editableText}
        </Text>
      )
    } else {
      return (
        <TextInput
          value={this.state.editableText}
          onChangeText={this.updateText}
          style={style}
          onBlur={() => {
            onBlur(this.state.editableText)
            this.toggleEdit()
          }}
        />
      )
    }
  }
}
