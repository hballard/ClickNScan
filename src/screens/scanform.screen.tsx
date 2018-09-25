import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ScrollView,
  StatusBar
} from 'react-native'
import { Icon, FormLabel, FormInput, Card } from 'react-native-elements'
import {
  NavigationTabScreenOptions,
  NavigationScreenProp
} from 'react-navigation'
import { inject, observer } from 'mobx-react'

import { Store } from '../stores'
import { NewProductPicker } from '../model/bincount.model'
import FormPicker from '../components/formpicker.component'
import theme from '../config/theme.config'

interface Props {
  navigation: NavigationScreenProp<{}>
  stores: Store
}

@inject('stores')
@observer
export default class ScanForm extends React.Component<Props, {}> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'Scan & Count'
  }

  render() {
    const { activeBin, activeSession, sessionManager, createNewActiveBin } = this.props.stores.binCount
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.content}>
          <KeyboardAvoidingView enabled behavior="position">
            <Card>
              <View>
                <FormLabel>Barcode</FormLabel>
                <FormInput
                  placeholder="Enter barcode or scan"
                  value={activeBin.barcode}
                  onChangeText={(text: string) => (activeBin.barcode = text)}
                />
              </View>
              <View>
                <FormLabel>Count Qty</FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter bin count"
                  value={activeBin.countQty}
                  onChangeText={(text: string) => (activeBin.countQty = text)}
                />
              </View>
              <View>
                <FormLabel>Additional Qty</FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter additional order amounts"
                  value={activeBin.additionalQty}
                  onChangeText={(text: string) =>
                    (activeBin.additionalQty = text)
                  }
                />
              </View>
              <View>
                <FormLabel>New Product?</FormLabel>
                <FormPicker
                  items={[
                    { label: NewProductPicker.No, value: NewProductPicker.No },
                    { label: NewProductPicker.Yes, value: NewProductPicker.Yes }
                  ]}
                />
              </View>
              <View>
                <FormLabel>Comments</FormLabel>
                <FormInput
                  placeholder="Enter Comments"
                  value={activeBin.comments}
                  onChangeText={(text: string) => (activeBin.comments = text)}
                />
              </View>
              <View style={styles.button}>
                <Icon
                  reverse
                  raised
                  name="add"
                  size={36}
                  color="#E10000"
                  onPress={() => {
                    activeSession.updateBin(activeBin)
                    sessionManager.saveSession(activeSession)
                    createNewActiveBin()
                  }}
                />
              </View>
            </Card>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary
  },
  content: {
    paddingTop: 25
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 90,
    padding: 10
  }
})
