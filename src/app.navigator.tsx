import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator,
  NavigationScreenProps
} from 'react-navigation'
import { Image, View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

import ScanForm from './screens/scanform.screen'
import SplashScreen from './screens/splash.screen'
import GridView from './screens/gridview.screen'
import theme from './config/theme.config'
import MainMenu from './screens/mainmenu.screen'

const FormNavigator = createBottomTabNavigator(
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
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = props.navigation.state
        let iconName
        if (routeName === 'FormInput') {
          iconName = 'assignment'
        } else {
          iconName = 'grid-on'
        }
        return <Icon name={iconName} size={25} color={tintColor as string} />
      }
    })
  }
)

export default createStackNavigator(
  {
    MainMenu: {
      screen: MainMenu,
      navigationOptions: () => {
        return {
          headerTitle: (headerProps: any) => {
            return (
              <View style={headerProps.style}>
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
    Form: {
      screen: FormNavigator,
      navigationOptions: (props: NavigationScreenProps) => {
        console.log()
        return {
          headerTitle: (headerProps: any) => {
            return (
              <View style={headerProps.style}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="middle"
                  style={{
                    color: theme.colors.accent,
                    textAlign: 'center',
                    fontSize: 22,
                    width: 225
                  }}
                >
                  {props.screenProps
                    ? props.screenProps.binCount.activeSession.name
                    : null}
                </Text>
              </View>
            )
          },
          headerRight: (
            <Icon
              name="email"
              color={theme.colors.accent}
              size={35}
              containerStyle={{ marginRight: 10 }}
              underlayColor={theme.colors.primary}
              onPress={
                props.screenProps
                  ? props.screenProps.binCount.emailActiveSession
                  : null
              }
            />
          ),
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
