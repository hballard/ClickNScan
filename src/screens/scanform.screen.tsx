import React from 'react'
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  View,
  ScrollView,
  StatusBar
} from 'react-native'
import { Icon, FormLabel, FormInput, Card } from 'react-native-elements'
import { NavigationTabScreenOptions } from 'react-navigation'

import FormPicker from '../components/formpicker.component'
import theme from '../config/theme.config'

export default class ScanForm extends React.Component {

  static navigationOptions: NavigationTabScreenOptions = {
    title: 'Scan & Count',
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.content}>
          <KeyboardAvoidingView enabled behavior="position">
            <Card>
              <View>
                <FormLabel>Barcode</FormLabel>
                <FormInput placeholder="Enter barcode or scan" />
              </View>
              <View>
                <FormLabel>Count Qty</FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter bin count"
                />
              </View>
              <View>
                <FormLabel>Additional Qty</FormLabel>
                <FormInput
                  keyboardType="number-pad"
                  placeholder="Enter additional order amounts"
                />
              </View>
              <View>
                <FormLabel>New Product?</FormLabel>
                <FormPicker
                  items={[
                    { label: 'No', value: 'No' },
                    { label: 'Yes', value: 'Yes' }
                  ]}
                />
              </View>
              <View>
                <FormLabel>Comments</FormLabel>
                <FormInput placeholder="Enter Comments" />
              </View>
              <View style={styles.button}>
                <Icon
                  reverse
                  raised
                  name="add"
                  size={36}
                  color="#E10000"
                  onPress={() => console.log('hello from button!')}
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
    paddingTop: 20
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 90,
    padding: 10
  }
})
