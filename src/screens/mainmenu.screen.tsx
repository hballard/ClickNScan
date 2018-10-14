import React from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions
} from 'react-native'
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
class MainMenu extends React.Component<IMainMenuProps> {
  render() {
    const { navigate } = this.props.navigation
    const {
      createNewActiveSession,
      loadNewActiveSession,
      deleteSession,
      renameSession
    } = this.props.stores.binCount
    const { sessions } = this.props.stores.binCount.sessionManager
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
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
        <View>
          <ScrollView>
            <View style={styles.menuIconsContainer}>
              {sessions.map(item => {
                return (
                  <FileItem
                    key={JSON.stringify(item.id)}
                    name={item.name}
                    createdDate={item.createdDate}
                    id={item.id}
                    deleteCallback={async (id: number) => {
                      await deleteSession(id)
                      this.forceUpdate()
                    }}
                    renameCallback={async (id: number, text: string) => {
                      await renameSession(id, text)
                      this.forceUpdate()
                    }}
                    onPress={async (id: number) => {
                      await loadNewActiveSession(id)
                      navigate('Form')
                    }}
                  />
                )
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default withNavigationFocus(MainMenu)

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: theme.colors.secondary
  },
  menuIconsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 13,
    right: Dimensions.get('window').width / 2.63,
    zIndex: 1
  }
})
