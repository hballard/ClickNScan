import React from 'react'
import { Icon, IconProps } from 'react-native-elements'
import { observer } from 'mobx-react'

import theme from '../config/theme.config'

interface IDisabledIconProps extends IconProps {
  disabled?: boolean
}

@observer
export default class DisabledIcon extends React.Component<IDisabledIconProps> {
  render() {
    const { disabled, color, onPress, onLongPress, ...props } = this.props
    if (disabled) {
      return <Icon color={theme.colors.secondary} {...props} />
    } else {
      return (
        <Icon
          color={color}
          onPress={onPress}
          onLongPress={onLongPress}
          {...props}
        />
      )
    }
  }
}
