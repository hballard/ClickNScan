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
    const { activeBin, createNewActiveBin } = this.props.stores.binCount
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.scrollView}>
          <KeyboardAvoidingView enabled behavior="position">
            <Card>
              <View>
                <FormLabel>Barcode</FormLabel>
                <FormInput
                  placeholder="Enter barcode or scan"
                  value={activeBin.barcode}
                  onChangeText={this.props.stores.binCount.setBarcode}
                />
              </View>
              <View>
                <FormLabel>Count Qty</FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter bin count"
                  value={activeBin.countQty}
                  onChangeText={this.props.stores.binCount.setCountQty}
                />
              </View>
              <View>
                <FormLabel>Additional Qty</FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter additional order amounts"
                  value={activeBin.additionalQty}
                  onChangeText={this.props.stores.binCount.setAdditionalQty}
                />
              </View>
              <View>
                <FormLabel>New Product?</FormLabel>
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
                <FormLabel>Comments</FormLabel>
                <FormInput
                  placeholder="Enter Comments"
                  value={activeBin.comments}
                  onChangeText={this.props.stores.binCount.setComments}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Icon 
                  name="trash"
                  type="foundation"
                  size={60}
                  color={theme.colors.darkAccent}
                  iconStyle={{marginTop: 20, marginLeft: 10}}
                />
                <Icon
                  reverse
                  raised
                  name="add"
                  size={36}
                  color="#E10000"
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 90,
    padding: 10
  }
})
