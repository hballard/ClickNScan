import React from 'react'
import { Image, View } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationScreenProps
} from 'react-navigation'
import { Icon } from 'react-native-elements'

import ScanForm from './screens/scanform.screen'
import SplashScreen from './screens/splash.screen'
import GridView from './screens/gridview.screen'
import theme from './config/theme.config'

const FormStack = createBottomTabNavigator(
  {
    FormInput: ScanForm,
    FormView: GridView
  },
  {
    initialRouteName: 'FormInput',
    tabBarOptions: {
      activeTintColor: theme.colors.accent,
      inactiveTintColor: theme.colors.inactive,
      labelStyle: {
        fontSize: theme.fontSize.footer
      },
      style: {
        backgroundColor: theme.colors.primary
      }
    },
    navigationOptions: (props: NavigationScreenProps) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = props.navigation.state
        let iconName = ''
        if (routeName === 'FormInput') {
          iconName = 'assignment'
        } else if (routeName === 'FormView') {
          iconName = 'grid-on'
        }
        return <Icon name={iconName} size={25} color={tintColor} />
      }
    })
  }
)

export default createStackNavigator(
  {
    Form: {
      screen: FormStack,
      navigationOptions: (props: NavigationScreenProps) => {
        return {
          headerTitle: props => {
            return (
              <View style={props.style}>
                <Image
                  style={{ width: 175, height: 28.6 }}
                  source={require('./assets/images/clicknscan-logo.png')}
                />
              </View>
            )
          },
          headerTitleStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        }
      }
    },
    Splash: SplashScreen
  },
  {
    initialRouteName: 'Splash',
    navigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.primary
      },
      headerTintColor: theme.colors.accent
    }
  }
)
