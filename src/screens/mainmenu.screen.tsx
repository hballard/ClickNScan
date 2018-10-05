import React from 'react'
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { NavigationScreenProp, withNavigationFocus } from 'react-navigation'
import { inject, observer } from 'mobx-react'

import theme from '../config/theme.config'
import { IStores } from '../stores'
import FileItem from '../components/fileitem.component'

interface IMainMenuProps {
  navigation: NavigationScreenProp<{}>
  stores: IStores
}

@inject('stores')
@observer
class MainMenu extends React.Component<IMainMenuProps, {}> {
  render() {
    const { navigate } = this.props.navigation
    const {
      createNewActiveSession,
      loadNewActiveSession
    } = this.props.stores.binCount
    const { sessions } = this.props.stores.binCount.sessionManager
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View>
          <ScrollView>
            <View style={styles.menuIconsContainer}>
              {sessions.map(item => {
                return (
                  <FileItem
                    key={JSON.stringify(item.id)}
                    name={item.name}
                    id={item.id}
                    onClick={async (id: number) => {
                      await loadNewActiveSession(id)
                      navigate('Form')
                    }}
                  />
                )
              })}
            </View>
          </ScrollView>
            <View style={styles.buttonContainer}>
              <Icon
                reverse
                raised
                name="add"
                size={36}
                color={theme.colors.primary}
                onPress={() => {
                  createNewActiveSession()
                  navigate('Form')
                }}
              />
            </View>
        </View>
      </View>
    )
  }
}

export default withNavigationFocus(MainMenu)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary
  },
  menuIconsContainer: {
    flex: 3,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 30
  },
  buttonContainer: {
    height: 90,
    margin: 10,
  }
})
