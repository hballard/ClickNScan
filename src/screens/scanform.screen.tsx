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

import { IStores } from '../stores'
import { NewProductPicker } from '../model/bincount.model'
import FormPicker from '../components/formpicker.component'
import theme from '../config/theme.config'
import DynamicIcon from '../components/dynamicicon.component';

interface IScanFormProps {
  navigation: NavigationScreenProp<{}>
  stores: IStores
}

@inject('stores')
@observer
export default class ScanForm extends React.Component<IScanFormProps, {}> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'Scan & Count'
  }

  render() {
    const {
      activeBin,
      createNewActiveBin,
      activeSession
    } = this.props.stores.binCount
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.scrollView}>
          <KeyboardAvoidingView enabled behavior="position">
            <Card>
              <View>
                <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
                  Barcode
                </FormLabel>
                <View style={styles.barcodeContainer}>
                  <FormInput
                    placeholder="Enter barcode or scan"
                    value={activeBin.barcode}
                    onChangeText={this.props.stores.binCount.setBarcode}
                    containerStyle={{ flex: 3 }}
                  />
                  <Icon
                    name="barcode-scan"
                    type="material-community"
                    size={40}
                    color={theme.colors.darkAccent}
                    containerStyle={{ flex: 1 }}
                  />
                </View>
              </View>
              <View>
                <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
                  Count Qty
                </FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter bin count"
                  value={activeBin.countQty}
                  onChangeText={this.props.stores.binCount.setCountQty}
                />
              </View>
              <View>
                <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
                  Additional Qty
                </FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter additional order amounts"
                  value={activeBin.additionalQty}
                  onChangeText={this.props.stores.binCount.setAdditionalQty}
                />
              </View>
              <View>
                <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
                  New Product?
                </FormLabel>
                <FormPicker
                  value={activeBin.newProduct}
                  onSelect={this.props.stores.binCount.setNewProduct}
                  items={[
                    { label: NewProductPicker.No, value: NewProductPicker.No },
                    { label: NewProductPicker.Yes, value: NewProductPicker.Yes }
                  ]}
                />
              </View>
              <View>
                <FormLabel labelStyle={{ color: theme.colors.darkAccent }}>
                  Comments
                </FormLabel>
                <FormInput
                  placeholder="Enter Comments"
                  value={activeBin.comments}
                  onChangeText={this.props.stores.binCount.setComments}
                />
              </View>
              <View style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                  <DynamicIcon
                    name="delete"
                    type="material"
                    size={40}
                    onPress={this.props.stores.binCount.deleteActiveBin}
                    color={theme.colors.darkAccent}
                    disabled={
                      activeBin.id === activeSession.bins.slice(-1)[0].id
                        ? true
                        : false
                      }
                  />
                  <DynamicIcon
                    name="save"
                    type="material"
                    size={40}
                    onPress={this.props.stores.binCount.saveActiveBin}
                    color={theme.colors.darkAccent}
                    disabled={
                      activeBin.id === activeSession.bins.slice(-1)[0].id
                        ? true
                        : false
                      }
                  />
                  <Icon
                    name="barcode"
                    type="material-community"
                    size={40}
                    containerStyle={{ marginLeft: 6, marginTop: 41 }}
                    color={
                      activeBin.id === activeSession.bins.slice(-1)[0].id
                        ? theme.colors.darkAccent
                        : theme.colors.primary
                    }
                  />
                </View>
                <Icon
                  reverse
                  raised
                  name="add"
                  size={36}
                  color={theme.colors.primary}
                  onPress={createNewActiveBin}
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
  scrollView: {
    paddingTop: 25
  },
  barcodeContainer: {
    flexDirection: 'row'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 15
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    paddingTop: 10,
    paddingRight: 10
  }
})
