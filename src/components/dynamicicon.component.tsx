import React from 'react'
import { Icon, IconProps } from 'react-native-elements'

import theme from '../config/theme.config'

interface IDynamicIconProps extends IconProps {
  disabled?: boolean
}

export default class DynamicIcon extends React.Component<
  IDynamicIconProps,
  object
> {
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
