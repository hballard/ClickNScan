import React from 'react'
import {
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView
} from 'react-native'
import { Icon, Header, FormLabel, FormInput, Card } from 'react-native-elements'

interface State {
  newItem: string
  modalVisible: boolean
}

export default class ScanForm extends React.Component<object, State> {
  constructor(props: object) {
    super(props)
    this.state = {
      newItem: 'No',
      modalVisible: false
    }
  }

  private toggleModal() {
    this.setState({ modalVisible: !this.state.modalVisible })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="teal"
          centerComponent={{
            text: 'Barcode Scanner',
            style: styles.header
          }}
        />
        <ScrollView style={styles.content}>
          <KeyboardAvoidingView enabled behavior="position">
            <Card>
              <View>
                <FormLabel>Barcode</FormLabel>
                <FormInput placeholder="Enter barcode" />
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
              <TouchableOpacity onPress={() => this.toggleModal()}>
                <View>
                  <FormLabel>New Product?</FormLabel>
                  <FormInput
                    editable={false}
                    placeholder={this.state.newItem}
                    pointerEvents="none"
                  />
                </View>
              </TouchableOpacity>
              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
              >
                <Picker
                  selectedValue={this.state.newItem}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ newItem: itemValue })
                    this.toggleModal()
                  }}
                >
                  <Picker.Item label="No" value="No" />
                  <Picker.Item label="Yes" value="Yes" />
                </Picker>
              </Modal>
              <View>
                <FormLabel>Comments</FormLabel>
                <FormInput placeholder="Enter Comments" />
              </View>
              <View
                style={styles.button}
              >
                <Icon
                  reverse
                  raised
                  name="add"
                  size={36}
                  color="teal"
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
    backgroundColor: '#E8E6E8'
  },
  header: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20
  },
  content: {
    paddingTop: 30
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 90,
    padding: 10
  }
})
