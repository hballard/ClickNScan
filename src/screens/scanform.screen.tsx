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
import { NewProductPicker } from '../models/bincount.model'
import FormPicker from '../components/formpicker.component'
import theme from '../config/theme.config'
import DisabledIcon from '../components/disabledicon.component'
import BarcodeScanner from '../components/barcodescanner.component'

interface IScanFormProps {
  navigation: NavigationScreenProp<{}>
  stores: IStores
}

interface IScanFormState {
  showBarcodeScanner: boolean
  enableAutoBarcodeScanner: boolean
}

@inject('stores')
@observer
export default class ScanForm extends React.Component<
  IScanFormProps,
  IScanFormState
> {
  static navigationOptions: NavigationTabScreenOptions = {
    title: 'Scan & Count'
  }

  state: IScanFormState = {
    showBarcodeScanner: false,
    enableAutoBarcodeScanner: false
  }

  constructor(props: IScanFormProps) {
    super(props)

    this.toggleBarcodeScanner = this.toggleBarcodeScanner.bind(this)
    this.toggleEnableAutoBarcodeScanner = this.toggleEnableAutoBarcodeScanner.bind(this)
  }

  private toggleBarcodeScanner() {
    this.setState({ showBarcodeScanner: !this.state.showBarcodeScanner })
  }

  private toggleEnableAutoBarcodeScanner() {
    this.setState({ enableAutoBarcodeScanner: !this.state.enableAutoBarcodeScanner })
  }

  render() {
    if (this.state.showBarcodeScanner) {
      return (
        <BarcodeScanner
          toggleBarcodeScanner={this.toggleBarcodeScanner}
          setBarcodeText={this.props.stores.binCount.setBarcode}
        />
      )
    } else {
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
                      containerStyle={{ flex: 3, flexDirection: 'row' }}
                      inputStyle={{ flex: 1 }}
                    />
                    <Icon
                      name="barcode-scan"
                      type="material-community"
                      size={40}
                      color={theme.colors.darkAccent}
                      containerStyle={{ flex: 1 }}
                      onPress={this.toggleBarcodeScanner}
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
                      {
                        label: NewProductPicker.No,
                        value: NewProductPicker.No
                      },
                      {
                        label: NewProductPicker.Yes,
                        value: NewProductPicker.Yes
                      }
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
                    containerStyle={{ flexDirection: 'row' }}
                    inputStyle={{ flex: 1 }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.iconContainer}>
                    <DisabledIcon
                      name="delete"
                      type="material"
                      size={40}
                      onPress={this.props.stores.binCount.deleteActiveBin}
                      color={theme.colors.darkAccent}
                      disabled={
                        activeBin.id === activeSession.bins.slice(-1)[0].id
                      }
                    />
                    <DisabledIcon
                      name="save"
                      type="material"
                      size={40}
                      onPress={this.props.stores.binCount.saveActiveBin}
                      color={theme.colors.darkAccent}
                      disabled={
                        activeBin.id === activeSession.bins.slice(-1)[0].id
                      }
                    />
                    <Icon
                      name="barcode"
                      type="material-community"
                      size={40}
                      containerStyle={{ marginLeft: 6, marginTop: 41 }}
                      color={
                        this.state.enableAutoBarcodeScanner
                          ? theme.colors.primary
                          : theme.colors.darkAccent
                      }
                      onPress={this.toggleEnableAutoBarcodeScanner}
                    />
                  </View>
                  <Icon
                    reverse
                    raised
                    name="add"
                    size={36}
                    color={theme.colors.primary}
                    onPress={() => {
                      createNewActiveBin()
                      if (this.state.enableAutoBarcodeScanner) {
                        this.toggleBarcodeScanner()
                      }
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
